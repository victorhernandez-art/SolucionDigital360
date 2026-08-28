"""
modules/network/controller.py
Diagnóstico y herramientas de red para Windows.
Operaciones disponibles:
  - Obtener IPs locales y pública
  - DNS configurado
  - Ping a hosts clave
  - Flush DNS
  - Reset Winsock / TCP-IP stack
  - Liberar y renovar IP (DHCP)
  - Listar adaptadores de red activos
"""
import os
import socket
import subprocess
import urllib.request
import urllib.error
from typing import Callable

from core import logger

# Hosts para ping de diagnóstico
PING_TARGETS = [
    ("Gateway local",   None),          # se resuelve dinámicamente
    ("Google DNS",      "8.8.8.8"),
    ("Cloudflare DNS",  "1.1.1.1"),
    ("Google Web",      "google.com"),
    ("Microsoft",       "microsoft.com"),
]

# Servicios para obtener IP pública (se prueban en orden)
PUBLIC_IP_SERVICES = [
    "https://api.ipify.org",
    "https://ifconfig.me/ip",
    "https://icanhazip.com",
]


# ── Información de red ───────────────────────────────────────────────────────

def get_local_ips() -> list:
    """Retorna lista de {adapter, ip, mask} para cada adaptador activo."""
    results = []
    try:
        import socket
        hostname = socket.gethostname()
        # getaddrinfo devuelve todas las IPs del host
        for info in socket.getaddrinfo(hostname, None):
            ip = info[4][0]
            if ip not in ("127.0.0.1", "::1") and not ip.startswith("fe80"):
                if ip not in [r["ip"] for r in results]:
                    results.append({"adapter": "—", "ip": ip})
    except Exception:
        pass

    # Complementar con psutil si está disponible (más detallado)
    try:
        import psutil
        results = []
        for name, addrs in psutil.net_if_addrs().items():
            stats = psutil.net_if_stats().get(name)
            if not stats or not stats.isup:
                continue
            for addr in addrs:
                if addr.family == socket.AF_INET and addr.address != "127.0.0.1":
                    results.append({
                        "adapter": name,
                        "ip": addr.address,
                        "mask": addr.netmask or "—",
                    })
    except Exception:
        pass

    return results


def get_public_ip() -> str:
    """Obtiene la IP pública consultando servicios externos. Timeout 5s."""
    for url in PUBLIC_IP_SERVICES:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "TechKit/1.0"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                ip = resp.read().decode().strip()
                if ip:
                    return ip
        except Exception:
            continue
    return "No disponible"


