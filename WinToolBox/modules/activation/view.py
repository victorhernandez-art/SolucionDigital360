"""
modules/activation/view.py
Panel de UI — Activación de Windows y Office.
"""
import customtkinter as ctk
from tkinter import messagebox
from core.worker import Worker
from core import logger
from modules.activation import controller as ctrl


class ActivationView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._build_ui()
        self._check_status()

    def _build_ui(self):
        ctk.CTkLabel(self, text="Activación",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(self,
                     text="Activa Windows y Microsoft Office desde un solo lugar.",
                     font=ctk.CTkFont(size=13), text_color="gray"
                     ).pack(anchor="w", padx=20, pady=(0, 14))

        # ── WINDOWS ──────────────────────────────────────────────
        win_frame = ctk.CTkFrame(self)
        win_frame.pack(fill="x", padx=20, pady=(0, 12))

        ctk.CTkLabel(win_frame, text="🪟  Windows",
                     font=ctk.CTkFont(size=15, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(12, 8))

        # Estado
        status_row = ctk.CTkFrame(win_frame, fg_color="transparent")
        status_row.pack(fill="x", padx=14, pady=(0, 8))
        for label, attr in [
            ("Producto:",        "_win_product"),
            ("Estado:",          "_win_status"),
            ("Clave parcial:",   "_win_partial"),
        ]:
            row = ctk.CTkFrame(status_row, fg_color="transparent")
            row.pack(fill="x", pady=1)
            ctk.CTkLabel(row, text=label, width=120, anchor="w",
                         font=ctk.CTkFont(size=12), text_color="gray"
                         ).pack(side="left")
            lbl = ctk.CTkLabel(row, text="—", anchor="w",
                               font=ctk.CTkFont(size=12))
            lbl.pack(side="left", padx=4)
            setattr(self, attr, lbl)

        ctk.CTkFrame(win_frame, height=1, fg_color="gray40"
                     ).pack(fill="x", padx=14, pady=(4, 10))

        # Activar con clave
        ctk.CTkLabel(win_frame, text="Activar con clave de producto:",
                     font=ctk.CTkFont(size=12)).pack(anchor="w", padx=14)
        key_row = ctk.CTkFrame(win_frame, fg_color="transparent")
        key_row.pack(fill="x", padx=14, pady=(4, 12))
        self._win_key_entry = ctk.CTkEntry(
            key_row, placeholder_text="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
            width=300, font=ctk.CTkFont(family="Consolas", size=12))
        self._win_key_entry.pack(side="left", padx=(0, 8))
        ctk.CTkButton(
            key_row, text="Activar Windows", width=150, height=34,
            fg_color="#2980b9", hover_color="#1a5276",
            command=self._activate_windows
        ).pack(side="left", padx=(0, 8))
        ctk.CTkButton(
            key_row, text="⚙️  Configuración", width=140, height=34,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            command=ctrl.open_windows_activation_settings
        ).pack(side="left")

        # ── OFFICE ───────────────────────────────────────────────
        off_frame = ctk.CTkFrame(self)
        off_frame.pack(fill="x", padx=20, pady=(0, 12))

        ctk.CTkLabel(off_frame, text="📦  Microsoft Office",
                     font=ctk.CTkFont(size=15, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(12, 8))

        # Estado Office
        off_status_row = ctk.CTkFrame(off_frame, fg_color="transparent")
        off_status_row.pack(fill="x", padx=14, pady=(0, 8))
        for label, attr in [
            ("Producto:",  "_off_product"),
            ("Estado:",    "_off_status"),
            ("Vence:",     "_off_expires"),
        ]:
            row = ctk.CTkFrame(off_status_row, fg_color="transparent")
            row.pack(fill="x", pady=1)
            ctk.CTkLabel(row, text=label, width=120, anchor="w",
                         font=ctk.CTkFont(size=12), text_color="gray"
                         ).pack(side="left")
            lbl = ctk.CTkLabel(row, text="—", anchor="w",
                               font=ctk.CTkFont(size=12))
            lbl.pack(side="left", padx=4)
            setattr(self, attr, lbl)

        ctk.CTkFrame(off_frame, height=1, fg_color="gray40"
                     ).pack(fill="x", padx=14, pady=(4, 10))

        # Activar con clave propia (2019 / 2016)
        ctk.CTkLabel(off_frame,
                     text="Activar con licencia del técnico (Office 2016 / 2019):",
                     font=ctk.CTkFont(size=12)).pack(anchor="w", padx=14)
        tech_row = ctk.CTkFrame(off_frame, fg_color="transparent")
        tech_row.pack(fill="x", padx=14, pady=(6, 4))

        self._off_version_var = ctk.StringVar(
            value=list(ctrl.OFFICE_KEYS.keys())[0])
        ctk.CTkOptionMenu(
            tech_row,
            variable=self._off_version_var,
            values=list(ctrl.OFFICE_KEYS.keys()),
            width=220
        ).pack(side="left", padx=(0, 8))
        ctk.CTkButton(
            tech_row, text="Activar Office", width=150, height=34,
            fg_color="#27ae60", hover_color="#1e8449",
            command=self._activate_office_tech
        ).pack(side="left")

        # Activar con clave personalizada
        ctk.CTkLabel(off_frame,
                     text="O ingresa una clave personalizada:",
                     font=ctk.CTkFont(size=12)).pack(anchor="w", padx=14, pady=(10, 0))
        custom_row = ctk.CTkFrame(off_frame, fg_color="transparent")
        custom_row.pack(fill="x", padx=14, pady=(4, 12))
        self._off_key_entry = ctk.CTkEntry(
            custom_row, placeholder_text="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
            width=300, font=ctk.CTkFont(family="Consolas", size=12))
        self._off_key_entry.pack(side="left", padx=(0, 8))
        ctk.CTkButton(
            custom_row, text="Activar con clave", width=160, height=34,
            fg_color="#8e44ad", hover_color="#6c3483",
            command=self._activate_office_custom
        ).pack(side="left")

        # Nota 2021/2024
        ctk.CTkLabel(
            off_frame,
            text="ℹ️  Office 2021 y 2024 se activan por separado (no incluidos aquí).",
            font=ctk.CTkFont(size=11), text_color="gray"
        ).pack(anchor="w", padx=14, pady=(0, 10))

        # Barra progreso + log
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop(); self._progress.set(0)
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(self, height=110,
                                      font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="both", expand=True, padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    # ── Carga de estado ──────────────────────────────────────────────────────

    def _check_status(self):
        def task(cb):
            try:
                win = ctrl.get_windows_activation_status()
            except Exception:
                win = {"activated": False, "product_name": "—",
                       "license_status": "Error al consultar", "partial_key": "—"}
            try:
                off = ctrl.get_office_activation_status()
            except Exception:
                off = {"installed": False, "product": "—",
                       "status": "Error al consultar", "expires": "—"}
            return {"win": win, "off": off}
        Worker(task_fn=task, on_progress=lambda m: None,
               on_done=self._on_status_loaded).start()

    def _on_status_loaded(self, success, result):
        def _do():
            if not success or not result:
                return
            w = result["win"]
            activated = w.get("activated", False)
            self._win_product.configure(text=w.get("product_name", "—"))
            self._win_status.configure(
                text=w.get("license_status", "—"),
                text_color="#27ae60" if activated else "#e74c3c"
            )
            self._win_partial.configure(text=w.get("partial_key", "—"))

            o = result["off"]
            self._off_product.configure(text=o.get("product", "—"))
            off_status = o.get("status", "—")
            off_ok = "con licencia" in off_status.lower() or "licensed" in off_status.lower()
            self._off_status.configure(
                text=off_status,
                text_color="#27ae60" if off_ok else
                           ("gray" if not o.get("installed") else "#e74c3c")
            )
            self._off_expires.configure(text=o.get("expires", "—"))
        self.after(0, _do)

    # ── Acciones ─────────────────────────────────────────────────────────────

    def _activate_windows(self):
        key = self._win_key_entry.get().strip()
        if not key:
            messagebox.showwarning("Clave requerida", "Ingresa una clave de producto.")
            return
        ok = messagebox.askyesno(
            "Activar Windows",
            f"Se instalará la clave y se activará Windows.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(lambda cb: ctrl.activate_windows_with_key(key, cb),
                       "Windows activado correctamente.")

    def _activate_office_tech(self):
        version = self._off_version_var.get()
        ok = messagebox.askyesno(
            "Activar Office",
            f"Se activará {version} con la licencia del técnico.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(lambda cb: ctrl.activate_office(version, cb),
                       f"{version} activado correctamente.")

    def _activate_office_custom(self):
        key = self._off_key_entry.get().strip()
        if not key:
            messagebox.showwarning("Clave requerida", "Ingresa una clave de Office.")
            return
        ok = messagebox.askyesno(
            "Activar Office",
            "Se activará Office con la clave ingresada.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(lambda cb: ctrl.activate_office_with_custom_key(key, cb),
                       "Office activado correctamente.")

    def _run_task(self, fn, success_msg):
        self._set_busy(True)
        Worker(
            task_fn=fn,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                self._check_status(),
                messagebox.showinfo("Listo", success_msg) if s
                else messagebox.showerror("Error", "La activación falló. Revisa el log.")
            )),
        ).start()

    def _set_busy(self, busy):
        if busy:
            self._progress.start()
        else:
            self._progress.stop(); self._progress.set(0)

    def _append_log(self, msg):
        def _do():
            self.log_box.configure(state="normal")
            self.log_box.insert("end", msg + "\n")
            self.log_box.see("end")
            self.log_box.configure(state="disabled")
        self.after(0, _do)

    def destroy(self):
        logger.unregister_ui_callback(self._append_log)
        super().destroy()
