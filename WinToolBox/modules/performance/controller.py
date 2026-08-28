"""
modules/performance/controller.py
Lógica de monitoreo de rendimiento del sistema.
Usa psutil para obtener métricas de CPU, RAM, disco y procesos.
NO modifica el sistema salvo al terminar procesos (con confirmación previa en la UI).
"""
import os
import psutil
from typing import Callable

from core import logger


# ── Snapshot de métricas ─────────────────────────────────────────────────────

def get_cpu_percent(interval: float = 0.5) -> float:
    """Retorna el uso de CPU en % (promedio de todos los núcleos)."""
    return psutil.cpu_percent(interval=interval)


def get_cpu_info() -> dict:
    """Retorna información estática de la CPU."""
    freq = psutil.cpu_freq()
    return {
        "logical_cores": psutil.cpu_count(logical=True),
        "physical_cores": psutil.cpu_count(logical=False),
        "freq_current_mhz": round(freq.current, 1) if freq else 0,
        "freq_max_mhz": round(freq.max, 1) if freq else 0,
    }


def get_ram_info() -> dict:
    """Retorna uso de RAM en bytes y porcentaje."""
    mem = psutil.virtual_memory()
    return {
        "total": mem.total,
        "used": mem.used,
        "available": mem.available,
        "percent": mem.percent,
    }


def get_disk_info() -> list:
    """
    Retorna lista de particiones con uso.
    Solo incluye particiones físicas montadas (excluye CD-ROM y sin media).
    """
    partitions = []
    for part in psutil.disk_partitions(all=False):
        # Saltar unidades sin media (ej. lectora vacía)
        if "cdrom" in part.opts.lower() or part.fstype == "":
            continue
        try:
            usage = psutil.disk_usage(part.mountpoint)
            partitions.append({
                "device": part.device,
                "mountpoint": part.mountpoint,
                "fstype": part.fstype,
                "total": usage.total,
                "used": usage.used,
                "free": usage.free,
                "percent": usage.percent,
            })
        except PermissionError:
            pass
    return partitions


def get_top_processes(n: int = 15) -> list:
    """
    Retorna los N procesos con mayor uso de CPU+RAM combinado.
    Cada entrada: {pid, name, cpu_percent, mem_mb, status}
    """
    procs = []
    for proc in psutil.process_iter(["pid", "name", "cpu_percent", "memory_info", "status"]):
        try:
            info = proc.info
            mem_mb = info["memory_info"].rss / (1024 * 1024) if info["memory_info"] else 0
            procs.append({
                "pid": info["pid"],
                "name": info["name"] or "—",
                "cpu_percent": info["cpu_percent"] or 0.0,
                "mem_mb": round(mem_mb, 1),
                "status": info["status"] or "—",
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

    # Ordenar por CPU desc, luego RAM desc
    procs.sort(key=lambda p: (p["cpu_percent"], p["mem_mb"]), reverse=True)
    return procs[:n]


def get_system_recommendations(cpu: float, ram: dict, disks: list) -> list:
    """
    Genera recomendaciones automáticas basadas en las métricas actuales.
    Retorna lista de strings con advertencias/sugerencias.
    """
    tips = []

    if cpu > 85:
        tips.append("⚠️  CPU al {:.0f}% — revisa los procesos que más consumen.".format(cpu))
    elif cpu > 60:
        tips.append("🔶  CPU al {:.0f}% — carga moderada-alta.".format(cpu))

    ram_pct = ram.get("percent", 0)
    ram_avail_gb = ram.get("available", 0) / (1024 ** 3)
    if ram_pct > 90:
        tips.append(f"⚠️  RAM al {ram_pct:.0f}% — memoria crítica, cierra aplicaciones.")
    elif ram_pct > 75:
        tips.append(f"🔶  RAM al {ram_pct:.0f}% — disponible: {ram_avail_gb:.1f} GB.")

    for disk in disks:
        if disk["percent"] > 90:
            tips.append(f"⚠️  Disco {disk['mountpoint']} al {disk['percent']:.0f}% — espacio crítico.")
        elif disk["percent"] > 75:
            tips.append(f"🔶  Disco {disk['mountpoint']} al {disk['percent']:.0f}% — considera liberar espacio.")

    if not tips:
        tips.append("✅  El sistema opera dentro de parámetros normales.")

    return tips


def kill_process(pid: int, progress_cb: Callable) -> bool:
    """
    Termina un proceso por PID.
    Retorna True si fue exitoso, False si falló.
    NUNCA termina procesos del sistema (PID <= 4 o nombre en lista protegida).
    """
    PROTECTED = {"system", "smss.exe", "csrss.exe", "wininit.exe",
                 "winlogon.exe", "lsass.exe", "services.exe", "svchost.exe"}

    if pid <= 4:
        progress_cb("No se puede terminar un proceso del sistema.")
        logger.warning(f"Intento de terminar PID protegido: {pid}")
        return False

    try:
        proc = psutil.Process(pid)
        if proc.name().lower() in PROTECTED:
            progress_cb(f"Proceso protegido, no se puede terminar: {proc.name()}")
            logger.warning(f"Proceso protegido: {proc.name()} (PID {pid})")
            return False

        proc.terminate()
        proc.wait(timeout=5)
        logger.success(f"Proceso terminado: {proc.name()} (PID {pid})")
        progress_cb(f"[OK] Proceso terminado: {proc.name()} (PID {pid})")
        return True

    except psutil.NoSuchProcess:
        progress_cb(f"El proceso PID {pid} ya no existe.")
        return False
    except psutil.AccessDenied:
        progress_cb(f"Acceso denegado para terminar PID {pid}.")
        logger.error(f"AccessDenied al terminar PID {pid}")
        return False
    except psutil.TimeoutExpired:
        try:
            psutil.Process(pid).kill()  # SIGKILL como último recurso
            logger.warning(f"Proceso PID {pid} forzado con SIGKILL.")
            return True
        except Exception as e:
            progress_cb(f"No se pudo forzar la terminación: {e}")
            return False
    except Exception as e:
        progress_cb(f"Error al terminar proceso: {e}")
        logger.error(f"Error kill PID {pid}: {e}")
        return False


def fmt_bytes(n: int) -> str:
    """Formatea bytes a unidad legible."""
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if n < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"
