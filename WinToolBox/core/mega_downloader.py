"""
core/mega_downloader.py
Descarga carpetas de Office desde Mega usando la API pública de Mega.
No requiere MEGAcmd ni login — acceso directo via API REST de Mega.
"""
import os
import re
import json
import struct
import hashlib
import requests
from typing import Callable
from Crypto.Cipher import AES
from Crypto.Util import Counter
from core import logger

# ── URLs de cada versión de Office en Mega ───────────────────────────────────
MEGA_OFFICE_URLS = {
    "Office 2016 Pro Plus": "https://mega.nz/folder/WHAhTZiL#caXyyVFAOaJnq5Ex5y2zgA",
    "Office 2019 Pro Plus": "https://mega.nz/folder/nXZTCSDA#ufw2N6p2Zhho48gr82Gh1g",
    "Office 2021 Standard": "https://mega.nz/folder/yKZAxCQY#7hKJlyitW-phmuhn4q_Xmw",
    "Office 2024 Standard": "https://mega.nz/folder/qSgiRQhK#vOagPkC68pXzawxCLgiU-Q",
}

MEGA_API = "https://g.api.mega.co.nz/cs"


# ── Utilidades de cifrado Mega ───────────────────────────────────────────────

def _b64_to_bytes(s: str) -> bytes:
    s = s.replace("-", "+").replace("_", "/")
    pad = (4 - len(s) % 4) % 4
    return __import__("base64").b64decode(s + "=" * pad)


def _decrypt_key(enc_key: list, master_key: list) -> list:
    """Descifra una clave de nodo con la clave maestra."""
    k = [enc_key[i] ^ master_key[i % 4] for i in range(len(enc_key))]
    return k


def _int_list_to_bytes(lst: list) -> bytes:
    return struct.pack(f">{len(lst)}I", *lst)


def _bytes_to_int_list(b: bytes) -> list:
    return list(struct.unpack(f">{len(b)//4}I", b))


def _parse_url(url: str) -> tuple:
    """Extrae (folder_id, folder_key) de una URL de carpeta Mega."""
    m = re.search(r"folder/([^#/]+)#([^/\s]+)", url)
    if not m:
        raise ValueError(f"URL de Mega inválida: {url}")
    return m.group(1), m.group(2)


def _decrypt_attr(attr_bytes: bytes, key: bytes) -> dict:
    """Descifra los atributos de un nodo."""
    try:
        iv = b"\x00" * 16
        ctr = Counter.new(128, initial_value=int.from_bytes(iv, "big"))
        cipher = AES.new(key[:16], AES.MODE_CTR, counter=ctr)
        dec = cipher.decrypt(attr_bytes)
        # Buscar el JSON después del prefijo "MEGA{"
        idx = dec.find(b"MEGA{")
        if idx == -1:
            return {}
        json_str = dec[idx + 4:].rstrip(b"\x00").decode("utf-8", errors="replace")
        # Cerrar el JSON si está truncado
        if not json_str.endswith("}"):
            json_str = json_str[:json_str.rfind("}") + 1]
        return json.loads(json_str)
    except Exception:
        return {}


def _get_folder_nodes(folder_id: str, folder_key_str: str) -> list:
    """Obtiene la lista de nodos de una carpeta pública de Mega."""
    resp = requests.post(
        MEGA_API,
        params={"id": 1, "n": folder_id},
        json=[{"a": "f", "c": 1, "r": 1}],
        timeout=30
    )
    resp.raise_for_status()
    data = resp.json()
    if isinstance(data, int):
        raise RuntimeError(f"Error API Mega: {data}")
    return data[0].get("f", [])


# ── Descarga de archivos ─────────────────────────────────────────────────────

