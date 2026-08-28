"""
core/uac.py
Manejo de elevación de permisos UAC en Windows.
Solo solicita elevación si el proceso actual NO es administrador.
"""
import ctypes
import sys
import os

# Variable de entorno para evitar loop de elevación
_ELEVATED_FLAG = "TECHKIT_ELEVATED"


def is_admin() -> bool:
    """Retorna True si el proceso actual tiene privilegios de administrador."""
    try:
        return bool(ctypes.windll.shell32.IsUserAnAdmin())
    except Exception:
        return False


def request_elevation():
    """
    Re-lanza el proceso actual con privilegios de administrador via ShellExecute.
    Termina el proceso actual si la elevación es exitosa.
    """
    script = os.path.abspath(sys.argv[0])
    params = " ".join(f'"{a}"' for a in sys.argv[1:])

    # Marcar que ya se intentó elevar para evitar loops
    os.environ[_ELEVATED_FLAG] = "1"

    ret = ctypes.windll.shell32.ShellExecuteW(
        None, "runas", sys.executable,
        f'"{script}" {params}', None, 1
    )
    if ret > 32:
        sys.exit(0)
    else:
        # Usuario canceló UAC — continuar sin admin
        pass


def ensure_admin():
    """
    Solicita elevación si no es admin y no se ha intentado ya.
    Evita loops infinitos de re-lanzamiento.
    """
    # Si ya se intentó elevar, no volver a intentar
    if os.environ.get(_ELEVATED_FLAG) == "1":
        return

    if not is_admin():
        request_elevation()
