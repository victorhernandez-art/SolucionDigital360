"""
modules/cleaner/view.py
Panel de UI para limpieza segura del sistema.
"""
import tkinter as tk
import customtkinter as ctk
from tkinter import messagebox

from core.worker import Worker
from core import logger
from modules.cleaner import controller as ctrl


class CleanerView(ctk.CTkFrame):
    """Panel principal del módulo Limpieza."""

    def __init__(self, master, **kwargs):
        super().__init__(master, **kwargs)
        self.configure(fg_color="transparent")
        self._scan_results: dict = {}
        self._checkboxes: dict[str, ctk.BooleanVar] = {}
        self._build_ui()

    def _build_ui(self):
        # ── Título ───────────────────────────────────────────────
        ctk.CTkLabel(
            self, text="Limpieza del Sistema",
            font=ctk.CTkFont(size=20, weight="bold")
        ).pack(anchor="w", padx=20, pady=(20, 4))

        ctk.CTkLabel(
            self,
            text="Elimina archivos temporales, cachés y residuos de Windows Update de forma segura.",
            font=ctk.CTkFont(size=13), text_color="gray"
        ).pack(anchor="w", padx=20, pady=(0, 16))

        # ── Botón Escanear ───────────────────────────────────────
        top_bar = ctk.CTkFrame(self, fg_color="transparent")
        top_bar.pack(fill="x", padx=20, pady=(0, 12))

        self.scan_btn = ctk.CTkButton(
            top_bar, text="🔍  Escanear", command=self._on_scan,
            width=160, height=38
        )
        self.scan_btn.pack(side="left", padx=(0, 12))

        self.clean_btn = ctk.CTkButton(
            top_bar, text="🧹  Limpiar seleccionados",
            command=self._on_clean, width=200, height=38,
            fg_color="#e67e22", hover_color="#ca6f1e", state="disabled"
        )
        self.clean_btn.pack(side="left")

        self.summary_label = ctk.CTkLabel(
            top_bar, text="", font=ctk.CTkFont(size=13), text_color="gray"
        )
        self.summary_label.pack(side="left", padx=16)

        # ── Lista de rutas encontradas ───────────────────────────
        self.targets_frame = ctk.CTkScrollableFrame(self, height=180)
        self.targets_frame.pack(fill="x", padx=20, pady=(0, 12))

        ctk.CTkLabel(
            self.targets_frame,
            text="Presiona 'Escanear' para detectar archivos a limpiar.",
            text_color="gray"
        ).pack(anchor="w", padx=8, pady=8)

        # ── Barra de progreso ────────────────────────────────────
        self.progress_bar = ctk.CTkProgressBar(self, mode="indeterminate")
        self.progress_bar.pack(fill="x", padx=20, pady=(0, 8))
        self.progress_bar.stop()
        self.progress_bar.set(0)

        # ── Log ──────────────────────────────────────────────────
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(
            anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(
            self, height=180, font=ctk.CTkFont(family="Consolas", size=12))
        self.log_box.pack(fill="both", expand=True, padx=20, pady=(4, 20))
        self.log_box.configure(state="disabled")

        logger.register_ui_callback(self._append_log)

    def _append_log(self, message: str):
        def _do():
            self.log_box.configure(state="normal")
            self.log_box.insert("end", message + "\n")
            self.log_box.see("end")
            self.log_box.configure(state="disabled")
        self.after(0, _do)

    def _set_busy(self, busy: bool):
        state = "disabled" if busy else "normal"
        self.scan_btn.configure(state=state)
        if busy:
            self.progress_bar.start()
            self.clean_btn.configure(state="disabled")
        else:
            self.progress_bar.stop()
            self.progress_bar.set(0)

    def _on_scan(self):
        self._set_busy(True)
        self._clear_targets()
        Worker(
            task_fn=ctrl.scan_junk,
            on_progress=self._append_log,
            on_done=self._on_scan_done,
        ).start()

    def _on_scan_done(self, success: bool, result):
        def _do():
            self._set_busy(False)
            if not success:
                messagebox.showerror("Error", f"Error al escanear:\n{result}")
                return
            self._scan_results = result
            self._populate_targets(result)
            total = sum(result.values())
            self.summary_label.configure(
                text=f"Encontrado: {ctrl._fmt_size(total)} en {len(result)} ubicaciones",
                text_color="#e67e22"
            )
            if result:
                self.clean_btn.configure(state="normal")
        self.after(0, _do)

    def _clear_targets(self):
        for widget in self.targets_frame.winfo_children():
            widget.destroy()
        self._checkboxes.clear()

    def _populate_targets(self, results: dict):
        self._clear_targets()
        if not results:
            ctk.CTkLabel(
                self.targets_frame,
                text="✅ No se encontraron archivos para limpiar.",
                text_color="#27ae60"
            ).pack(anchor="w", padx=8, pady=8)
            return

        for path, size in sorted(results.items(), key=lambda x: -x[1]):
            var = ctk.BooleanVar(value=True)
            self._checkboxes[path] = var
            row = ctk.CTkFrame(self.targets_frame, fg_color="transparent")
            row.pack(fill="x", padx=4, pady=2)
            ctk.CTkCheckBox(
                row, text=f"{path}",
                variable=var, font=ctk.CTkFont(size=12)
            ).pack(side="left")
            ctk.CTkLabel(
                row, text=ctrl._fmt_size(size),
                font=ctk.CTkFont(size=12), text_color="gray"
            ).pack(side="right", padx=8)

    def _on_clean(self):
        selected = [p for p, var in self._checkboxes.items() if var.get()]
        if not selected:
            messagebox.showwarning("Sin selección", "Selecciona al menos una ubicación para limpiar.")
            return

        total = sum(self._scan_results.get(p, 0) for p in selected)
        confirm = messagebox.askyesno(
            "Confirmar limpieza",
            f"Se eliminarán archivos temporales en {len(selected)} ubicaciones "
            f"({ctrl._fmt_size(total)} aprox.).\n\n¿Continuar?"
        )
        if not confirm:
            return

        self._set_busy(True)
        Worker(
            task_fn=ctrl.clean_junk,
            on_progress=self._append_log,
            on_done=self._on_clean_done,
            targets=selected,
        ).start()

    def _on_clean_done(self, success: bool, result):
        def _do():
            self._set_busy(False)
            if success:
                info = result or {}
                messagebox.showinfo(
                    "Limpieza completada",
                    f"Se eliminaron {info.get('files', 0)} elementos.\n"
                    f"Espacio liberado: {ctrl._fmt_size(info.get('bytes', 0))}"
                )
                self._clear_targets()
                self.summary_label.configure(text="")
            else:
                messagebox.showerror("Error", f"Error durante la limpieza:\n{result}")
        self.after(0, _do)
