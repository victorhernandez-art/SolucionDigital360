"""
modules/startup/view.py
Panel de UI para gestión de programas de inicio de Windows.
"""
import customtkinter as ctk
from tkinter import messagebox

from core.worker import Worker
from core import logger
from modules.startup import controller as ctrl


class StartupView(ctk.CTkFrame):
    """Panel principal del módulo Inicio del Sistema."""

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._entries: list = []
        self._build_ui()
        self._load_entries()

    # ── Construcción de UI ───────────────────────────────────────────────────

    def _build_ui(self):
        # Título
        ctk.CTkLabel(
            self, text="Inicio del Sistema",
            font=ctk.CTkFont(size=20, weight="bold")
        ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(
            self,
            text="Administra los programas que se ejecutan al iniciar Windows. "
                 "Las entradas deshabilitadas se guardan y pueden restaurarse.",
            font=ctk.CTkFont(size=13), text_color="gray",
            wraplength=800, justify="left"
        ).pack(anchor="w", padx=20, pady=(0, 14))

        # Barra de acciones
        bar = ctk.CTkFrame(self, fg_color="transparent")
        bar.pack(fill="x", padx=20, pady=(0, 8))

        self._refresh_btn = ctk.CTkButton(
            bar, text="🔄  Actualizar", width=140, height=34,
            command=self._load_entries
        )
        self._refresh_btn.pack(side="left", padx=(0, 10))

        ctk.CTkButton(
            bar, text="📂  Abrir carpeta Startup", width=190, height=34,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            command=ctrl.open_startup_folder
        ).pack(side="left", padx=(0, 10))

        self._count_label = ctk.CTkLabel(
            bar, text="", font=ctk.CTkFont(size=12), text_color="gray"
        )
        self._count_label.pack(side="left", padx=10)

        # Cabecera de columnas
        header = ctk.CTkFrame(self, fg_color=("gray85", "gray20"), corner_radius=6)
        header.pack(fill="x", padx=20, pady=(0, 2))
        for text, w in [("Nombre", 200), ("Comando / Ruta", 340), ("Origen", 160), ("Estado", 90), ("Acción", 110)]:
            ctk.CTkLabel(
                header, text=text, width=w, anchor="w",
                font=ctk.CTkFont(size=12, weight="bold")
            ).pack(side="left", padx=8, pady=5)

        # Lista scrollable
        self._list_frame = ctk.CTkScrollableFrame(self, height=380)
        self._list_frame.pack(fill="both", expand=True, padx=20, pady=(0, 10))

        # Barra de progreso
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop()
        self._progress.set(0)

        # Log
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(
            self, height=70, font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="x", padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    # ── Carga de datos ───────────────────────────────────────────────────────

    def _load_entries(self):
        self._set_busy(True)
        Worker(
            task_fn=lambda cb: ctrl.get_startup_entries(),
            on_progress=self._append_log,
            on_done=self._on_loaded,
        ).start()

    def _on_loaded(self, success: bool, result):
        def _do():
            self._set_busy(False)
            if not success:
                messagebox.showerror("Error", f"No se pudieron cargar las entradas:\n{result}")
                return
            self._entries = result
            self._render_entries(result)
            enabled = sum(1 for e in result if e["enabled"])
            disabled = len(result) - enabled
            self._count_label.configure(
                text=f"{len(result)} entradas  •  {enabled} activas  •  {disabled} deshabilitadas"
            )
        self.after(0, _do)

    def _render_entries(self, entries: list):
        for w in self._list_frame.winfo_children():
            w.destroy()

        if not entries:
            ctk.CTkLabel(
                self._list_frame,
                text="No se encontraron entradas de inicio.",
                text_color="gray"
            ).pack(pady=20)
            return

        for i, entry in enumerate(entries):
            bg = ("gray92", "gray18") if i % 2 == 0 else ("gray86", "gray22")
            row = ctk.CTkFrame(self._list_frame, fg_color=bg, corner_radius=4)
            row.pack(fill="x", pady=1)

            # Nombre
            ctk.CTkLabel(
                row, text=entry["name"], width=200, anchor="w",
                font=ctk.CTkFont(size=12)
            ).pack(side="left", padx=8)

            # Comando (truncado)
            cmd = entry["command"]
            cmd_display = cmd if len(cmd) <= 45 else cmd[:42] + "..."
            ctk.CTkLabel(
                row, text=cmd_display, width=340, anchor="w",
                font=ctk.CTkFont(size=11), text_color="gray"
            ).pack(side="left", padx=4)

            # Origen
            ctk.CTkLabel(
                row, text=entry["source"], width=160, anchor="w",
                font=ctk.CTkFont(size=11), text_color="gray"
            ).pack(side="left", padx=4)

            # Estado
            estado_color = "#27ae60" if entry["enabled"] else "#e74c3c"
            estado_text  = "✅ Activo" if entry["enabled"] else "⛔ Inactivo"
            ctk.CTkLabel(
                row, text=estado_text, width=90, anchor="w",
                font=ctk.CTkFont(size=11), text_color=estado_color
            ).pack(side="left", padx=4)

            # Botón acción
            if entry["enabled"]:
                ctk.CTkButton(
                    row, text="Deshabilitar", width=100, height=24,
                    fg_color="#e67e22", hover_color="#ca6f1e",
                    font=ctk.CTkFont(size=11),
                    command=lambda e=entry: self._toggle(e, disable=True)
                ).pack(side="left", padx=6, pady=3)
            else:
                ctk.CTkButton(
                    row, text="Habilitar", width=100, height=24,
                    fg_color="#27ae60", hover_color="#1e8449",
                    font=ctk.CTkFont(size=11),
                    command=lambda e=entry: self._toggle(e, disable=False)
                ).pack(side="left", padx=6, pady=3)

    # ── Acciones ─────────────────────────────────────────────────────────────

    def _toggle(self, entry: dict, disable: bool):
        action = "deshabilitar" if disable else "habilitar"
        ok = messagebox.askyesno(
            f"Confirmar",
            f"¿Deseas {action} '{entry['name']}' del inicio de Windows?"
        )
        if not ok:
            return

        self._set_busy(True)

        def task(cb):
            if disable:
                return ctrl.disable_entry(entry, cb)
            else:
                return ctrl.enable_entry(entry, cb)

        Worker(
            task_fn=task,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (self._set_busy(False), self._load_entries())),
        ).start()

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _set_busy(self, busy: bool):
        state = "disabled" if busy else "normal"
        self._refresh_btn.configure(state=state)
        if busy:
            self._progress.start()
        else:
            self._progress.stop()
            self._progress.set(0)

    def _append_log(self, msg: str):
        def _do():
            self.log_box.configure(state="normal")
            self.log_box.insert("end", msg + "\n")
            self.log_box.see("end")
            self.log_box.configure(state="disabled")
        self.after(0, _do)

    def destroy(self):
        logger.unregister_ui_callback(self._append_log)
        super().destroy()
