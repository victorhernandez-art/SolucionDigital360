"""
modules/activation/controller.py
Activación de Windows y Office.

Windows : slmgr.vbs /ipk <clave> + /ato
Office  : ospp.vbs /inpkey:<clave> + /act
          Solo Office 2016 y 2019 con claves propias del técnico.
          2021/2024 se activan por separado (no incluidas aquí).
"""
import os
import subprocess
import winreg
from typing import Callable
from core import logger

# ── Claves de Office del técnico ─────────────────────────────────────────────
# Reemplaza estos valores con tus claves reales.
OFFICE_KEYS = {
    "Office 2019 Pro Plus": "TDTBH-NJTWC-BB6RY-GX6QG-4M7QD",
    "Office 2016 Pro Plus": "HWM8N-CBX9Q-JF9RY-KH27B-DPFHM",
}

# Rutas posibles de ospp.vbs (Office 2016/2019)
OSPP_PATHS = [
    r"C:\Program Files\Microsoft Office\Office16\ospp.vbs",
    r"C:\Program Files (x86)\Microsoft Office\Office16\ospp.vbs",
    r"C:\Program Files\Microsoft Office\Office15\ospp.vbs",
    r"C:\Program Files (x86)\Microsoft Office\Office15\ospp.vbs",
]


# ── Windows ──────────────────────────────────────────────────────────────────

