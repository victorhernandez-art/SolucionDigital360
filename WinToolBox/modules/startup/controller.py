"""
modules/startup/controller.py
Gestión de programas de inicio de Windows.
Lee y modifica las claves de registro Run/RunOnce para el usuario actual
y para la máquina (HKLM). También lee la carpeta Startup del usuario.

Seguridad:
  - NUNCA elimina entradas, solo las deshabilita moviendo a una clave
    de "backup" bajo Software\\WinToolBox\\DisabledStartup.
  - Re-habilitar restaura la entrada original exacta.
  - Entradas del sistema (HKLM) requieren privilegios de administrador
    (ya garantizados por uac.py en el arranque).
"""
import os
import winreg
import subprocess
from typing import Callable

from core import logger

# ── Claves de registro de inicio ─────────────────────────────────────────────
RUN_KEYS = [
    (winreg.HKEY_CURRENT_USER,  r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run",      "HKCU (usuario)"),
    (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run",      "HKLM (sistema)"),
    (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run", "HKLM 32-bit"),
]

# Clave donde se guardan las entradas deshabilitadas
DISABLED_KEY_HKCU = r"SOFTWARE\WinToolBox\DisabledStartup"

# Carpeta Startup del usuario actual
STARTUP_FOLDER = os.path.join(
    os.environ.get("APPDATA", ""),
    r"Microsoft\Windows\Start Menu\Programs\Startup"
)

# Procesos críticos del sistema que NUNCA deben tocarse
PROTECTED_NAMES = {
    "windows defender", "security health", "onedrive", "cortana",
    "windows security", "malwarebytes", "antivirus"
}


def _hive_str(hive) -> str:
    return "HKCU" if hive == winreg.HKEY_CURRENT_USER else "HKLM"


def get_startup_entries() -> list:
    """
    Retorna lista de entradas de inicio.
    Cada entrada: {name, command, source, hive, reg_path, enabled, is_folder}
    """
    entries = []

    # ── Registro ─────────────────────────────────────────────
    for hive, path, source in RUN_KEYS:
        try:
            with winreg.OpenKey(hive, path, 0, winreg.KEY_READ) as key:
                i = 0
                while True:
                    try:
                        name, value, _ = winreg.EnumValue(key, i)
                        entries.append({
                            "name": name,
                            "command": value,
                            "source": source,
                            "hive": hive,
                            "reg_path": path,
                            "enabled": True,
                            "is_folder": False,
                        })
                        i += 1
                    except OSError:
                        break
        except OSError:
            pass

    # ── Entradas deshabilitadas (backup) ─────────────────────
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, DISABLED_KEY_HKCU, 0, winreg.KEY_READ) as key:
            i = 0
            while True:
                try:
                    name, value, _ = winreg.EnumValue(key, i)
                    # Formato guardado: "HIVE||REG_PATH||COMMAND"
                    parts = value.split("||", 2)
                    if len(parts) == 3:
                        hive_name, reg_path, command = parts
                        entries.append({
                            "name": name,
                            "command": command,
                            "source": f"{hive_name} (deshabilitado)",
                            "hive": winreg.HKEY_CURRENT_USER if hive_name == "HKCU" else winreg.HKEY_LOCAL_MACHINE,
                            "reg_path": reg_path,
                            "enabled": False,
                            "is_folder": False,
                        })
                    i += 1
                except OSError:
                    break
    except OSError:
        pass

    # ── Carpeta Startup ───────────────────────────────────────
    if os.path.isdir(STARTUP_FOLDER):
        for fname in os.listdir(STARTUP_FOLDER):
            fpath = os.path.join(STARTUP_FOLDER, fname)
            if os.path.isfile(fpath):
                entries.append({
                    "name": fname,
                    "command": fpath,
                    "source": "Carpeta Startup",
                    "hive": None,
                    "reg_path": None,
                    "enabled": True,
                    "is_folder": True,
                })

    return entries


def _is_protected(name: str) -> bool:
    name_lower = name.lower()
    return any(p in name_lower for p in PROTECTED_NAMES)


def disable_entry(entry: dict, progress_cb: Callable) -> bool:
    """
    Deshabilita una entrada de inicio moviéndola a la clave de backup.
    Retorna True si fue exitoso.
    """
    if not entry.get("enabled"):
        progress_cb(f"'{entry['name']}' ya está deshabilitado.")
        return False

    if _is_protected(entry["name"]):
        progress_cb(f"Entrada protegida, no se puede deshabilitar: {entry['name']}")
        logger.warning(f"Intento de deshabilitar entrada protegida: {entry['name']}")
        return False

    if entry.get("is_folder"):
        # Para carpeta Startup: renombrar el archivo agregando .disabled
        src = entry["command"]
        dst = src + ".disabled"
        try:
            os.rename(src, dst)
            logger.success(f"Startup deshabilitado (carpeta): {entry['name']}")
            progress_cb(f"[OK] Deshabilitado: {entry['name']}")
            return True
        except Exception as e:
            progress_cb(f"Error al deshabilitar {entry['name']}: {e}")
            logger.error(str(e))
            return False

    # Registro: guardar en backup y eliminar de Run
    try:
        hive = entry["hive"]
        reg_path = entry["reg_path"]
        name = entry["name"]
        command = entry["command"]
        hive_str = _hive_str(hive)

        # Guardar en backup HKCU
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, DISABLED_KEY_HKCU) as bk:
            winreg.SetValueEx(bk, name, 0, winreg.REG_SZ,
                              f"{hive_str}||{reg_path}||{command}")

        # Eliminar de la clave Run original
        with winreg.OpenKey(hive, reg_path, 0, winreg.KEY_SET_VALUE) as key:
            winreg.DeleteValue(key, name)

        logger.success(f"Startup deshabilitado: {name}")
        progress_cb(f"[OK] Deshabilitado: {name}")
        return True

    except PermissionError:
        progress_cb(f"Sin permisos para deshabilitar: {entry['name']} (requiere admin)")
        logger.error(f"PermissionError al deshabilitar: {entry['name']}")
        return False
    except Exception as e:
        progress_cb(f"Error: {e}")
        logger.error(str(e))
        return False


def enable_entry(entry: dict, progress_cb: Callable) -> bool:
    """
    Re-habilita una entrada previamente deshabilitada.
    Restaura la entrada original exacta desde el backup.
    """
    if entry.get("enabled"):
        progress_cb(f"'{entry['name']}' ya está habilitado.")
        return False

    if entry.get("is_folder"):
        src = entry["command"]  # ruta con .disabled
        dst = src.replace(".disabled", "")
        try:
            os.rename(src, dst)
            logger.success(f"Startup re-habilitado (carpeta): {entry['name']}")
            progress_cb(f"[OK] Habilitado: {entry['name']}")
            return True
        except Exception as e:
            progress_cb(f"Error al habilitar {entry['name']}: {e}")
            return False

    try:
        hive = entry["hive"]
        reg_path = entry["reg_path"]
        name = entry["name"]
        command = entry["command"]

        # Restaurar en la clave Run original
        with winreg.OpenKey(hive, reg_path, 0, winreg.KEY_SET_VALUE) as key:
            winreg.SetValueEx(key, name, 0, winreg.REG_SZ, command)

        # Eliminar del backup
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, DISABLED_KEY_HKCU,
                                0, winreg.KEY_SET_VALUE) as bk:
                winreg.DeleteValue(bk, name)
        except OSError:
            pass

        logger.success(f"Startup re-habilitado: {name}")
        progress_cb(f"[OK] Habilitado: {name}")
        return True

    except PermissionError:
        progress_cb(f"Sin permisos para habilitar: {entry['name']} (requiere admin)")
        logger.error(f"PermissionError al habilitar: {entry['name']}")
        return False
    except Exception as e:
        progress_cb(f"Error: {e}")
        logger.error(str(e))
        return False


def open_startup_folder():
    """Abre la carpeta Startup del usuario en el Explorador."""
    os.startfile(STARTUP_FOLDER)


def open_task_manager_startup():
    """Abre el Administrador de tareas en la pestaña Inicio."""
    subprocess.Popen(
        ["taskmgr.exe", "/7", "/startup"],
        creationflags=subprocess.CREATE_NO_WINDOW
    )
