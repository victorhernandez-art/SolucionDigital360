"""
main.py
Punto de entrada de TechKit.
Solicita elevación UAC si es necesario, luego lanza la UI.
"""
import sys
import os

# Asegurar que el directorio raíz del proyecto esté en el path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.uac import ensure_admin
from app import App


def main():
    # Solicitar privilegios de administrador (necesarios para instalar Office y limpiar carpetas del sistema)
    ensure_admin()

    app = App()
    app.mainloop()


if __name__ == "__main__":
    main()
