"""
modules/sysinfo/controller.py
Recopila información completa del hardware y sistema operativo.
Solo lectura — no modifica nada.
"""
import os
import platform
import subprocess
import winreg
import socket
from datetime import datetime
from typing import Callable

import psutil
from core import logger


def _wmic(query: str) -> str:
    """Ejecuta una consulta WMIC con shell=True y retorna la primera línea de resultado."""
    try:
        r = subprocess.run(
            f"wmic {query}",
            capture_output=True, text=True, shell=True,
            timeout=10
        )
        lines = [l.strip() for l in r.stdout.splitlines() if l.strip()]
        return lines[1] if len(lines) > 1 else "—"
    except Exception:
        return "—"


def _cpu_name_from_registry() -> str:
    """Lee el nombre del procesador directamente del registro de Windows."""
    try:
        with winreg.OpenKey(
            winreg.HKEY_LOCAL_MACHINE,
            r"HARDWARE\DESCRIPTION\System\CentralProcessor\0"
        ) as k:
            return winreg.QueryValueEx(k, "ProcessorNameString")[0].strip()
    except Exception:
        return "—"


def _reg_read(hive, path: str, name: str) -> str:
    try:
        with winreg.OpenKey(hive, path) as k:
            return str(winreg.QueryValueEx(k, name)[0])
    except Exception:
        return "—"


# ── Secciones de información ─────────────────────────────────────────────────

def get_os_info() -> dict:
    info = platform.uname()
    install_date = "—"
    try:
        raw = _reg_read(
            winreg.HKEY_LOCAL_MACHINE,
            r"SOFTWARE\Microsoft\Windows NT\CurrentVersion",
            "InstallDate"
        )
        if raw != "—":
            install_date = datetime.fromtimestamp(int(raw)).strftime("%d/%m/%Y")
    except Exception:
        pass

    build = _reg_read(
        winreg.HKEY_LOCAL_MACHINE,
        r"SOFTWARE\Microsoft\Windows NT\CurrentVersion",
        "CurrentBuildNumber"
    )
    edition = _reg_read(
        winreg.HKEY_LOCAL_MACHINE,
        r"SOFTWARE\Microsoft\Windows NT\CurrentVersion",
        "ProductName"
    )
    return {
        "Sistema operativo": edition,
        "Versión":           f"{info.version}  (Build {build})",
        "Arquitectura":      info.machine,
        "Nombre del equipo": info.node,
        "Usuario actual":    os.environ.get("USERNAME", "—"),
        "Fecha instalación": install_date,
    }


def get_cpu_info() -> dict:
    freq = psutil.cpu_freq()
    # Registro es más confiable que WMIC en Windows 11
    name = _cpu_name_from_registry()
    if name == "—":
        name = _wmic("cpu get name")
    if name == "—":
        name = platform.processor() or "—"
    return {
        "Procesador":        name,
        "Núcleos físicos":   str(psutil.cpu_count(logical=False)),
        "Núcleos lógicos":   str(psutil.cpu_count(logical=True)),
        "Frecuencia actual": f"{freq.current:.0f} MHz" if freq else "—",
        "Frecuencia máx.":   f"{freq.max:.0f} MHz"     if freq else "—",
    }


def get_ram_info() -> dict:
    mem = psutil.virtual_memory()
    swap = psutil.swap_memory()
    total_gb  = mem.total  / (1024 ** 3)
    avail_gb  = mem.available / (1024 ** 3)
    swap_gb   = swap.total / (1024 ** 3)
    slots = _wmic("memorychip get capacity")
    return {
        "RAM total":       f"{total_gb:.1f} GB",
        "RAM disponible":  f"{avail_gb:.1f} GB",
        "RAM en uso":      f"{mem.percent:.1f}%",
        "Memoria virtual": f"{swap_gb:.1f} GB",
        "Módulos (WMIC)":  slots,
    }


def get_disk_info() -> list:
    """Retorna lista de dicts por partición."""
    rows = []
    for part in psutil.disk_partitions(all=False):
        if "cdrom" in part.opts.lower() or part.fstype == "":
            continue
        try:
            u = psutil.disk_usage(part.mountpoint)
            rows.append({
                "Unidad":      part.device,
                "Sistema arch.": part.fstype,
                "Total":       f"{u.total/(1024**3):.1f} GB",
                "Usado":       f"{u.used/(1024**3):.1f} GB",
                "Libre":       f"{u.free/(1024**3):.1f} GB",
                "Uso":         f"{u.percent:.1f}%",
            })
        except PermissionError:
            pass
    return rows


def get_gpu_info() -> dict:
    name = _wmic("path win32_VideoController get name")
    vram = _wmic("path win32_VideoController get AdapterRAM")
    try:
        vram_mb = int(vram) // (1024 ** 2) if vram != "—" else 0
        vram_str = f"{vram_mb} MB" if vram_mb else "—"
    except Exception:
        vram_str = "—"
    return {
        "GPU":  name,
        "VRAM": vram_str,
    }


def get_motherboard_info() -> dict:
    manufacturer = _wmic("baseboard get manufacturer")
    product      = _wmic("baseboard get product")
    serial       = _wmic("bios get serialnumber")
    bios_ver     = _wmic("bios get smbiosbiosversion")
    return {
        "Fabricante placa": manufacturer,
        "Modelo placa":     product,
        "Número de serie":  serial,
        "Versión BIOS":     bios_ver,
    }


def get_network_info() -> dict:
    hostname = socket.gethostname()
    try:
        local_ip = socket.gethostbyname(hostname)
    except Exception:
        local_ip = "—"
    mac = "—"
    try:
        for name, addrs in psutil.net_if_addrs().items():
            for a in addrs:
                if a.family == psutil.AF_LINK and a.address not in ("", "00:00:00:00:00:00"):
                    mac = a.address
                    break
            if mac != "—":
                break
    except Exception:
        pass
    return {
        "Hostname":  hostname,
        "IP local":  local_ip,
        "MAC":       mac,
    }


def collect_all(progress_cb: Callable) -> dict:
    """Recopila toda la información del sistema. Corre en Worker."""
    progress_cb("Leyendo sistema operativo...")
    os_info = get_os_info()
    progress_cb("Leyendo CPU...")
    cpu_info = get_cpu_info()
    progress_cb("Leyendo RAM...")
    ram_info = get_ram_info()
    progress_cb("Leyendo discos...")
    disk_info = get_disk_info()
    progress_cb("Leyendo GPU...")
    gpu_info = get_gpu_info()
    progress_cb("Leyendo placa madre...")
    mb_info = get_motherboard_info()
    progress_cb("Leyendo red...")
    net_info = get_network_info()
    logger.success("Información del sistema recopilada.")
    return {
        "Sistema Operativo": os_info,
        "Procesador":        cpu_info,
        "Memoria RAM":       ram_info,
        "Almacenamiento":    disk_info,
        "Tarjeta Gráfica":   gpu_info,
        "Placa Madre / BIOS": mb_info,
        "Red":               net_info,
    }


def export_txt(data: dict, path: str):
    """Exporta el reporte como archivo de texto plano."""
    lines = [f"TechKit — Reporte del Sistema",
             f"Generado: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}",
             "=" * 60, ""]
    for section, values in data.items():
        lines.append(f"[ {section} ]")
        if isinstance(values, list):
            for i, disk in enumerate(values, 1):
                lines.append(f"  Disco {i}:")
                for k, v in disk.items():
                    lines.append(f"    {k:<20} {v}")
        else:
            for k, v in values.items():
                lines.append(f"  {k:<22} {v}")
        lines.append("")
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    logger.success(f"Reporte exportado: {path}")
