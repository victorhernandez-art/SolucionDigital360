"""
modules/privacy/controller.py
Herramientas de privacidad para Windows.
Solo modifica claves de registro y archivos del usuario actual.
NUNCA toca archivos del sistema ni claves de HKLM críticas.
"""
import os
import subprocess
import winreg
import glob
from typing import Callable
from core import logger


# ── Limpiar archivos recientes ───────────────────────────────────────────────

RECENT_PATHS = [
    os.path.expandvars(r"%APPDATA%\Microsoft\Windows\Recent"),
    os.path.expandvars(r"%APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations"),
    os.path.expandvars(r"%APPDATA%\Microsoft\Windows\Recent\CustomDestinations"),
]


def clear_recent_files(progress_cb: Callable) -> int:
    """Elimina archivos del historial de documentos recientes. Retorna cantidad eliminada."""
    count = 0
    for folder in RECENT_PATHS:
        if not os.path.isdir(folder):
            continue
        for f in os.listdir(folder):
            fpath = os.path.join(folder, f)
            try:
                if os.path.isfile(fpath):
                    os.remove(fpath)
                    count += 1
            except Exception as e:
                logger.warning(f"No se pudo eliminar {fpath}: {e}")
    progress_cb(f"[OK] Archivos recientes eliminados: {count}")
    logger.success(f"Archivos recientes eliminados: {count}")
    return count


# ── Limpiar portapapeles ─────────────────────────────────────────────────────

def clear_clipboard(progress_cb: Callable) -> bool:
    """Vacía el portapapeles de Windows."""
    try:
        subprocess.run(
            ["cmd", "/c", "echo off | clip"],
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=5
        )
        progress_cb("[OK] Portapapeles limpiado.")
        logger.success("Portapapeles limpiado.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


# ── Limpiar historial de búsqueda de Windows ─────────────────────────────────

def clear_search_history(progress_cb: Callable) -> bool:
    """Elimina el historial de búsqueda del menú Inicio."""
    try:
        key_path = r"SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery"
        subprocess.run(
            ["reg", "delete", f"HKCU\\{key_path}", "/f"],
            capture_output=True,
            creationflags=subprocess.CREATE_NO_WINDOW
        )
        progress_cb("[OK] Historial de búsqueda eliminado.")
        logger.success("Historial de búsqueda eliminado.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


# ── Limpiar historial de ejecución (Run) ─────────────────────────────────────

def clear_run_history(progress_cb: Callable) -> bool:
    """Elimina el historial del cuadro Ejecutar (Win+R)."""
    try:
        subprocess.run(
            ["reg", "delete",
             r"HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\RunMRU",
             "/f"],
            capture_output=True,
            creationflags=subprocess.CREATE_NO_WINDOW
        )
        progress_cb("[OK] Historial de Ejecutar (Win+R) eliminado.")
        logger.success("Historial Run eliminado.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        return False


# ── Telemetría básica ────────────────────────────────────────────────────────

TELEMETRY_SERVICES = [
    ("DiagTrack",          "Telemetría de diagnóstico"),
    ("dmwappushservice",   "WAP Push Message Routing"),
]


def disable_telemetry(progress_cb: Callable) -> bool:
    """Deshabilita servicios de telemetría básica de Windows."""
    all_ok = True
    for svc, desc in TELEMETRY_SERVICES:
        progress_cb(f"Deshabilitando: {desc} ({svc})...")
        try:
            subprocess.run(
                ["sc", "stop", svc],
                capture_output=True,
                creationflags=subprocess.CREATE_NO_WINDOW, timeout=10
            )
            subprocess.run(
                ["sc", "config", svc, "start=disabled"],
                capture_output=True,
                creationflags=subprocess.CREATE_NO_WINDOW, timeout=10
            )
            progress_cb(f"  [OK] {svc} deshabilitado.")
        except Exception as e:
            progress_cb(f"  [WARN] {svc}: {e}")
            all_ok = False

    # Deshabilitar telemetría via registro
    try:
        with winreg.CreateKey(
            winreg.HKEY_LOCAL_MACHINE,
            r"SOFTWARE\Policies\Microsoft\Windows\DataCollection"
        ) as k:
            winreg.SetValueEx(k, "AllowTelemetry", 0, winreg.REG_DWORD, 0)
        progress_cb("[OK] Telemetría deshabilitada en registro.")
    except Exception as e:
        progress_cb(f"[WARN] Registro telemetría: {e}")

    logger.success("Telemetría deshabilitada.")
    return all_ok


def enable_telemetry(progress_cb: Callable) -> bool:
    """Re-habilita los servicios de telemetría."""
    for svc, desc in TELEMETRY_SERVICES:
        progress_cb(f"Habilitando: {desc} ({svc})...")
        try:
            subprocess.run(
                ["sc", "config", svc, "start=auto"],
                capture_output=True,
                creationflags=subprocess.CREATE_NO_WINDOW, timeout=10
            )
            subprocess.run(
                ["sc", "start", svc],
                capture_output=True,
                creationflags=subprocess.CREATE_NO_WINDOW, timeout=10
            )
            progress_cb(f"  [OK] {svc} habilitado.")
        except Exception as e:
            progress_cb(f"  [WARN] {svc}: {e}")
    logger.success("Telemetría re-habilitada.")
    return True


def get_telemetry_status() -> bool:
    """Retorna True si la telemetría está activa."""
    try:
        result = subprocess.run(
            ["sc", "query", "DiagTrack"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=5
        )
        return "RUNNING" in result.stdout.upper()
    except Exception:
        return False


# ── Limpiar todo ─────────────────────────────────────────────────────────────

def clean_all_privacy(progress_cb: Callable) -> dict:
    """Ejecuta todas las limpiezas de privacidad de una vez."""
    progress_cb("=== Limpieza de privacidad completa ===")
    recent  = clear_recent_files(progress_cb)
    clear_clipboard(progress_cb)
    clear_search_history(progress_cb)
    clear_run_history(progress_cb)
    logger.success("Limpieza de privacidad completada.")
    progress_cb("=== Limpieza completada ===")
    return {"recent_files": recent}
