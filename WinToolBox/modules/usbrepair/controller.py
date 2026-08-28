"""
modules/usbrepair/controller.py
Reparación de USB infectados por virus que ocultan o convierten
archivos en accesos directos (.lnk).

Proceso completo:
  1. Detectar unidades USB conectadas
  2. Eliminar archivos maliciosos conocidos (autorun.inf, .lnk raíz, thumbs.db oculto)
  3. Restaurar atributos de archivos y carpetas ocultos/sistema
  4. Eliminar carpetas sospechosas (Recycler, RECYCLED, System Volume Information accesible)
  5. Ejecutar attrib para limpiar atributos masivamente
  6. Reporte de archivos restaurados
"""
import os
import subprocess
import string
import stat
from typing import Callable
from core import logger


# Archivos maliciosos conocidos que deben eliminarse
MALICIOUS_FILES = [
    "autorun.inf",
    "autorun.exe",
    "autorun.bat",
    "desktop.ini",       # en raíz de USB (no en carpetas del sistema)
    "thumbs.db",
]

# Nombres de carpetas creadas por virus
MALICIOUS_FOLDERS = [
    "Recycler",
    "RECYCLED",
    "recycled",
    "recycler",
]

# Extensiones de accesos directos sospechosos en raíz
SUSPICIOUS_EXTENSIONS = {".lnk", ".exe", ".bat", ".vbs", ".cmd", ".scr"}

# Extensiones que NUNCA se tocan
SAFE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff",
    ".mp3", ".mp4", ".avi", ".mkv", ".mov", ".wav",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
    ".txt", ".zip", ".rar", ".7z", ".iso",
    ".py", ".js", ".html", ".css", ".json", ".xml",
}


def get_usb_drives() -> list:
    """
    Detecta unidades USB/removibles conectadas.
    Retorna lista de {letter, label, size_gb, free_gb}
    """
    drives = []
    try:
        import psutil
        for part in psutil.disk_partitions(all=False):
            # En Windows, las unidades removibles tienen 'removable' en opts
            if "removable" in part.opts.lower() or _is_removable_wmic(part.device):
                try:
                    usage = psutil.disk_usage(part.mountpoint)
                    drives.append({
                        "letter":   part.mountpoint,
                        "device":   part.device,
                        "fstype":   part.fstype,
                        "size_gb":  round(usage.total / (1024**3), 1),
                        "free_gb":  round(usage.free  / (1024**3), 1),
                        "label":    _get_drive_label(part.mountpoint),
                    })
                except Exception:
                    pass
    except Exception as e:
        logger.error(f"Error detectando USB: {e}")
    return drives


