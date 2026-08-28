"""
modules/updates/controller.py
Gestión de Windows Update:
  - Ver estado del servicio
  - Pausar / reanudar actualizaciones (registro)
  - Limpiar caché de Windows Update (SoftwareDistribution)
  - Abrir Windows Update en Configuración
"""
import os
import subprocess
import winreg
import shutil
from typing import Callable
from core import logger

# Carpetas de caché de Windows Update
WU_CACHE_PATHS = [
    os.path.expandvars(r"%WINDIR%\SoftwareDistribution\Download"),
    os.path.expandvars(r"%WINDIR%\SoftwareDistribution\DataStore"),
]

WU_SERVICES = ["wuauserv", "bits", "cryptsvc", "msiserver"]

# Clave de registro para pausar actualizaciones
PAUSE_KEY  = r"SOFTWARE\Microsoft\WindowsUpdate\UX\Settings"
PAUSE_VAL  = "FlightSettingsMaxPauseDays"
PAUSE_DAYS = 35   # máximo permitido por Windows


def get_wu_service_status() -> str:
    """Retorna el estado del servicio Windows Update."""
    try:
        r = subprocess.run(
            ["sc", "query", "wuauserv"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=5
        )
        if "RUNNING" in r.stdout.upper():
            return "Activo"
        elif "STOPPED" in r.stdout.upper():
            return "Detenido"
        return "Desconocido"
    except Exception:
        return "Desconocido"


def is_updates_paused() -> bool:
    """Retorna True si las actualizaciones están pausadas."""
    try:
        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, PAUSE_KEY) as k:
            val = winreg.QueryValueEx(k, "PauseUpdatesExpiryTime")[0]
            return bool(val)
    except Exception:
        return False


def pause_updates(progress_cb: Callable) -> bool:
    """Pausa las actualizaciones de Windows por 35 días via registro."""
    progress_cb("Pausando actualizaciones de Windows...")
    try:
        from datetime import datetime, timedelta
        expiry = (datetime.now() + timedelta(days=PAUSE_DAYS)).strftime("%Y-%m-%dT%H:%M:%SZ")
        with winreg.CreateKey(winreg.HKEY_LOCAL_MACHINE, PAUSE_KEY) as k:
            winreg.SetValueEx(k, "PauseUpdatesExpiryTime",  0, winreg.REG_SZ, expiry)
            winreg.SetValueEx(k, "PauseFeatureUpdatesStartTime", 0, winreg.REG_SZ,
                              datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"))
            winreg.SetValueEx(k, "PauseFeatureUpdatesEndTime",   0, winreg.REG_SZ, expiry)
            winreg.SetValueEx(k, "PauseQualityUpdatesStartTime", 0, winreg.REG_SZ,
                              datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"))
            winreg.SetValueEx(k, "PauseQualityUpdatesEndTime",   0, winreg.REG_SZ, expiry)
        logger.success(f"Actualizaciones pausadas hasta {expiry}.")
        progress_cb(f"[OK] Actualizaciones pausadas por {PAUSE_DAYS} días.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def resume_updates(progress_cb: Callable) -> bool:
    """Reanuda las actualizaciones eliminando las claves de pausa."""
    progress_cb("Reanudando actualizaciones de Windows...")
    keys_to_delete = [
        "PauseUpdatesExpiryTime",
        "PauseFeatureUpdatesStartTime", "PauseFeatureUpdatesEndTime",
        "PauseQualityUpdatesStartTime", "PauseQualityUpdatesEndTime",
    ]
    try:
        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, PAUSE_KEY,
                            0, winreg.KEY_SET_VALUE) as k:
            for val in keys_to_delete:
                try:
                    winreg.DeleteValue(k, val)
                except FileNotFoundError:
                    pass
        logger.success("Actualizaciones reanudadas.")
        progress_cb("[OK] Actualizaciones reanudadas correctamente.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def clear_wu_cache(progress_cb: Callable) -> bool:
    """
    Limpia la caché de Windows Update:
    1. Detiene servicios WU
    2. Elimina carpetas de caché
    3. Reinicia servicios
    """
    progress_cb("=== Limpiando caché de Windows Update ===")

    progress_cb("Deteniendo servicios...")
    for svc in WU_SERVICES:
        subprocess.run(["net", "stop", svc, "/y"],
                       capture_output=True,
                       creationflags=subprocess.CREATE_NO_WINDOW, timeout=20)

    freed = 0
    for path in WU_CACHE_PATHS:
        if os.path.isdir(path):
            progress_cb(f"Limpiando: {path}")
            for item in os.listdir(path):
                item_path = os.path.join(path, item)
                try:
                    if os.path.isfile(item_path):
                        size = os.path.getsize(item_path)
                        os.remove(item_path)
                        freed += size
                    elif os.path.isdir(item_path):
                        size = sum(
                            os.path.getsize(os.path.join(dp, f))
                            for dp, _, files in os.walk(item_path)
                            for f in files
                            if os.path.exists(os.path.join(dp, f))
                        )
                        shutil.rmtree(item_path, ignore_errors=True)
                        freed += size
                except Exception as e:
                    progress_cb(f"  [WARN] {item}: {e}")

    freed_mb = freed / (1024 ** 2)
    progress_cb(f"  Liberados: {freed_mb:.1f} MB")

    progress_cb("Reiniciando servicios...")
    for svc in reversed(WU_SERVICES):
        subprocess.run(["net", "start", svc],
                       capture_output=True,
                       creationflags=subprocess.CREATE_NO_WINDOW, timeout=20)

    logger.success(f"Caché WU limpiada. Liberados {freed_mb:.1f} MB.")
    progress_cb(f"[OK] Caché limpiada. {freed_mb:.1f} MB liberados.")
    return True


def open_windows_update():
    """Abre Windows Update en la app de Configuración."""
    subprocess.Popen(
        ["start", "ms-settings:windowsupdate"],
        shell=True, creationflags=subprocess.CREATE_NO_WINDOW
    )
