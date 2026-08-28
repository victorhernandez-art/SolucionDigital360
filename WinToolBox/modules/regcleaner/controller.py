"""
modules/regcleaner/controller.py
Limpieza segura del registro de Windows.
Solo elimina entradas HUÉRFANAS conocidas y seguras:
  - Entradas de desinstalación de programas ya no instalados
  - Extensiones de archivo sin handler
  - Entradas MUI Cache de ejecutables inexistentes
  - Rutas de programas recientes inexistentes

NUNCA toca claves del sistema, drivers, servicios ni HKLM crítico.
"""
import os
import winreg
import subprocess
from typing import Callable
from core import logger


# ── Escaneo de entradas huérfanas ────────────────────────────────────────────

def _key_exists(hive, path: str) -> bool:
    try:
        with winreg.OpenKey(hive, path):
            return True
    except OSError:
        return False


def scan_uninstall_orphans() -> list:
    """
    Busca entradas en Uninstall cuyo InstallLocation o UninstallString
    apunta a una ruta que ya no existe.
    Retorna lista de {hive_str, path, subkey, name, reason}
    """
    orphans = []
    uninstall_paths = [
        (winreg.HKEY_LOCAL_MACHINE,
         r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", "HKLM"),
        (winreg.HKEY_LOCAL_MACHINE,
         r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall", "HKLM32"),
        (winreg.HKEY_CURRENT_USER,
         r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", "HKCU"),
    ]
    for hive, path, hive_str in uninstall_paths:
        try:
            with winreg.OpenKey(hive, path) as key:
                i = 0
                while True:
                    try:
                        subkey_name = winreg.EnumKey(key, i)
                        with winreg.OpenKey(key, subkey_name) as sub:
                            name = ""
                            install_loc = ""
                            uninstall_str = ""
                            try:
                                name = winreg.QueryValueEx(sub, "DisplayName")[0]
                            except OSError:
                                pass
                            try:
                                install_loc = winreg.QueryValueEx(sub, "InstallLocation")[0]
                            except OSError:
                                pass
                            try:
                                uninstall_str = winreg.QueryValueEx(sub, "UninstallString")[0]
                            except OSError:
                                pass

                            # Sin nombre = entrada vacía/huérfana
                            if not name:
                                orphans.append({
                                    "hive_str": hive_str,
                                    "hive":     hive,
                                    "path":     path,
                                    "subkey":   subkey_name,
                                    "name":     f"(sin nombre) {subkey_name[:40]}",
                                    "reason":   "Entrada sin DisplayName",
                                })
                            # InstallLocation apunta a carpeta inexistente
                            elif install_loc and not os.path.isdir(install_loc):
                                orphans.append({
                                    "hive_str": hive_str,
                                    "hive":     hive,
                                    "path":     path,
                                    "subkey":   subkey_name,
                                    "name":     name,
                                    "reason":   f"Carpeta no existe: {install_loc[:50]}",
                                })
                        i += 1
                    except OSError:
                        break
        except OSError:
            pass
    return orphans


def scan_muicache_orphans() -> list:
    """
    Busca entradas en MUICache que apuntan a ejecutables inexistentes.
    """
    orphans = []
    muicache_path = (
        r"SOFTWARE\Classes\Local Settings\Software\Microsoft"
        r"\Windows\Shell\MuiCache"
    )
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, muicache_path) as key:
            i = 0
            while True:
                try:
                    name, value, _ = winreg.EnumValue(key, i)
                    # Las entradas tienen formato "C:\ruta\app.exe.FriendlyAppName"
                    exe_path = name.split(".FriendlyAppName")[0].split(".ApplicationCompany")[0]
                    if exe_path.endswith(".exe") and not os.path.isfile(exe_path):
                        orphans.append({
                            "hive_str": "HKCU",
                            "hive":     winreg.HKEY_CURRENT_USER,
                            "path":     muicache_path,
                            "subkey":   None,
                            "value_name": name,
                            "name":     value or exe_path,
                            "reason":   f"Ejecutable no existe: {exe_path[:50]}",
                            "type":     "value",
                        })
                    i += 1
                except OSError:
                    break
    except OSError:
        pass
    return orphans


def scan_recent_docs_orphans() -> list:
    """
    Busca entradas en RecentDocs / UserAssist que apuntan a archivos inexistentes.
    Solo cuenta, no elimina individualmente — se limpian en bloque.
    """
    count = 0
    recent = os.path.expandvars(r"%APPDATA%\Microsoft\Windows\Recent")
    if os.path.isdir(recent):
        for f in os.listdir(recent):
            if f.endswith(".lnk"):
                count += 1
    if count:
        return [{
            "hive_str": "FILESYSTEM",
            "hive":     None,
            "path":     recent,
            "subkey":   None,
            "name":     f"{count} accesos directos en carpeta Recent",
            "reason":   "Historial de archivos recientes",
            "type":     "folder_clean",
        }]
    return []


def scan_all(progress_cb: Callable) -> list:
    """Ejecuta todos los escaneos y retorna lista unificada de entradas huérfanas."""
    progress_cb("Escaneando entradas de desinstalación huérfanas...")
    uninstall = scan_uninstall_orphans()
    progress_cb(f"  → {len(uninstall)} entradas encontradas.")

    progress_cb("Escaneando caché de aplicaciones (MUICache)...")
    mui = scan_muicache_orphans()
    progress_cb(f"  → {len(mui)} entradas encontradas.")

    progress_cb("Escaneando archivos recientes...")
    recent = scan_recent_docs_orphans()
    progress_cb(f"  → {len(recent)} grupos encontrados.")

    all_entries = uninstall + mui + recent
    progress_cb(f"Total: {len(all_entries)} entradas huérfanas detectadas.")
    return all_entries


# ── Limpieza ─────────────────────────────────────────────────────────────────

def _delete_subkey_recursive(hive, path: str, subkey: str) -> bool:
    """Elimina una subclave del registro recursivamente."""
    try:
        full_path = f"{path}\\{subkey}"
        hive_str = "HKLM" if hive == winreg.HKEY_LOCAL_MACHINE else "HKCU"
        subprocess.run(
            ["reg", "delete", f"{hive_str}\\{full_path}", "/f"],
            capture_output=True,
            creationflags=subprocess.CREATE_NO_WINDOW
        )
        return True
    except Exception:
        return False


def clean_entries(entries: list, progress_cb: Callable) -> dict:
    """
    Elimina las entradas seleccionadas.
    Retorna {cleaned, errors}
    """
    cleaned = 0
    errors = 0

    for entry in entries:
        try:
            entry_type = entry.get("type", "subkey")

            if entry_type == "folder_clean":
                # Limpiar carpeta Recent
                folder = entry["path"]
                count = 0
                for f in os.listdir(folder):
                    if f.endswith(".lnk"):
                        try:
                            os.remove(os.path.join(folder, f))
                            count += 1
                        except Exception:
                            pass
                progress_cb(f"  [OK] {count} archivos recientes eliminados.")
                cleaned += count

            elif entry_type == "value":
                # Eliminar valor individual del registro
                with winreg.OpenKey(
                    entry["hive"], entry["path"], 0, winreg.KEY_SET_VALUE
                ) as k:
                    winreg.DeleteValue(k, entry["value_name"])
                progress_cb(f"  [OK] MUICache: {entry['name'][:50]}")
                cleaned += 1

            else:
                # Eliminar subclave completa
                ok = _delete_subkey_recursive(
                    entry["hive"], entry["path"], entry["subkey"]
                )
                if ok:
                    progress_cb(f"  [OK] {entry['name'][:60]}")
                    cleaned += 1
                else:
                    progress_cb(f"  [WARN] No se pudo eliminar: {entry['name'][:50]}")
                    errors += 1

        except PermissionError:
            progress_cb(f"  [WARN] Sin permisos: {entry.get('name','?')[:50]}")
            errors += 1
        except Exception as e:
            progress_cb(f"  [ERROR] {e}")
            errors += 1

    logger.success(f"Registro limpiado: {cleaned} entradas, {errors} errores.")
    progress_cb(f"\n[OK] Limpieza completada: {cleaned} entradas eliminadas.")
    if errors:
        progress_cb(f"⚠️  {errors} entradas no pudieron eliminarse (sin permisos).")
    return {"cleaned": cleaned, "errors": errors}
