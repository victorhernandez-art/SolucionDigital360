"""
modules/updates/view.py
Panel de UI — Windows Update.
"""
import customtkinter as ctk
from tkinter import messagebox
from core.worker import Worker
from core import logger
from modules.updates import controller as ctrl


class UpdatesView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._build_ui()
        self._refresh_status()

    def _build_ui(self):
        ctk.CTkLabel(self, text="Windows Update",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(self,
                     text="Controla las actualizaciones de Windows y limpia su caché.",
                     font=ctk.CTkFont(size=13), text_color="gray"
                     ).pack(anchor="w", padx=20, pady=(0, 16))

        # ── Estado ───────────────────────────────────────────────
        status_frame = ctk.CTkFrame(self)
        status_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(status_frame, text="Estado del servicio",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 6))

        row = ctk.CTkFrame(status_frame, fg_color="transparent")
        row.pack(fill="x", padx=14, pady=(0, 6))
        ctk.CTkLabel(row, text="Windows Update (wuauserv):",
                     font=ctk.CTkFont(size=12)).pack(side="left")
        self._svc_lbl = ctk.CTkLabel(row, text="—",
                                     font=ctk.CTkFont(size=12, weight="bold"))
        self._svc_lbl.pack(side="left", padx=8)

        row2 = ctk.CTkFrame(status_frame, fg_color="transparent")
        row2.pack(fill="x", padx=14, pady=(0, 10))
        ctk.CTkLabel(row2, text="Actualizaciones:",
                     font=ctk.CTkFont(size=12)).pack(side="left")
        self._pause_lbl = ctk.CTkLabel(row2, text="—",
                                       font=ctk.CTkFont(size=12, weight="bold"))
        self._pause_lbl.pack(side="left", padx=8)
        ctk.CTkButton(row2, text="🔄  Verificar estado", width=150, height=28,
                      command=self._refresh_status).pack(side="right")

        # ── Controles ────────────────────────────────────────────
        ctrl_frame = ctk.CTkFrame(self)
        ctrl_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(ctrl_frame, text="Controles",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 8))

        btn_row = ctk.CTkFrame(ctrl_frame, fg_color="transparent")
        btn_row.pack(fill="x", padx=14, pady=(0, 12))

        self._pause_btn = ctk.CTkButton(
            btn_row, text="⏸  Pausar 35 días", width=180, height=40,
            fg_color="#e67e22", hover_color="#ca6f1e",
            font=ctk.CTkFont(size=13),
            command=self._pause)
        self._pause_btn.pack(side="left", padx=(0, 10))

        self._resume_btn = ctk.CTkButton(
            btn_row, text="▶  Reanudar", width=150, height=40,
            fg_color="#27ae60", hover_color="#1e8449",
            font=ctk.CTkFont(size=13),
            command=self._resume)
        self._resume_btn.pack(side="left", padx=(0, 10))

        ctk.CTkButton(
            btn_row, text="🌐  Abrir Windows Update", width=200, height=40,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            font=ctk.CTkFont(size=13),
            command=ctrl.open_windows_update
        ).pack(side="left")

        # ── Caché ────────────────────────────────────────────────
        cache_frame = ctk.CTkFrame(self)
        cache_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(cache_frame, text="Caché de Windows Update",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 4))
        ctk.CTkLabel(
            cache_frame,
            text="Elimina los archivos descargados de actualizaciones anteriores.\n"
                 "Útil cuando las actualizaciones fallan o el disco está lleno.",
            font=ctk.CTkFont(size=12), text_color="gray", justify="left"
        ).pack(anchor="w", padx=14, pady=(0, 8))
        ctk.CTkButton(
            cache_frame, text="🗑  Limpiar caché de Windows Update",
            height=40, fg_color="#c0392b", hover_color="#922b21",
            font=ctk.CTkFont(size=13, weight="bold"),
            command=self._clear_cache
        ).pack(anchor="w", padx=14, pady=(0, 12))

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

    def _refresh_status(self):
        def task(cb):
            svc    = ctrl.get_wu_service_status()
            paused = ctrl.is_updates_paused()
            return {"svc": svc, "paused": paused}
        Worker(task_fn=task, on_progress=lambda m: None,
               on_done=self._on_status).start()

    def _on_status(self, success, result):
        def _do():
            if not success or not result:
                return
            svc = result["svc"]
            self._svc_lbl.configure(
                text=svc,
                text_color="#27ae60" if svc == "Activo" else "#e74c3c"
            )
            paused = result["paused"]
            self._pause_lbl.configure(
                text="⏸ Pausadas" if paused else "▶ Activas",
                text_color="#e67e22" if paused else "#27ae60"
            )
        self.after(0, _do)

    def _pause(self):
        ok = messagebox.askyesno(
            "Pausar actualizaciones",
            "Se pausarán las actualizaciones de Windows por 35 días.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(ctrl.pause_updates, "Actualizaciones pausadas por 35 días.")

    def _resume(self):
        self._run_task(ctrl.resume_updates, "Actualizaciones reanudadas.")

    def _clear_cache(self):
        ok = messagebox.askyesno(
            "Limpiar caché",
            "Se detendrán los servicios de Windows Update temporalmente "
            "para limpiar la caché.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(ctrl.clear_wu_cache, "Caché de Windows Update limpiada.")

    def _run_task(self, fn, success_msg):
        self._set_busy(True)
        Worker(
            task_fn=fn,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                self._refresh_status(),
                messagebox.showinfo("Listo", success_msg) if s
                else messagebox.showerror("Error", str(r))
            )),
        ).start()

    def _set_busy(self, busy):
        self._pause_btn.configure(state="disabled" if busy else "normal")
        self._resume_btn.configure(state="disabled" if busy else "normal")
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