def _download_file(node: dict, folder_key_str: str, dest_path: str,
                   progress_cb: Callable, file_name: str = ""):
    """Descarga y descifra un archivo de Mega."""
    # Obtener URL de descarga
    resp = requests.post(
        MEGA_API,
        json=[{"a": "g", "g": 1, "n": node["h"]}],
        timeout=30
    )
    resp.raise_for_status()
    data = resp.json()
    if isinstance(data, int):
        raise RuntimeError(f"Error al obtener URL de descarga: {data}")

    dl_url = data[0].get("g")
    size   = data[0].get("s", 0)

    if not dl_url:
        raise RuntimeError("No se obtuvo URL de descarga")

    # Descifrar clave del nodo
    folder_key = _b64_to_bytes(folder_key_str)
    # La clave de carpeta tiene 16 bytes (4 ints)
    fk_ints = _bytes_to_int_list(folder_key[:16])

    node_key_enc = _b64_to_bytes(node["k"].split(":")[-1])
    nk_ints = _bytes_to_int_list(node_key_enc)

    # XOR con clave de carpeta
    dec_ints = [nk_ints[i] ^ fk_ints[i % 4] for i in range(len(nk_ints))]
    # Para archivos: clave = XOR de pares
    if len(dec_ints) >= 8:
        file_key = [
            dec_ints[0] ^ dec_ints[4],
            dec_ints[1] ^ dec_ints[5],
            dec_ints[2] ^ dec_ints[6],
            dec_ints[3] ^ dec_ints[7],
        ]
    else:
        file_key = dec_ints[:4]

    key_bytes = _int_list_to_bytes(file_key)

    # IV para AES-CTR (primeros 8 bytes de dec_ints[4:6])
    if len(dec_ints) >= 6:
        iv_ints = [dec_ints[4], dec_ints[5], 0, 0]
    else:
        iv_ints = [0, 0, 0, 0]
    iv_bytes = _int_list_to_bytes(iv_ints)
    iv_int   = int.from_bytes(iv_bytes, "big")

    # Descargar y descifrar en streaming
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    ctr_obj = Counter.new(128, initial_value=iv_int)
    cipher  = AES.new(key_bytes, AES.MODE_CTR, counter=ctr_obj)

    downloaded = 0
    chunk_size = 1024 * 1024  # 1 MB

    with requests.get(dl_url, stream=True, timeout=60) as r:
        r.raise_for_status()
        with open(dest_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=chunk_size):
                if chunk:
                    f.write(cipher.decrypt(chunk))
                    downloaded += len(chunk)
                    if size > 0:
                        pct = downloaded * 100 // size
                        if pct % 10 == 0:
                            name = file_name or os.path.basename(dest_path)
                            progress_cb(f"  {name}: {pct}%  "
                                        f"({downloaded//(1024*1024)} / "
                                        f"{size//(1024*1024)} MB)")


# ── Función principal ────────────────────────────────────────────────────────

def download_office_from_mega(
    version_key: str,
    dest_dir: str,
    progress_cb: Callable
) -> bool:
    """
    Descarga la carpeta de Office desde Mega directamente via API.
    No requiere MEGAcmd ni login.
    """
    url = MEGA_OFFICE_URLS.get(version_key)
    if not url:
        progress_cb(f"[ERROR] No hay URL configurada para: {version_key}")
        return False

    progress_cb(f"Conectando a Mega para {version_key}...")

    try:
        folder_id, folder_key_str = _parse_url(url)
        progress_cb(f"  Carpeta ID: {folder_id}")

        progress_cb("Obteniendo lista de archivos...")
        nodes = _get_folder_nodes(folder_id, folder_key_str)
        files = [n for n in nodes if n.get("t") == 0]  # t=0 son archivos
        progress_cb(f"  {len(files)} archivo(s) encontrados.")

        os.makedirs(dest_dir, exist_ok=True)
        total_size = sum(n.get("s", 0) for n in files)
        progress_cb(f"  Tamaño total: {total_size // (1024*1024)} MB")
        progress_cb(f"Descargando a: {dest_dir}")

        for i, node in enumerate(files, 1):
            # Obtener nombre del archivo desde atributos
            try:
                folder_key = _b64_to_bytes(folder_key_str)
                fk_ints = _bytes_to_int_list(folder_key[:16])
                nk_enc  = _b64_to_bytes(node["k"].split(":")[-1])
                nk_ints = _bytes_to_int_list(nk_enc)
                dec_ints = [nk_ints[j] ^ fk_ints[j % 4] for j in range(len(nk_ints))]
                if len(dec_ints) >= 8:
                    attr_key = [dec_ints[0]^dec_ints[4], dec_ints[1]^dec_ints[5],
                                dec_ints[2]^dec_ints[6], dec_ints[3]^dec_ints[7]]
                else:
                    attr_key = dec_ints[:4]
                attr_bytes = _b64_to_bytes(node.get("a", ""))
                attrs = _decrypt_attr(attr_bytes, _int_list_to_bytes(attr_key))
                fname = attrs.get("n", node["h"])
            except Exception:
                fname = node["h"]

            dest_file = os.path.join(dest_dir, fname)
            progress_cb(f"[{i}/{len(files)}] Descargando: {fname}")

            _download_file(node, folder_key_str, dest_file, progress_cb, fname)
            progress_cb(f"  ✅ {fname} completado.")

        progress_cb(f"\n[OK] Todos los archivos descargados en: {dest_dir}")
        logger.success(f"Office descargado desde Mega: {version_key}")
        return True

    except Exception as e:
        progress_cb(f"[ERROR] Fallo al descargar desde Mega: {e}")
        logger.error(f"Mega download error: {e}")
        return False


# ── Helpers ──────────────────────────────────────────────────────────────────

def get_office_local_path(version_key: str, base_dir: str) -> str:
    folder_map = {
        "Office 2016 Pro Plus": "Office2016",
        "Office 2019 Pro Plus": "Office2019",
        "Office 2021 Standard": "Office2021",
        "Office 2024 Standard": "Office2024",
    }
    folder = folder_map.get(version_key, version_key.replace(" ", ""))
    return os.path.join(base_dir, folder)


def is_office_downloaded(version_key: str, base_dir: str) -> bool:
    local_path = get_office_local_path(version_key, base_dir)
    setup = os.path.join(local_path, "setup.exe")
    data  = os.path.join(local_path, "Office", "Data")
    return os.path.isfile(setup) and os.path.isdir(data)
