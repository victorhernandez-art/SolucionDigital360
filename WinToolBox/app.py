"""
app.py
Ventana principal de TechKit.
Sidebar de navegación + área de contenido modular.
Añadir un nuevo módulo = agregar una entrada en NAV_ITEMS.
"""
import customtkinter as ctk
from PIL import Image
import os

from modules.cleaner.view import CleanerView
from modules.performance.view import PerformanceView
from modules.network.view import NetworkView
from modules.sysinfo.view import SysInfoView
from modules.updates.view import UpdatesView
from modules.privacy.view import PrivacyView
from modules.repair.view import RepairView
from modules.usbrepair.view import UsbRepairView
from modules.regcleaner.view import RegCleanerView

# ── Configuración global de apariencia ──────────────────────────────────────
ctk.set_appearance_mode("System")
_THEME_PATH = os.path.join(os.path.dirname(__file__), "assets", "theme.json")
if os.path.isfile(_THEME_PATH):
    ctk.set_default_color_theme(_THEME_PATH)
else:
    ctk.set_default_color_theme("blue")

APP_TITLE = "TechKit"
APP_VERSION = "1.0.0"
WIN_WIDTH = 1100
WIN_HEIGHT = 700
SIDEBAR_WIDTH = 200

# ── Registro de módulos ──────────────────────────────────────────────────────
# Para añadir un nuevo módulo: agrega una entrada aquí con su clase de vista.
NAV_ITEMS = [
    {"label": "🏠  Inicio",             "key": "home",        "view": None},
    {"label": "💻  Info del Sistema",   "key": "sysinfo",     "view": SysInfoView},
    {"label": "📊  Rendimiento",        "key": "performance", "view": PerformanceView},
    {"label": "🧹  Limpieza",           "key": "cleaner",     "view": CleanerView},
    {"label": "🗂️  Registro",           "key": "regcleaner",  "view": RegCleanerView},
    {"label": "🔒  Privacidad",         "key": "privacy",     "view": PrivacyView},
    {"label": "🌐  Diagnóstico de red", "key": "network",     "view": NetworkView},
    {"label": "🔄  Windows Update",     "key": "updates",     "view": UpdatesView},
    {"label": "🔧  Reparación",         "key": "repair",      "view": RepairView},
    {"label": "💾  Reparar USB",        "key": "usbrepair",   "view": UsbRepairView},
]


