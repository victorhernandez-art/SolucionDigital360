"""
core/logger.py
Logger centralizado. Escribe en archivo y notifica callbacks (para la UI).
"""
import logging
import os
from datetime import datetime
from typing import Callable, List

LOG_DIR = os.path.join(os.environ.get("LOCALAPPDATA", "."), "TechKit", "logs")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, f"techkit_{datetime.now().strftime('%Y%m%d')}.log")

# Configuración del logger de archivo
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)

_ui_callbacks: List[Callable[[str], None]] = []


def register_ui_callback(cb: Callable[[str], None]):
    """Registra una función que recibe mensajes de log para mostrar en la UI."""
    _ui_callbacks.append(cb)


def unregister_ui_callback(cb: Callable[[str], None]):
    if cb in _ui_callbacks:
        _ui_callbacks.remove(cb)


def _notify(message: str):
    for cb in _ui_callbacks:
        try:
            cb(message)
        except Exception:
            pass


def info(msg: str):
    logging.info(msg)
    _notify(f"[INFO] {msg}")


def warning(msg: str):
    logging.warning(msg)
    _notify(f"[WARN] {msg}")


def error(msg: str):
    logging.error(msg)
    _notify(f"[ERROR] {msg}")


def debug(msg: str):
    logging.debug(msg)
    # debug no se muestra en UI para no saturar


def success(msg: str):
    logging.info(f"SUCCESS: {msg}")
    _notify(f"[OK] {msg}")
