"""
modules/printer/controller.py
Gestión de impresoras: listar, limpiar cola, reiniciar spooler.
"""
import subprocess
import winreg
import os
from typing import Callable
from core import logger


def get_printers() -> list:
    """
    Retorna lista de impresoras instaladas.
    Cada entrada: {name, status, is_default, port}
    """
    printers = []
    try:
        result = subprocess.run(
            ["wmic", "printer", "get",
             "Name,PrinterStatus,Default,PortName", "/format:csv"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=15
        )
        lines = [l.strip() for l in result.stdout.splitlines()
                 if l.strip() and l.strip() != "Node,Default,Name,PortName,PrinterStatus"]
        for line in lines:
            parts = line.split(",")
            if len(parts) >= 5:
                _, default, name, port, status_code = parts[0], parts[1], parts[2], parts[3], parts[4]
                status_map = {
                    "1": "Otro", "2": "Desconocido", "3": "Inactiva",
                    "4": "Imprimiendo", "5": "Calentando", "6": "Detenida",
                    "7": "Offline"
                }
                printers.append({
                    "name":       name or "—",
                    "status":     status_map.get(status_code, f"Código {status_code}"),
                    "is_default": default.strip().upper() == "TRUE",
                    "port":       port or "—",
                })
    except Exception as e:
        logger.error(f"Error al listar impresoras: {e}")
    return printers


def get_queue_count(printer_name: str) -> int:
    """Retorna el número de trabajos en cola de una impresora."""
    try:
        result = subprocess.run(
            ["wmic", "printjob", "where",
             f'Name like "%{printer_name}%"', "get", "Name"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=10
        )
        lines = [l for l in result.stdout.splitlines()
                 if l.strip() and "Name" not in l]
        return len(lines)
    except Exception:
        return 0


def clear_print_queue(progress_cb: Callable) -> bool:
    """
    Limpia la cola de impresión:
    1. Detiene el spooler
    2. Elimina archivos de la carpeta spool
    3. Reinicia el spooler
    """
    spool_path = os.path.expandvars(r"%WINDIR%\System32\spool\PRINTERS")
    progress_cb("Deteniendo servicio Spooler...")
    try:
        subprocess.run(["net", "stop", "spooler"],
                       capture_output=True,
                       creationflags=subprocess.CREATE_NO_WINDOW, timeout=15)
        progress_cb("Eliminando trabajos en cola...")
        count = 0
        if os.path.isdir(spool_path):
            for f in os.listdir(spool_path):
                fpath = os.path.join(spool_path, f)
                try:
                    os.remove(fpath)
                    count += 1
                except Exception:
                    pass
        progress_cb(f"  {count} archivo(s) eliminados.")
        progress_cb("Reiniciando servicio Spooler...")
        subprocess.run(["net", "start", "spooler"],
                       capture_output=True,
                       creationflags=subprocess.CREATE_NO_WINDOW, timeout=15)
        logger.success("Cola de impresión limpiada y spooler reiniciado.")
        progress_cb("[OK] Cola limpiada y spooler reiniciado correctamente.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        # Intentar reiniciar spooler aunque haya fallado algo
        try:
            subprocess.run(["net", "start", "spooler"],
                           capture_output=True,
                           creationflags=subprocess.CREATE_NO_WINDOW, timeout=10)
        except Exception:
            pass
        return False


def restart_spooler(progress_cb: Callable) -> bool:
    """Reinicia el servicio de spooler sin limpiar la cola."""
    progress_cb("Reiniciando servicio Spooler...")
    try:
        subprocess.run(["net", "stop", "spooler"],
                       capture_output=True,
                       creationflags=subprocess.CREATE_NO_WINDOW, timeout=15)
        subprocess.run(["net", "start", "spooler"],
                       capture_output=True,
                       creationflags=subprocess.CREATE_NO_WINDOW, timeout=15)
        logger.success("Spooler reiniciado.")
        progress_cb("[OK] Spooler reiniciado correctamente.")
        return True
    except Exception as e:
        progress_cb(f"[ERROR] {e}")
        logger.error(str(e))
        return False


def open_printers_panel():
    """Abre el panel de impresoras de Windows."""
    subprocess.Popen(
        ["control", "printers"],
        creationflags=subprocess.CREATE_NO_WINDOW
    )
