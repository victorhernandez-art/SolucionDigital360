"""
modules/privacy/view.py
Panel de UI — Privacidad y Seguridad.
"""
import customtkinter as ctk
from tkinter import messagebox
from core.worker import Worker
from core import logger
from modules.privacy import controller as ctrl


class PrivacyView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._telemetry_on = False
        self._build_ui()
        self._check_telemetry_status()

    def _build_ui(self):
        ctk.CTkLabel(self, text="Privacidad y Seguridad",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(self,
                     text="Limpia rastros de actividad y controla la telemetría de Windows.",
                     font=ctk.CTkFont(size=13), text_color="gray"
                     ).pack(anchor="w", padx=20, pady=(0, 16))

        # ── Limpieza rápida ──────────────────────────────────────
        quick = ctk.CTkFrame(self)
        quick.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(quick, text="Limpieza de rastros",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 8))

        items = [
            ("📄  Archivos recientes",       "Historial de documentos abiertos recientemente.",    self._clear_recent),
            ("📋  Portapapeles",             "Vacía el contenido actual del portapapeles.",         self._clear_clipboard),
            ("🔍  Historial de búsqueda",    "Búsquedas realizadas en el menú Inicio.",             self._clear_search),
            ("▶️  Historial de Ejecutar",    "Comandos usados en el cuadro Win+R.",                 self._clear_run),
        ]
        for label, tip, cmd in items:
            row = ctk.CTkFrame(quick, fg_color="transparent")
            row.pack(fill="x", padx=14, pady=3)
            ctk.CTkLabel(row, text=label, width=220, anchor="w",
                         font=ctk.CTkFont(size=13)).pack(side="left")
            ctk.CTkLabel(row, text=tip, anchor="w",
                         font=ctk.CTkFont(size=11), text_color="gray"
                         ).pack(side="left", padx=8, fill="x", expand=True)
            ctk.CTkButton(row, text="Limpiar", width=90, height=28,
                          command=cmd).pack(side="right", padx=4)

        # Botón limpiar todo
        ctk.CTkButton(
            quick, text="🧹  Limpiar todo",
            height=38, fg_color="#c0392b", hover_color="#922b21",
            font=ctk.CTkFont(size=13, weight="bold"),
            command=self._clean_all
        ).pack(fill="x", padx=14, pady=(8, 12))

        # ── Telemetría ───────────────────────────────────────────
        tele = ctk.CTkFrame(self)
        tele.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(tele, text="Telemetría de Windows",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 4))
        ctk.CTkLabel(
            tele,
            text="Controla el envío de datos de diagnóstico a Microsoft.\n"
                 "Deshabilitar detiene los servicios DiagTrack y WAP Push.",
            font=ctk.CTkFont(size=12), text_color="gray",
            justify="left"
        ).pack(anchor="w", padx=14, pady=(0, 8))

        tele_row = ctk.CTkFrame(tele, fg_color="transparent")
        tele_row.pack(fill="x", padx=14, pady=(0, 12))
        self._tele_status_lbl = ctk.CTkLabel(
            tele_row, text="Estado: verificando...",
            font=ctk.CTkFont(size=12))
        self._tele_status_lbl.pack(side="left")
        self._tele_btn = ctk.CTkButton(
            tele_row, text="Deshabilitar", width=140, height=32,
            command=self._toggle_telemetry)
        self._tele_btn.pack(side="right")

        # Barra progreso + log
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop(); self._progress.set(0)
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(self, height=120,
                                      font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="both", expand=True, padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    def _check_telemetry_status(self):
        def task(cb):
            return ctrl.get_telemetry_status()
        Worker(task_fn=task, on_progress=lambda m: None,
               on_done=self._on_tele_status).start()

    def _on_tele_status(self, success, result):
        def _do():
            self._telemetry_on = bool(result)
            if self._telemetry_on:
                self._tele_status_lbl.configure(
                    text="Estado: ✅ Activa", text_color="#27ae60")
                self._tele_btn.configure(
                    text="Deshabilitar",
                    fg_color="#c0392b", hover_color="#922b21")
            else:
                self._tele_status_lbl.configure(
                    text="Estado: ⛔ Deshabilitada", text_color="#e74c3c")
                self._tele_btn.configure(
                    text="Habilitar",
                    fg_color="#27ae60", hover_color="#1e8449")
        self.after(0, _do)

    def _toggle_telemetry(self):
        if self._telemetry_on:
            ok = messagebox.askyesno(
                "Deshabilitar telemetría",
                "Se detendrán los servicios de diagnóstico de Microsoft.\n\n¿Continuar?"
            )
            if not ok:
                return
            self._run_task(ctrl.disable_telemetry, "Telemetría deshabilitada.")
        else:
            self._run_task(ctrl.enable_telemetry, "Telemetría habilitada.")

    def _clear_recent(self):
        Worker(task_fn=ctrl.clear_recent_files,
               on_progress=self._append_log,
               on_done=lambda s, r: self.after(0, lambda: (
                   messagebox.showinfo("Listo", f"{r} archivos recientes eliminados.") if s
                   else None))).start()

    def _clear_clipboard(self):
        Worker(task_fn=ctrl.clear_clipboard,
               on_progress=self._append_log,
               on_done=lambda s, r: self.after(0, lambda:
                   messagebox.showinfo("Listo", "Portapapeles limpiado.") if s else None
               )).start()

    def _clear_search(self):
        Worker(task_fn=ctrl.clear_search_history,
               on_progress=self._append_log,
               on_done=lambda s, r: self.after(0, lambda:
                   messagebox.showinfo("Listo", "Historial de búsqueda eliminado.") if s else None
               )).start()

    def _clear_run(self):
        Worker(task_fn=ctrl.clear_run_history,
               on_progress=self._append_log,
               on_done=lambda s, r: self.after(0, lambda:
                   messagebox.showinfo("Listo", "Historial de Ejecutar eliminado.") if s else None
               )).start()

    def _clean_all(self):
        ok = messagebox.askyesno(
            "Limpiar todo",
            "Se eliminarán archivos recientes, portapapeles, "
            "historial de búsqueda e historial de Ejecutar.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(ctrl.clean_all_privacy, "Limpieza de privacidad completada.")

    def _run_task(self, fn, success_msg: str):
        self._set_busy(True)
        Worker(
            task_fn=fn,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                self._check_telemetry_status(),
                messagebox.showinfo("Listo", success_msg) if s
                else messagebox.showerror("Error", str(r))
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