def get_dns_servers() -> list:
    """Lee los servidores DNS configurados en Windows via ipconfig /all."""
    dns_list = []
    try:
        result = subprocess.run(
            ["ipconfig", "/all"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW,
            timeout=10
        )
        for line in result.stdout.splitlines():
            line = line.strip()
            if "DNS" in line and ":" in line:
                parts = line.split(":", 1)
                if len(parts) == 2:
                    val = parts[1].strip()
                    if val and val not in dns_list and _is_ip(val):
                        dns_list.append(val)
    except Exception:
        pass
    return dns_list or ["No detectado"]


def get_default_gateway() -> str:
    """Obtiene el gateway predeterminado via ipconfig."""
    try:
        result = subprocess.run(
            ["ipconfig"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW,
            timeout=10
        )
        for line in result.stdout.splitlines():
            if "Gateway" in line or "Puerta de enlace" in line:
                parts = line.split(":", 1)
                if len(parts) == 2:
                    gw = parts[1].strip()
                    if gw and _is_ip(gw):
                        return gw
    except Exception:
        pass
    return None


def _is_ip(s: str) -> bool:
    """Valida que una cadena sea una IPv4 válida."""
    parts = s.split(".")
    if len(parts) != 4:
        return False
    try:
        return all(0 <= int(p) <= 255 for p in parts)
    except ValueError:
        return False


# ── Ping ─────────────────────────────────────────────────────────────────────

def ping_host(host: str, count: int = 4) -> dict:
    """
    Hace ping a un host y retorna {host, reachable, avg_ms, packet_loss}.
    """
    try:
        result = subprocess.run(
            ["ping", "-n", str(count), host],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW,
            timeout=15
        )
        output = result.stdout

        reachable = "TTL=" in output or "ttl=" in output

        # Extraer tiempo promedio
        avg_ms = None
        for line in output.splitlines():
            line_lower = line.lower()
            if "promedio" in line_lower or "average" in line_lower:
                # "Promedio = 12ms" o "Average = 12ms"
                for part in line.split("="):
                    part = part.strip().replace("ms", "").strip()
                    try:
                        avg_ms = int(part)
                        break
                    except ValueError:
                        continue

        # Extraer pérdida de paquetes
        loss = None
        for line in output.splitlines():
            if "%" in line and ("perdid" in line.lower() or "lost" in line.lower() or "loss" in line.lower()):
                for part in line.split(","):
                    if "%" in part:
                        try:
                            loss = int(part.strip().split("%")[0].split("(")[-1].strip())
                            break
                        except ValueError:
                            pass

        return {
            "host": host,
            "reachable": reachable,
            "avg_ms": avg_ms,
            "packet_loss": loss,
            "raw": output,
        }
    except subprocess.TimeoutExpired:
        return {"host": host, "reachable": False, "avg_ms": None, "packet_loss": 100, "raw": "Timeout"}
    except Exception as e:
        return {"host": host, "reachable": False, "avg_ms": None, "packet_loss": None, "raw": str(e)}


def run_full_ping_test(progress_cb: Callable) -> list:
    """Ejecuta ping a todos los hosts de diagnóstico y retorna resultados."""
    results = []
    gateway = get_default_gateway()

    for label, host in PING_TARGETS:
        if host is None:
            host = gateway
            if not host:
                results.append({"label": label, "host": "No detectado",
                                 "reachable": False, "avg_ms": None, "packet_loss": None})
                continue

        progress_cb(f"Probando {label} ({host})...")
        r = ping_host(host)
        r["label"] = label
        results.append(r)

    return results


# ── Herramientas de red ───────────────────────────────────────────────────────

def flush_dns(progress_cb: Callable) -> bool:
    """Limpia la caché DNS de Windows."""
    progress_cb("Ejecutando: ipconfig /flushdns ...")
    try:
        result = subprocess.run(
            ["ipconfig", "/flushdns"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW,
            timeout=15
        )
        output = result.stdout.strip()
        progress_cb(output)
        success = result.returncode == 0
        if success:
            logger.success("DNS flush completado.")
            progress_cb("[OK] Caché DNS limpiada correctamente.")
        else:
            logger.error(f"DNS flush falló: {result.stderr}")
        return success
    except Exception as e:
        progress_cb(f"Error: {e}")
        logger.error(str(e))
        return False


def reset_winsock(progress_cb: Callable) -> bool:
    """
    Resetea el catálogo Winsock y el stack TCP/IP.
    Requiere reinicio del equipo para aplicar cambios.
    """
    commands = [
        (["netsh", "winsock", "reset"],          "Reseteando Winsock..."),
        (["netsh", "int", "ip", "reset"],         "Reseteando TCP/IP..."),
        (["netsh", "int", "ipv6", "reset"],       "Reseteando IPv6..."),
        (["ipconfig", "/release"],                "Liberando IP..."),
        (["ipconfig", "/renew"],                  "Renovando IP..."),
        (["ipconfig", "/flushdns"],               "Limpiando DNS..."),
    ]
    all_ok = True
    for cmd, msg in commands:
        progress_cb(msg)
        try:
            result = subprocess.run(
                cmd, capture_output=True, text=True,
                creationflags=subprocess.CREATE_NO_WINDOW,
                timeout=30
            )
            if result.stdout.strip():
                progress_cb(f"  {result.stdout.strip()}")
            if result.returncode != 0:
                progress_cb(f"  ⚠️  Código de salida: {result.returncode}")
                all_ok = False
        except subprocess.TimeoutExpired:
            progress_cb(f"  ⚠️  Timeout en: {' '.join(cmd)}")
            all_ok = False
        except Exception as e:
            progress_cb(f"  Error: {e}")
            all_ok = False

    if all_ok:
        logger.success("Reset de red completado. Se recomienda reiniciar el equipo.")
        progress_cb("[OK] Reset completado. Reinicia el equipo para aplicar los cambios.")
    else:
        progress_cb("⚠️  Algunos pasos fallaron. Revisa el log.")
    return all_ok


def release_renew_ip(progress_cb: Callable) -> bool:
    """Libera y renueva la dirección IP (DHCP)."""
    progress_cb("Liberando dirección IP...")
    try:
        subprocess.run(
            ["ipconfig", "/release"],
            capture_output=True, creationflags=subprocess.CREATE_NO_WINDOW, timeout=20
        )
        progress_cb("Renovando dirección IP...")
        result = subprocess.run(
            ["ipconfig", "/renew"],
            capture_output=True, text=True,
            creationflags=subprocess.CREATE_NO_WINDOW, timeout=30
        )
        progress_cb(result.stdout.strip() or "IP renovada.")
        logger.success("IP liberada y renovada.")
        progress_cb("[OK] IP renovada correctamente.")
        return True
    except Exception as e:
        progress_cb(f"Error: {e}")
        logger.error(str(e))
        return False