class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title(f"{APP_TITLE} v{APP_VERSION}")
        self.geometry(f"{WIN_WIDTH}x{WIN_HEIGHT}")
        self.minsize(900, 600)
        self._active_key = None
        self._view_cache: dict = {}
        self._nav_buttons: dict = {}
        self._build_layout()
        self._navigate("home")

    def _build_layout(self):
        # ── Footer fijo (se empaca primero para que no sea desplazado) ────────
        footer = ctk.CTkFrame(self, height=30, corner_radius=0,
                              fg_color=("gray85", "#13161C"))
        footer.pack(side="bottom", fill="x")
        footer.pack_propagate(False)
        ctk.CTkLabel(
            footer,
            text=f"TechKit v{APP_VERSION}  |  Victor Hernández Jovel",
            font=ctk.CTkFont(family="Segoe UI", size=11),
            text_color=("gray50", "gray60")
        ).pack(side="left", padx=16)

        # ── Contenedor del sidebar ────────────────────────────────
        sidebar_outer = ctk.CTkFrame(self, width=SIDEBAR_WIDTH, corner_radius=0,
                                     fg_color=("gray95", "#13161C"))
        sidebar_outer.pack(side="left", fill="y")
        sidebar_outer.pack_propagate(False)

        # Parte inferior fija: toggle de tema
        theme_bar = ctk.CTkFrame(sidebar_outer, corner_radius=0,
                                 fg_color=("gray90", "#1A1D23"))
        theme_bar.pack(side="bottom", fill="x", pady=0)
        ctk.CTkFrame(theme_bar, height=1,
                     fg_color=("gray80", "#2E3340")).pack(fill="x")
        toggle_row = ctk.CTkFrame(theme_bar, fg_color="transparent")
        toggle_row.pack(fill="x", padx=14, pady=10)
        ctk.CTkLabel(toggle_row, text="🌙  Modo oscuro",
                     font=ctk.CTkFont(family="Segoe UI", size=12),
                     text_color=("gray40", "gray70")).pack(side="left")
        self.theme_switch = ctk.CTkSwitch(
            toggle_row, text="",
            command=self._toggle_theme,
            width=44, height=22
        )
        self.theme_switch.pack(side="right")
        if ctk.get_appearance_mode() == "Dark":
            self.theme_switch.select()

        # Parte scrollable: logo + botones
        self.sidebar = ctk.CTkScrollableFrame(
            sidebar_outer, corner_radius=0,
            fg_color="transparent",
            scrollbar_button_color=("gray80", "#2E3340"),
            scrollbar_button_hover_color=("gray60", "#4B5563")
        )
        self.sidebar.pack(side="top", fill="both", expand=True)

        # Logo
        logo_path = os.path.join(os.path.dirname(__file__), "assets", "logo-.png")
        self._logo_img_small = None
        self._logo_img_large = None
        if os.path.isfile(logo_path):
            pil_img = Image.open(logo_path)
            self._logo_img_small = ctk.CTkImage(pil_img, size=(110, 55))
            self._logo_img_large = ctk.CTkImage(pil_img, size=(320, 158))
            ctk.CTkLabel(self.sidebar, image=self._logo_img_small,
                         text="", fg_color="transparent").pack(pady=(18, 2))

        ctk.CTkLabel(
            self.sidebar, text=APP_TITLE,
            font=ctk.CTkFont(family="Segoe UI", size=17, weight="bold"),
            text_color=("gray10", "gray95")
        ).pack(pady=(2, 0))
        ctk.CTkLabel(
            self.sidebar, text=f"v{APP_VERSION}",
            font=ctk.CTkFont(family="Segoe UI", size=10),
            text_color=("gray55", "gray55")
        ).pack(pady=(0, 10))

        # Separador
        ctk.CTkFrame(self.sidebar, height=1,
                     fg_color=("gray80", "#2E3340")).pack(
            fill="x", padx=14, pady=(0, 8))

        # Botones de navegación
        for item in NAV_ITEMS:
            btn = ctk.CTkButton(
                self.sidebar,
                text=item["label"],
                anchor="w",
                height=38,
                corner_radius=8,
                border_spacing=10,
                fg_color="transparent",
                text_color=("gray20", "gray85"),
                hover_color=("gray85", "#2A2F3A"),
                font=ctk.CTkFont(family="Segoe UI", size=13),
                command=lambda k=item["key"]: self._navigate(k),
            )
            btn.pack(fill="x", padx=10, pady=2)
            self._nav_buttons[item["key"]] = btn

        # ── Área de contenido ─────────────────────────────────────
        self.content_area = ctk.CTkFrame(self, corner_radius=0,
                                         fg_color=("gray93", "#1A1D23"))
        self.content_area.pack(side="left", fill="both", expand=True)

    def _navigate(self, key: str):
        if self._active_key == key:
            return

        # Resaltar botón activo
        for k, btn in self._nav_buttons.items():
            if k == key:
                btn.configure(
                    fg_color=("#DBEAFE", "#1E3A5F"),
                    text_color=("#1D4ED8", "#60A5FA")
                )
            else:
                btn.configure(
                    fg_color="transparent",
                    text_color=("gray20", "gray85")
                )

        # Ocultar vista actual
        if self._active_key and self._active_key in self._view_cache:
            self._view_cache[self._active_key].pack_forget()

        self._active_key = key

        # Crear o mostrar vista
        if key not in self._view_cache:
            view_class = next(
                (i["view"] for i in NAV_ITEMS if i["key"] == key), None
            )
            if view_class:
                self._view_cache[key] = view_class(self.content_area)
            else:
                self._view_cache[key] = self._build_placeholder(key)

        self._view_cache[key].pack(fill="both", expand=True)

    def _build_placeholder(self, key: str) -> ctk.CTkFrame:
        """Vista temporal para módulos aún no implementados."""
        frame = ctk.CTkFrame(self.content_area, fg_color="transparent")

        if key == "home":
            # Contenedor centrado verticalmente
            center = ctk.CTkFrame(frame, fg_color="transparent")
            center.place(relx=0.5, rely=0.5, anchor="center")

            # Logo grande si está disponible
            if self._logo_img_large:
                ctk.CTkLabel(center, image=self._logo_img_large, text="").pack(pady=(0, 20))

            ctk.CTkLabel(
                center, text=APP_TITLE,
                font=ctk.CTkFont(size=36, weight="bold")
            ).pack(pady=(0, 8))
            ctk.CTkLabel(
                center, text=f"v{APP_VERSION}",
                font=ctk.CTkFont(size=13), text_color="gray"
            ).pack(pady=(0, 16))

            # Separador
            ctk.CTkFrame(center, height=1, width=300, fg_color="gray40").pack(pady=(0, 16))

            ctk.CTkLabel(
                center,
                text="Suite de herramientas para diagnóstico, optimización y reparación de Windows.",
                font=ctk.CTkFont(size=13),
                text_color="gray",
                wraplength=480,
                justify="center"
            ).pack(pady=(0, 6))

            ctk.CTkLabel(
                center,
                text="Limpia el sistema, monitorea el rendimiento,\n"
                     "diagnostica la red, protege tu privacidad y repara Windows\n"
                     "desde un solo lugar — sin necesidad de comandos.",
                font=ctk.CTkFont(size=12),
                text_color="gray",
                wraplength=480,
                justify="center"
            ).pack(pady=(0, 16))

            ctk.CTkLabel(
                center,
                text="Selecciona un módulo en el panel izquierdo para comenzar.",
                font=ctk.CTkFont(size=14), text_color="gray"
            ).pack()
        else:
            # Placeholder genérico para módulos futuros
            center = ctk.CTkFrame(frame, fg_color="transparent")
            center.place(relx=0.5, rely=0.5, anchor="center")
            ctk.CTkLabel(
                center, text=key.capitalize(),
                font=ctk.CTkFont(size=28, weight="bold")
            ).pack(pady=(0, 8))
            ctk.CTkLabel(
                center, text="Módulo próximamente disponible.",
                font=ctk.CTkFont(size=15), text_color="gray"
            ).pack()

        return frame

    def _toggle_theme(self):
        mode = "Dark" if self.theme_switch.get() else "Light"
        ctk.set_appearance_mode(mode)
