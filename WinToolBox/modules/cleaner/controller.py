"""
modules/cleaner/controller.py
Lógica de limpieza segura del sistema.
Solo elimina archivos en rutas conocidas y seguras.
NUNCA toca el registro ni archivos del sistema.
"""
import os
import shutil
import stat
from typing import Callable

from core import logger

# ── Rutas seguras para limpiar ───────────────────────────────────────────────
# Expandidas en tiempo de ejecución para respetar el usuario actual.
SAFE_TARGETS = [
    os.path.expandvars(r"%TEMP%"),
    os.path.expandvars(r"%WINDIR%\Temp"),
    os.path.expandvars(r"%LOCALAPPDATA%\Temp"),
    os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\INetCache"),
    os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Explorer"),  # thumbcache
    os.path.expandvars(r"%WINDIR%\SoftwareDistribution\Download"),     # Windows Update cache
    os.path.expandvars(r"%LOCALAPPDATA%\CrashDumps"),
    os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\WER"),       # Error reports
]

# Extensiones que NUNCA se eliminarán aunque estén en carpetas seguras
PROTECTED_EXTENSIONS = {".sys", ".dll", ".exe", ".ini", ".dat"}


def _safe_remove(path: str, progress_cb: Callable[[str], None]) -> tuple[int, int]:
    """
    Elimina archivos/carpetas en `path` de forma segura.
    Retorna (archivos_eliminados, bytes_liberados).
    """
    removed = 0
    freed = 0

    if not os.path.exists(path):
        return 0, 0

    for entry in os.scandir(path):
        try:
            if entry.is_file(follow_symlinks=False):
                ext = os.path.splitext(entry.name)[1].lower()
                if ext in PROTECTED_EXTENSIONS:
                    continue
                size = entry.stat().st_size
                os.chmod(entry.path, stat.S_IWRITE)
                os.remove(entry.path)
                removed += 1
                freed += size
                logger.debug(f"Eliminado: {entry.path}")

            elif entry.is_dir(follow_symlinks=False):
                size = _dir_size(entry.path)
                shutil.rmtree(entry.path, ignore_errors=True)
                freed += size
                removed += 1
                logger.debug(f"Carpeta eliminada: {entry.path}")

        except PermissionError:
            logger.warning(f"Sin permisos: {entry.path}")
        except Exception as exc:
            logger.warning(f"No se pudo eliminar {entry.path}: {exc}")

    return removed, freed


def _dir_size(path: str) -> int:
    """Calcula el tamaño total de una carpeta en bytes."""
    total = 0
    try:
        for dirpath, _, filenames in os.walk(path):
            for f in filenames:
                try:
                    total += os.path.getsize(os.path.join(dirpath, f))
                except OSError:
                    pass
    except OSError:
        pass
    return total


def scan_junk(progress_cb: Callable) -> dict:
    """
    Escanea las rutas seguras y retorna un resumen sin eliminar nada.
    Retorna dict con {ruta: bytes_encontrados}.
    """
    results = {}
    for target in SAFE_TARGETS:
        if os.path.exists(target):
            size = _dir_size(target)
            if size > 0:
                results[target] = size
                progress_cb(f"Encontrado: {target}  ({_fmt_size(size)})")
    return results


def clean_junk(progress_cb: Callable, targets: list = None) -> dict:
    """
    Limpia las rutas indicadas (o todas las seguras si targets=None).
    Retorna resumen {total_archivos, total_bytes}.
    """
    to_clean = targets if targets else SAFE_TARGETS
    total_files = 0
    total_bytes = 0

    for target in to_clean:
        progress_cb(f"Limpiando: {target}")
        files, freed = _safe_remove(target, progress_cb)
        total_files += files
        total_bytes += freed
        progress_cb(f"  → {files} elementos, {_fmt_size(freed)} liberados")

    logger.success(
        f"Limpieza completada: {total_files} elementos, {_fmt_size(total_bytes)} liberados."
    )
    progress_cb(f"[OK] Total: {total_files} elementos eliminados, {_fmt_size(total_bytes)} liberados.")
    return {"files": total_files, "bytes": total_bytes}


def _fmt_size(size_bytes: int) -> str:
    """Formatea bytes a unidad legible."""
    for unit in ("B", "KB", "MB", "GB"):
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"
