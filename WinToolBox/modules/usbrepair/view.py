"""
modules/usbrepair/view.py
Panel de UI — Reparación de USB infectados por virus.
"""
import customtkinter as ctk
from tkinter import messagebox, filedialog
from core.worker import Worker
from core import logger
from modules.usbrepair import controller as ctrl


class UsbRepairView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._drives = []
        self._build_ui()
        self._scan_drives()

    def _build_ui(self):
        # Título
        ctk.CTkLabel(self, text="Reparación de USB",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(
            self,
            text="Restaura archivos ocultos por virus y elimina accesos directos maliciosos.",
            font=ctk.CTkFont(size=13), text_color="gray"
        ).pack(anchor="w", padx=20, pady=(0, 16))

        # ── Detección de unidades ────────────────────────────────
        detect_frame = ctk.CTkFrame(self)
        detect_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(detect_frame, text="Unidades detectadas",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 8))

        drive_row = ctk.CTkFrame(detect_frame, fg_color="transparent")
        drive_row.pack(fill="x", padx=14, pady=(0, 4))

        ctk.CTkLabel(drive_row, text="Unidad USB:",
                     font=ctk.CTkFont(size=12)).pack(side="left")
        self._drive_var = ctk.StringVar(value="Buscando...")
        self._drive_menu = ctk.CTkOptionMenu(
            drive_row, variable=self._drive_var,
            values=["Buscando..."], width=280,
            command=self._on_drive_selected
        )
        self._drive_menu.pack(side="left", padx=8)
        ctk.CTkButton(
            drive_row, text="🔄  Buscar", width=100, height=32,
            command=self._scan_drives
        ).pack(side="left", padx=4)

        # Info de la unidad seleccionada
        self._drive_info = ctk.CTkLabel(
            detect_frame, text="",
            font=ctk.CTkFont(size=11), text_color="gray"
        )
        self._drive_info.pack(anchor="w", padx=14, pady=(2, 10))

        # Opción manual
        manual_row = ctk.CTkFrame(detect_frame, fg_color="transparent")
        manual_row.pack(fill="x", padx=14, pady=(0, 10))
        ctk.CTkLabel(manual_row, text="O selecciona manualmente:",
                     font=ctk.CTkFont(size=11), text_color="gray").pack(side="left")
        ctk.CTkButton(
            manual_row, text="📂  Examinar...", width=120, height=28,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            command=self._browse_drive
        ).pack(side="left", padx=8)

        # ── Qué hace la reparación ───────────────────────────────
        info_frame = ctk.CTkFrame(self)
        info_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(info_frame, text="¿Qué hace la reparación?",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 6))

        steps = [
            ("1", "Elimina autorun.inf y archivos de virus conocidos en la raíz"),
            ("2", "Elimina carpetas creadas por virus (Recycler, RECYCLED)"),
            ("3", "Elimina accesos directos (.lnk) sospechosos en la raíz"),
            ("4", "Restaura atributos ocultos/sistema de todos los archivos y carpetas"),
        ]
        for num, desc in steps:
            row = ctk.CTkFrame(info_frame, fg_color="transparent")
            row.pack(fill="x", padx=14, pady=2)
            ctk.CTkLabel(
                row,
                text=f"  {num}.",
                font=ctk.CTkFont(size=12, weight="bold"),
                text_color="#2980b9", width=28
            ).pack(side="left")
            ctk.CTkLabel(
                row, text=desc,
                font=ctk.CTkFont(size=12), anchor="w"
            ).pack(side="left")

        ctk.CTkLabel(
            info_frame,
            text="⚠️  Los archivos originales NO se eliminan. Solo se restauran sus atributos.",
            font=ctk.CTkFont(size=11), text_color="#e67e22"
        ).pack(anchor="w", padx=14, pady=(6, 10))

        # ── Botón principal ──────────────────────────────────────
        btn_row = ctk.CTkFrame(self, fg_color="transparent")
        btn_row.pack(anchor="w", padx=20, pady=(0, 12))
        self._repair_btn = ctk.CTkButton(
            btn_row,
            text="🔧  Iniciar Reparación",
            width=200, height=36,
            fg_color="#2980b9", hover_color="#1a5276",
            font=ctk.CTkFont(size=13, weight="bold"),
            command=self._start_repair
        )
        self._repair_btn.pack(side="left")

        # ── Resumen de resultados ────────────────────────────────
        self._result_frame = ctk.CTkFrame(self)
        self._result_frame.pack(fill="x", padx=20, pady=(0, 8))
        self._result_frame.pack_forget()   # oculto hasta que haya resultados

        # Barra de progreso
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop(); self._progress.set(0)

        # Log
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(
            self, height=180, font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="both", expand=True, padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    # ── Detección de unidades ────────────────────────────────────────────────

    def _scan_drives(self):
        self._drive_menu.configure(values=["Buscando..."])
        self._drive_var.set("Buscando...")
        Worker(
            task_fn=lambda cb: ctrl.get_usb_drives(),
            on_progress=lambda m: None,
            on_done=self._on_drives_found,
        ).start()

    def _on_drives_found(self, success, result):
        def _do():
            self._drives = result or []
            if not self._drives:
                self._drive_menu.configure(values=["No se encontraron USB"])
                self._drive_var.set("No se encontraron USB")
                self._drive_info.configure(text="Conecta una USB y presiona 'Buscar'.")
                self._repair_btn.configure(state="disabled")
                return

            labels = [
                f"{d['letter']}  {d['label']}  ({d['size_gb']} GB)"
                for d in self._drives
            ]
            self._drive_menu.configure(values=labels)
            self._drive_var.set(labels[0])
            self._on_drive_selected(labels[0])
            self._repair_btn.configure(state="normal")
        self.after(0, _do)

    def _on_drive_selected(self, value: str):
        # Buscar la unidad correspondiente
        for d in self._drives:
            if d["letter"] in value:
                self._drive_info.configure(
                    text=f"Tamaño: {d['size_gb']} GB  |  "
                         f"Libre: {d['free_gb']} GB  |  "
                         f"Sistema de archivos: {d['fstype']}"
                )
                return

    def _browse_drive(self):
        path = filedialog.askdirectory(title="Selecciona la unidad USB")
        if path:
            # Normalizar a letra de unidad si es posible
            drive_letter = path[:3] if len(path) >= 3 else path
            self._drive_var.set(drive_letter)
            self._drive_info.configure(text=f"Ruta seleccionada: {path}")
            self._repair_btn.configure(state="normal")
            # Guardar como entrada manual
            self._manual_path = path

    # ── Reparación ───────────────────────────────────────────────────────────

    def _get_selected_drive(self) -> str:
        """Extrae la letra de unidad del valor seleccionado."""
        val = self._drive_var.get()
        # Si viene del menú: "C:\  USB  (8.0 GB)" → extraer "C:\"
        for d in self._drives:
            if d["letter"] in val:
                return d["letter"]
        # Si viene de selección manual
        if hasattr(self, "_manual_path"):
            return self._manual_path
        # Fallback: tomar los primeros 3 caracteres
        return val[:3] if len(val) >= 3 else val

    def _start_repair(self):
        drive = self._get_selected_drive()
        if not drive or "No se encontraron" in drive or "Buscando" in drive:
            messagebox.showwarning("Sin unidad", "Selecciona una unidad USB primero.")
            return

        ok = messagebox.askyesno(
            "Confirmar reparación",
            f"Se reparará la unidad: {drive}\n\n"
            "• Se eliminarán archivos de virus (autorun.inf, .lnk, Recycler)\n"
            "• Se restaurarán los atributos de TODOS los archivos\n\n"
            "Los archivos originales NO serán eliminados.\n\n"
            "¿Continuar?"
        )
        if not ok:
            return

        self._set_busy(True)
        self._hide_results()

        Worker(
            task_fn=lambda cb: ctrl.repair_usb(drive, cb),
            on_progress=self._append_log,
            on_done=self._on_repair_done,
        ).start()

    def _on_repair_done(self, success: bool, result):
        def _do():
            self._set_busy(False)
            if not success:
                messagebox.showerror("Error", f"La reparación falló:\n{result}")
                return
            stats = result or {}
            self._show_results(stats)
            messagebox.showinfo(
                "Reparación completada",
                f"✅ Archivos restaurados: {stats.get('restored', 0)}\n"
                f"🗑  Maliciosos eliminados: {stats.get('deleted_malicious', 0)}\n"
                f"🗑  Accesos directos eliminados: {stats.get('deleted_shortcuts', 0)}\n\n"
                "Revisa la USB — tus archivos deberían ser visibles nuevamente."
            )
        self.after(0, _do)

    # ── Resultados ───────────────────────────────────────────────────────────

    def _show_results(self, stats: dict):
        for w in self._result_frame.winfo_children():
            w.destroy()
        self._result_frame.pack(fill="x", padx=20, pady=(0, 8))

        ctk.CTkLabel(self._result_frame, text="Resultado",
                     font=ctk.CTkFont(size=13, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(8, 6))

        items = [
            (f"✅  {stats.get('restored', 0)} archivos/carpetas restaurados",   "#27ae60"),
            (f"🗑  {stats.get('deleted_malicious', 0)} archivos maliciosos eliminados", "#e74c3c"),
            (f"🗑  {stats.get('deleted_shortcuts', 0)} accesos directos eliminados",    "#e74c3c"),
        ]
        if stats.get("errors", 0):
            items.append((f"⚠️  {stats['errors']} errores (ver log)", "#e67e22"))

        for text, color in items:
            ctk.CTkLabel(self._result_frame, text=text,
                         font=ctk.CTkFont(size=12), text_color=color
                         ).pack(anchor="w", padx=14, pady=2)
        ctk.CTkFrame(self._result_frame, height=8, fg_color="transparent").pack()

    def _hide_results(self):
        self._result_frame.pack_forget()

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _set_busy(self, busy: bool):
        self._repair_btn.configure(state="disabled" if busy else "normal")
        self._drive_menu.configure(state="disabled" if busy else "normal")
        if busy:
            self._progress.start()
        else:
            self._progress.stop(); self._progress.set(0)

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