def get_windows_activation_status() -> dict:
    """
    Retorna el estado de activación de Windows.
    {activated: bool, product_name: str, license_status: str, partial_key: str}
    """
    result = {
        "activated":      False,
        "product_name":   "—",
        "license_status": "—",
        "partial_key":    "—",
        "channel":        "—",
    }
    try:
        r = subprocess.run(
            ["cscript", "//Nologo",
             r"C:\Windows\System32\slmgr.vbs", "/dli"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=15
        )
        for line in r.stdout.splitlines():
            line = line.strip()
            ll = line.lower()
            if "nombre" in ll or "name" in ll:
                result["product_name"] = line.split(":", 1)[-1].strip()
            elif "estado de licencia" in ll or "license status" in ll:
                status = line.split(":", 1)[-1].strip()
                result["license_status"] = status
                result["activated"] = "con licencia" in status.lower() or "licensed" in status.lower()
            elif "clave de producto parcial" in ll or "partial product key" in ll:
                result["partial_key"] = line.split(":", 1)[-1].strip()
            elif "canal" in ll or "channel" in ll:
                result["channel"] = line.split(":", 1)[-1].strip()
    except subprocess.TimeoutExpired:
        result["license_status"] = "Timeout al consultar (slmgr)"
        logger.warning("slmgr.vbs timeout")
    except Exception as e:
        logger.error(f"Error al obtener estado de activación: {e}")
    return result


def activate_windows_with_key(key: str, progress_cb: Callable) -> bool:
    """Instala una clave de producto y activa Windows."""
    key = key.strip().upper()
    if not key or len(key.replace("-", "")) != 25:
        progress_cb("[ERROR] Clave inválida. Formato: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX")
        return False

    progress_cb("Instalando clave de producto...")
    try:
        r = subprocess.run(
            ["cscript", "//Nologo",
             r"C:\Windows\System32\slmgr.vbs", "/ipk", key],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=30
        )
        out = (r.stdout + r.stderr).strip()
        progress_cb(f"  {out}")
        if r.returncode != 0:
            return False

        progress_cb("Activando Windows...")
        r2 = subprocess.run(
            ["cscript", "//Nologo",
             r"C:\Windows\System32\slmgr.vbs", "/ato"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=60
        )
        out2 = (r2.stdout + r2.stderr).strip()
        progress_cb(f"  {out2}")
        success = r2.returncode == 0
        if success:
            logger.success("Windows activado correctamente.")
            progress_cb("[OK] Windows activado correctamente.")
        else:
            progress_cb("[ERROR] No se pudo activar. Verifica la clave e intenta de nuevo.")
        return success
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def open_windows_activation_settings():
    """Abre la configuración de activación de Windows."""
    subprocess.Popen(
        ["start", "ms-settings:activation"],
        shell=True, creationflags=subprocess.CREATE_NO_WINDOW
    )


# ── Office ───────────────────────────────────────────────────────────────────

def _find_ospp() -> str:
    """Busca ospp.vbs en las rutas conocidas."""
    for path in OSPP_PATHS:
        if os.path.isfile(path):
            return path
    return ""


def get_office_activation_status() -> dict:
    """Retorna el estado de activación de Office instalado."""
    result = {
        "installed": False,
        "product":   "—",
        "status":    "—",
        "expires":   "—",
        "ospp_path": "",
    }
    ospp = _find_ospp()
    if not ospp:
        result["status"] = "Office no detectado o versión no compatible (2016/2019)"
        return result

    result["installed"] = True
    result["ospp_path"] = ospp
    try:
        r = subprocess.run(
            ["cscript", "//Nologo", ospp, "/dstatus"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=15
        )
        for line in r.stdout.splitlines():
            line = line.strip()
            ll = line.lower()
            if "product name" in ll or "nombre del producto" in ll:
                result["product"] = line.split(":", 1)[-1].strip()
            elif "license status" in ll or "estado de licencia" in ll:
                status = line.split(":", 1)[-1].strip()
                result["status"] = status
            elif "remaining grace" in ll or "gracia restante" in ll:
                result["expires"] = line.split(":", 1)[-1].strip()
    except Exception as e:
        logger.error(f"Error estado Office: {e}")
        result["status"] = f"Error: {e}"
    return result


def activate_office(version_key: str, progress_cb: Callable) -> bool:
    """
    Activa Office 2016 o 2019 con la clave del técnico.
    version_key: "Office 2019 Pro Plus" o "Office 2016 Pro Plus"
    """
    ospp = _find_ospp()
    if not ospp:
        progress_cb("[ERROR] No se encontró ospp.vbs. Verifica que Office esté instalado.")
        return False

    key = OFFICE_KEYS.get(version_key, "")
    if not key or "XXXXX" in key:
        progress_cb(f"[ERROR] Clave de {version_key} no configurada en el sistema.")
        progress_cb("  → Edita OFFICE_KEYS en modules/activation/controller.py")
        return False

    progress_cb(f"Instalando clave para {version_key}...")
    try:
        r = subprocess.run(
            ["cscript", "//Nologo", ospp, f"/inpkey:{key}"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=30
        )
        out = (r.stdout + r.stderr).strip()
        progress_cb(f"  {out}")

        progress_cb("Activando Office...")
        r2 = subprocess.run(
            ["cscript", "//Nologo", ospp, "/act"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=60
        )
        out2 = (r2.stdout + r2.stderr).strip()
        progress_cb(f"  {out2}")

        success = r2.returncode == 0
        if success:
            logger.success(f"{version_key} activado correctamente.")
            progress_cb(f"[OK] {version_key} activado correctamente.")
        else:
            progress_cb("[ERROR] No se pudo activar Office. Verifica la clave.")
        return success
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def activate_office_with_custom_key(key: str, progress_cb: Callable) -> bool:
    """Activa Office con una clave personalizada ingresada por el usuario."""
    ospp = _find_ospp()
    if not ospp:
        progress_cb("[ERROR] No se encontró ospp.vbs.")
        return False

    key = key.strip().upper()
    if not key or len(key.replace("-", "")) != 25:
        progress_cb("[ERROR] Clave inválida.")
        return False

    progress_cb("Instalando clave de Office...")
    try:
        r = subprocess.run(
            ["cscript", "//Nologo", ospp, f"/inpkey:{key}"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=30
        )
        progress_cb(f"  {(r.stdout + r.stderr).strip()}")

        progress_cb("Activando Office...")
        r2 = subprocess.run(
            ["cscript", "//Nologo", ospp, "/act"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=60
        )
        out2 = (r2.stdout + r2.stderr).strip()
        progress_cb(f"  {out2}")
        success = r2.returncode == 0
        if success:
            logger.success("Office activado con clave personalizada.")
            progress_cb("[OK] Office activado correctamente.")
        return success
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        return False
