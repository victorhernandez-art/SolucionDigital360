"""
modules/network/view.py
Panel de UI para diagnóstico y herramientas de red.
"""
import customtkinter as ctk
from tkinter import messagebox

from core.worker import Worker
from core import logger
from modules.network import controller as ctrl


class NetworkView(ctk.CTkFrame):
    """Panel principal del módulo Diagnóstico de Red."""

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._build_ui()
        self._load_info()

    # ── Construcción de UI ───────────────────────────────────────────────────

    def _build_ui(self):
        # Título
        ctk.CTkLabel(
            self, text="Diagnóstico de Red",
            font=ctk.CTkFont(size=20, weight="bold")
        ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(
            self, text="Información de red, pruebas de conectividad y herramientas de reparación.",
            font=ctk.CTkFont(size=13), text_color="gray"
        ).pack(anchor="w", padx=20, pady=(0, 14))

        # ── Sección info de red ──────────────────────────────────
        info_frame = ctk.CTkFrame(self)
        info_frame.pack(fill="x", padx=20, pady=(0, 12))
        info_frame.columnconfigure((0, 1, 2), weight=1, uniform="col")

        self._local_ip_card  = self._make_info_card(info_frame, "IP Local",    "—", 0)
        self._public_ip_card = self._make_info_card(info_frame, "IP Pública",  "—", 1)
        self._dns_card       = self._make_info_card(info_frame, "DNS",         "—", 2)

        ctk.CTkButton(
            info_frame, text="🔄  Actualizar info",
            height=30, command=self._load_info,
            font=ctk.CTkFont(size=12)
        ).grid(row=1, column=0, columnspan=3, pady=(6, 8), padx=12, sticky="w")

        # ── Sección ping ─────────────────────────────────────────
        ping_header = ctk.CTkFrame(self, fg_color="transparent")
        ping_header.pack(fill="x", padx=20, pady=(0, 4))
        ctk.CTkLabel(
            ping_header, text="Prueba de conectividad",
            font=ctk.CTkFont(size=14, weight="bold")
        ).pack(side="left")
        self._ping_btn = ctk.CTkButton(
            ping_header, text="▶  Ejecutar ping", width=160, height=32,
            command=self._run_ping, font=ctk.CTkFont(size=12)
        )
        self._ping_btn.pack(side="right")

        # Cabecera tabla ping
        ph = ctk.CTkFrame(self, fg_color=("gray85", "gray20"), corner_radius=6)
        ph.pack(fill="x", padx=20, pady=(0, 2))
        for text, w in [("Destino", 160), ("Host", 160), ("Estado", 100), ("Latencia", 100), ("Pérdida", 90)]:
            ctk.CTkLabel(ph, text=text, width=w, anchor="w",
                         font=ctk.CTkFont(size=12, weight="bold")).pack(side="left", padx=8, pady=4)

        self._ping_frame = ctk.CTkScrollableFrame(self, height=160)
        self._ping_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(
            self._ping_frame,
            text="Presiona 'Ejecutar ping' para iniciar el diagnóstico.",
            text_color="gray"
        ).pack(pady=10)

        # ── Herramientas de reparación ───────────────────────────
        tools_label = ctk.CTkLabel(
            self, text="Herramientas de reparación",
            font=ctk.CTkFont(size=14, weight="bold")
        )
        tools_label.pack(anchor="w", padx=20, pady=(0, 8))

        tools_row = ctk.CTkFrame(self, fg_color="transparent")
        tools_row.pack(fill="x", padx=20, pady=(0, 12))

        tools = [
            ("🧹  Limpiar DNS",       "Vacía la caché DNS del sistema.",                    self._flush_dns,    "#2980b9", "#1a5276"),
            ("🔄  Renovar IP",        "Libera y renueva la dirección IP (DHCP).",            self._renew_ip,     "#27ae60", "#1e8449"),
            ("🔧  Reset Winsock",     "Resetea Winsock y TCP/IP.\nRequiere reinicio.",       self._reset_winsock,"#e67e22", "#ca6f1e"),
        ]
        for label, tip, cmd, color, hover in tools:
            col = ctk.CTkFrame(tools_row, fg_color="transparent")
            col.pack(side="left", padx=(0, 12))
            ctk.CTkButton(
                col, text=label, width=180, height=40,
                fg_color=color, hover_color=hover,
                font=ctk.CTkFont(size=13, weight="bold"),
                command=cmd
            ).pack()
            ctk.CTkLabel(
                col, text=tip, font=ctk.CTkFont(size=11),
                text_color="gray", wraplength=180, justify="left"
            ).pack(pady=(4, 0))

        # Barra de progreso
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop()
        self._progress.set(0)

        # Log
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(
            self, height=100, font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="both", expand=True, padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    def _make_info_card(self, parent, title, value, col) -> ctk.CTkLabel:
        card = ctk.CTkFrame(parent, corner_radius=8)
        card.grid(row=0, column=col, padx=6, pady=6, sticky="ew")
        ctk.CTkLabel(card, text=title,
                     font=ctk.CTkFont(size=12, weight="bold"),
                     text_color="gray").pack(anchor="w", padx=12, pady=(8, 2))
        lbl = ctk.CTkLabel(card, text=value,
                           font=ctk.CTkFont(size=14),
                           wraplength=200, justify="left")
        lbl.pack(anchor="w", padx=12, pady=(0, 10))
        return lbl

    # ── Carga de información ─────────────────────────────────────────────────

    def _load_info(self):
        self._set_busy(True)

        def task(cb):
            cb("Obteniendo IPs locales...")
            local = ctrl.get_local_ips()
            cb("Obteniendo IP pública...")
            public = ctrl.get_public_ip()
            cb("Obteniendo DNS...")
            dns = ctrl.get_dns_servers()
            return {"local": local, "public": public, "dns": dns}

        Worker(
            task_fn=task,
            on_progress=self._append_log,
            on_done=self._on_info_loaded,
        ).start()

    def _on_info_loaded(self, success: bool, result):
        def _do():
            self._set_busy(False)
            if not success:
                return
            # IP local
            local = result.get("local", [])
            if local:
                local_text = "\n".join(
                    f"{r['ip']}  ({r.get('adapter','—')})" for r in local
                )
            else:
                local_text = "No detectada"
            self._local_ip_card.configure(text=local_text)

            # IP pública
            self._public_ip_card.configure(text=result.get("public", "—"))

            # DNS
            dns_list = result.get("dns", [])
            self._dns_card.configure(text="\n".join(dns_list) if dns_list else "—")
        self.after(0, _do)

    # ── Ping ─────────────────────────────────────────────────────────────────

    def _run_ping(self):
        self._set_busy(True)
        self._ping_btn.configure(state="disabled")
        for w in self._ping_frame.winfo_children():
            w.destroy()
        ctk.CTkLabel(self._ping_frame, text="Ejecutando pruebas...",
                     text_color="gray").pack(pady=8)

        Worker(
            task_fn=ctrl.run_full_ping_test,
            on_progress=self._append_log,
            on_done=self._on_ping_done,
        ).start()

    def _on_ping_done(self, success: bool, results):
        def _do():
            self._set_busy(False)
            self._ping_btn.configure(state="normal")
            for w in self._ping_frame.winfo_children():
                w.destroy()

            if not success or not results:
                ctk.CTkLabel(self._ping_frame, text="Error al ejecutar ping.",
                             text_color="red").pack(pady=8)
                return

            for i, r in enumerate(results):
                bg = ("gray92", "gray18") if i % 2 == 0 else ("gray86", "gray22")
                row = ctk.CTkFrame(self._ping_frame, fg_color=bg, corner_radius=4)
                row.pack(fill="x", pady=1)

                ctk.CTkLabel(row, text=r.get("label", "—"), width=160, anchor="w",
                             font=ctk.CTkFont(size=12)).pack(side="left", padx=8)
                ctk.CTkLabel(row, text=r.get("host", "—"), width=160, anchor="w",
                             font=ctk.CTkFont(size=11), text_color="gray").pack(side="left", padx=4)

                ok = r.get("reachable", False)
                ctk.CTkLabel(
                    row,
                    text="✅ OK" if ok else "❌ Sin respuesta",
                    width=100, anchor="w",
                    font=ctk.CTkFont(size=12),
                    text_color="#27ae60" if ok else "#e74c3c"
                ).pack(side="left", padx=4)

                avg = r.get("avg_ms")
                ctk.CTkLabel(
                    row,
                    text=f"{avg} ms" if avg is not None else "—",
                    width=100, anchor="w",
                    font=ctk.CTkFont(size=12)
                ).pack(side="left", padx=4)

                loss = r.get("packet_loss")
                ctk.CTkLabel(
                    row,
                    text=f"{loss}%" if loss is not None else "—",
                    width=90, anchor="w",
                    font=ctk.CTkFont(size=12),
                    text_color="#e74c3c" if loss and loss > 0 else ("gray10", "gray90")
                ).pack(side="left", padx=4)

        self.after(0, _do)

    # ── Herramientas ─────────────────────────────────────────────────────────

    def _flush_dns(self):
        self._set_busy(True)
        Worker(
            task_fn=ctrl.flush_dns,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo("DNS", "Caché DNS limpiada correctamente.") if s
                else messagebox.showerror("Error", "No se pudo limpiar el DNS.")
            )),
        ).start()

    def _renew_ip(self):
        self._set_busy(True)
        Worker(
            task_fn=ctrl.release_renew_ip,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo("IP", "Dirección IP renovada correctamente.") if s
                else messagebox.showerror("Error", "No se pudo renovar la IP.")
            )),
        ).start()

    def _reset_winsock(self):
        ok = messagebox.askyesno(
            "Confirmar Reset de Red",
            "Esta operación reseteará Winsock y el stack TCP/IP.\n\n"
            "Se recomienda reiniciar el equipo al finalizar.\n\n"
            "¿Continuar?"
        )
        if not ok:
            return
        self._set_busy(True)
        Worker(
            task_fn=ctrl.reset_winsock,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo(
                    "Reset completado",
                    "Reset de red completado.\nReinicia el equipo para aplicar los cambios."
                ) if s else messagebox.showerror("Error", "El reset no se completó correctamente.")
            )),
        ).start()

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _set_busy(self, busy: bool):
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