def _is_removable_wmic(device: str) -> bool:
    """Verifica via WMIC si una unidad es removible (tipo 2 = removable)."""
    try:
        letter = device.replace("\\", "").rstrip(":")
        result = subprocess.run(
            ["wmic", "logicaldisk", "where",
             f"DeviceID='{letter}:'", "get", "DriveType"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=5
        )
        return "2" in result.stdout
    except Exception:
        return False


def _get_drive_label(mountpoint: str) -> str:
    """Obtiene la etiqueta de volumen de una unidad."""
    try:
        result = subprocess.run(
            ["vol", mountpoint.rstrip("\\")],
            capture_output=True, text=True, shell=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=5
        )
        for line in result.stdout.splitlines():
            if "no tiene" in line.lower() or "has no" in line.lower():
                return "Sin etiqueta"
            if "es" in line.lower() or "is" in line.lower():
                parts = line.split()
                if parts:
                    return parts[-1]
    except Exception:
        pass
    return "USB"


def _force_remove(path: str) -> bool:
    """Elimina un archivo forzando permisos de escritura."""
    try:
        os.chmod(path, stat.S_IWRITE | stat.S_IREAD)
        os.remove(path)
        return True
    except Exception:
        try:
            subprocess.run(
                ["cmd", "/c", "del", "/f", "/q", path],
                capture_output=True,
                creationflags=subprocess.CREATE_NO_WINDOW, timeout=5
            )
            return not os.path.exists(path)
        except Exception:
            return False


def _force_remove_dir(path: str) -> bool:
    """Elimina una carpeta forzando permisos."""
    try:
        subprocess.run(
            ["cmd", "/c", "rd", "/s", "/q", path],
            capture_output=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=10
        )
        return not os.path.exists(path)
    except Exception:
        return False


def repair_usb(drive: str, progress_cb: Callable) -> dict:
    """
    Proceso completo de reparación de USB.
    Retorna resumen: {restored, deleted_malicious, deleted_shortcuts, errors}
    """
    progress_cb(f"=== Iniciando reparación de {drive} ===")
    stats = {
        "restored":           0,
        "deleted_malicious":  0,
        "deleted_shortcuts":  0,
        "errors":             0,
    }

    drive = drive.rstrip("\\") + "\\"

    if not os.path.isdir(drive):
        progress_cb(f"[ERROR] No se puede acceder a {drive}")
        return stats

    # ── PASO 1: Eliminar archivos maliciosos en la raíz ──────────
    progress_cb("Paso 1/4: Eliminando archivos maliciosos en la raíz...")
    for fname in MALICIOUS_FILES:
        fpath = os.path.join(drive, fname)
        if os.path.exists(fpath):
            if _force_remove(fpath):
                progress_cb(f"  🗑  Eliminado: {fname}")
                stats["deleted_malicious"] += 1
                logger.info(f"Eliminado malicioso: {fpath}")
            else:
                progress_cb(f"  ⚠️  No se pudo eliminar: {fname}")
                stats["errors"] += 1

    # ── PASO 2: Eliminar carpetas de virus ───────────────────────
    progress_cb("Paso 2/4: Eliminando carpetas de virus...")
    for folder in MALICIOUS_FOLDERS:
        fpath = os.path.join(drive, folder)
        if os.path.isdir(fpath):
            if _force_remove_dir(fpath):
                progress_cb(f"  🗑  Carpeta eliminada: {folder}")
                stats["deleted_malicious"] += 1
                logger.info(f"Carpeta virus eliminada: {fpath}")
            else:
                progress_cb(f"  ⚠️  No se pudo eliminar carpeta: {folder}")
                stats["errors"] += 1

    # ── PASO 3: Eliminar accesos directos sospechosos en raíz ────
    progress_cb("Paso 3/4: Eliminando accesos directos sospechosos...")
    try:
        for entry in os.scandir(drive):
            ext = os.path.splitext(entry.name)[1].lower()
            if ext == ".lnk":
                # Accesos directos en raíz = casi siempre virus
                if _force_remove(entry.path):
                    progress_cb(f"  🗑  Acceso directo eliminado: {entry.name}")
                    stats["deleted_shortcuts"] += 1
                else:
                    stats["errors"] += 1
    except Exception as e:
        progress_cb(f"  ⚠️  Error escaneando raíz: {e}")

    # ── PASO 4: Restaurar atributos (attrib masivo) ──────────────
    progress_cb("Paso 4/4: Restaurando archivos y carpetas ocultos...")
    try:
        # attrib -h -r -s /s /d  →  quita Hidden, ReadOnly, System recursivamente
        result = subprocess.run(
            ["attrib", "-h", "-r", "-s", "/s", "/d", f"{drive}*"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW,
            timeout=120
        )
        # Contar líneas procesadas (attrib muestra archivos que modifica)
        lines = [l for l in result.stdout.splitlines() if l.strip()]
        stats["restored"] = len(lines)
        if lines:
            progress_cb(f"  ✅ {len(lines)} elemento(s) restaurados.")
        else:
            progress_cb("  ✅ Atributos verificados (sin cambios necesarios).")
    except subprocess.TimeoutExpired:
        progress_cb("  ⚠️  Timeout en attrib — la unidad puede ser muy grande.")
        stats["errors"] += 1
    except Exception as e:
        progress_cb(f"  ⚠️  Error en attrib: {e}")
        stats["errors"] += 1

    # ── Resumen ──────────────────────────────────────────────────
    progress_cb("")
    progress_cb("=== Reparación completada ===")
    progress_cb(f"  Archivos/carpetas restaurados : {stats['restored']}")
    progress_cb(f"  Archivos maliciosos eliminados: {stats['deleted_malicious']}")
    progress_cb(f"  Accesos directos eliminados   : {stats['deleted_shortcuts']}")
    if stats["errors"]:
        progress_cb(f"  ⚠️  Errores                    : {stats['errors']}")
    progress_cb("")
    progress_cb("💡 Recomendación: escanea la USB con tu antivirus para confirmar limpieza total.")
    logger.success(f"USB {drive} reparada. Restaurados: {stats['restored']}, "
                   f"Eliminados: {stats['deleted_malicious'] + stats['deleted_shortcuts']}")
    return stats
