"""
modules/repair/controller.py
Herramientas de reparación de Windows: SFC y DISM.
Ejecuta los comandos en tiempo real y reporta cada línea via progress_cb.
"""
import subprocess
from typing import Callable
from core import logger


def run_sfc(progress_cb: Callable) -> bool:
    """Ejecuta sfc /scannow y reporta salida en tiempo real."""
    progress_cb("=== Iniciando SFC (System File Checker) ===")
    progress_cb("Este proceso puede tardar varios minutos...")
    try:
        proc = subprocess.Popen(
            ["sfc", "/scannow"],
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            creationflags=subprocess.CREATE_NO_WINDOW,
            encoding="utf-8", errors="replace"
        )
        for line in proc.stdout:
            line = line.rstrip()
            if line:
                progress_cb(line)
        proc.wait()
        success = proc.returncode == 0
        if success:
            logger.success("SFC completado sin errores.")
            progress_cb("[OK] SFC finalizado correctamente.")
        else:
            logger.warning(f"SFC terminó con código {proc.returncode}.")
            progress_cb(f"[WARN] SFC terminó con código {proc.returncode}. Revisa el log.")
        return success
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def run_dism_health(progress_cb: Callable) -> bool:
    """Ejecuta DISM /RestoreHealth y reporta salida en tiempo real."""
    progress_cb("=== Iniciando DISM /RestoreHealth ===")
    progress_cb("Este proceso puede tardar 10-20 minutos según la conexión...")
    try:
        proc = subprocess.Popen(
            ["DISM", "/Online", "/Cleanup-Image", "/RestoreHealth"],
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            creationflags=subprocess.CREATE_NO_WINDOW,
            encoding="utf-8", errors="replace"
        )
        for line in proc.stdout:
            line = line.rstrip()
            if line:
                progress_cb(line)
        proc.wait()
        success = proc.returncode == 0
        if success:
            logger.success("DISM RestoreHealth completado.")
            progress_cb("[OK] DISM finalizado correctamente.")
        else:
            logger.warning(f"DISM terminó con código {proc.returncode}.")
            progress_cb(f"[WARN] DISM terminó con código {proc.returncode}.")
        return success
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def run_dism_scanhealth(progress_cb: Callable) -> bool:
    """Ejecuta DISM /ScanHealth para detectar daños sin reparar."""
    progress_cb("=== Iniciando DISM /ScanHealth ===")
    try:
        proc = subprocess.Popen(
            ["DISM", "/Online", "/Cleanup-Image", "/ScanHealth"],
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            creationflags=subprocess.CREATE_NO_WINDOW,
            encoding="utf-8", errors="replace"
        )
        for line in proc.stdout:
            line = line.rstrip()
            if line:
                progress_cb(line)
        proc.wait()
        success = proc.returncode == 0
        progress_cb("[OK] Escaneo completado." if success else f"[WARN] Código {proc.returncode}.")
        return success
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def run_chkdsk(drive: str, progress_cb: Callable) -> bool:
    """Programa chkdsk en la unidad indicada para el próximo reinicio."""
    progress_cb(f"=== Programando CHKDSK en {drive} ===")
    try:
        proc = subprocess.Popen(
            ["chkdsk", drive, "/f", "/r"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            creationflags=subprocess.CREATE_NO_WINDOW,
            encoding="utf-8", errors="replace"
        )
        # Si pregunta si programar para el reinicio, responder "S" o "Y"
        try:
            out, _ = proc.communicate(input="S\n", timeout=15)
            for line in out.splitlines():
                if line.strip():
                    progress_cb(line)
        except subprocess.TimeoutExpired:
            proc.kill()
        logger.success(f"CHKDSK programado en {drive}.")
        progress_cb(f"[OK] CHKDSK programado. Se ejecutará al reiniciar el equipo.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False
