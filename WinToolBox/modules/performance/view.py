"""
modules/performance/view.py
Panel de UI para monitoreo de rendimiento en tiempo real.

Diseño fluido:
  - Todo el trabajo pesado (psutil) corre en un Worker (hilo daemon).
  - La UI solo recibe el dict de resultados y actualiza labels ya existentes.
  - La tabla de procesos se construye UNA sola vez; las filas se reusan
    actualizando el texto de cada label en lugar de destruir/recrear widgets.
  - Intervalo de refresco: 3 s (suficiente para monitoreo, sin saturar la UI).
"""
import customtkinter as ctk
from tkinter import messagebox

from core.worker import Worker
from core import logger
from modules.performance import controller as ctrl


REFRESH_MS   = 3000   # intervalo entre refrescos
MAX_PROCS    = 15     # filas fijas en la tabla


class PerformanceView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._after_id   = None
        self._busy       = False          # evita solapamiento de Workers
        self._row_refs   = []             # lista de dicts con refs a labels de cada fila
        self._cpu_info   = ctrl.get_cpu_info()   # estático, se lee una sola vez
        self._build_ui()
        self._schedule_refresh()

    # ── Construcción de UI ───────────────────────────────────────────────────

    def _build_ui(self):
        ctk.CTkLabel(
            self, text="Rendimiento del Sistema",
            font=ctk.CTkFont(size=20, weight="bold")
        ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(
            self, text="Monitoreo en tiempo real de CPU, RAM, disco y procesos.",
            font=ctk.CTkFont(size=13), text_color="gray"
        ).pack(anchor="w", padx=20, pady=(0, 14))

        # ── Tarjetas de métricas ─────────────────────────────────
        metrics_row = ctk.CTkFrame(self, fg_color="transparent")
        metrics_row.pack(fill="x", padx=20, pady=(0, 12))
        metrics_row.columnconfigure((0, 1, 2), weight=1, uniform="col")

        self._cpu_card  = self._make_metric_card(metrics_row, "CPU",   "—", "#2980b9", 0)
        self._ram_card  = self._make_metric_card(metrics_row, "RAM",   "—", "#8e44ad", 1)
        self._disk_card = self._make_metric_card(metrics_row, "Disco", "—", "#16a085", 2)

        # ── Diagnóstico rápido ───────────────────────────────────
        rec_frame = ctk.CTkFrame(self)
        rec_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(
            rec_frame, text="Diagnóstico rápido:",
            font=ctk.CTkFont(size=13, weight="bold")
        ).pack(anchor="w", padx=12, pady=(8, 2))
        self._rec_label = ctk.CTkLabel(
            rec_frame, text="Calculando...",
            font=ctk.CTkFont(size=12), text_color="gray",
            justify="left", wraplength=800
        )
        self._rec_label.pack(anchor="w", padx=12, pady=(0, 8))

        # ── Cabecera tabla procesos ──────────────────────────────
        proc_header = ctk.CTkFrame(self, fg_color="transparent")
        proc_header.pack(fill="x", padx=20, pady=(0, 4))
        ctk.CTkLabel(
            proc_header, text=f"Procesos (top {MAX_PROCS} por CPU + RAM)",
            font=ctk.CTkFont(size=13, weight="bold")
        ).pack(side="left")
        ctk.CTkButton(
            proc_header, text="🔄  Actualizar ahora",
            width=150, height=28, command=self._trigger_refresh,
            font=ctk.CTkFont(size=12)
        ).pack(side="right")

        col_frame = ctk.CTkFrame(self, fg_color=("gray85", "gray20"))
        col_frame.pack(fill="x", padx=20)
        for text, w in [("PID", 70), ("Nombre", 220), ("CPU %", 80),
                        ("RAM (MB)", 90), ("Estado", 100), ("", 110)]:
            ctk.CTkLabel(
                col_frame, text=text, width=w, anchor="w",
                font=ctk.CTkFont(size=12, weight="bold")
            ).pack(side="left", padx=6, pady=4)

        # ── Tabla fija de MAX_PROCS filas ────────────────────────
        self._proc_scroll = ctk.CTkScrollableFrame(self, height=220)
        self._proc_scroll.pack(fill="both", expand=True, padx=20, pady=(0, 12))
        self._build_fixed_rows()

        # ── Log ──────────────────────────────────────────────────
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(
            self, height=70, font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="x", padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    def _make_metric_card(self, parent, title, value, color, col) -> dict:
        card = ctk.CTkFrame(parent, corner_radius=10)
        card.grid(row=0, column=col, padx=6, pady=4, sticky="ew")
        ctk.CTkLabel(card, text=title,
                     font=ctk.CTkFont(size=13, weight="bold"),
                     text_color=color).pack(anchor="w", padx=14, pady=(10, 2))
        val_lbl = ctk.CTkLabel(card, text=value,
                               font=ctk.CTkFont(size=22, weight="bold"))
        val_lbl.pack(anchor="w", padx=14)
        bar = ctk.CTkProgressBar(card, progress_color=color)
        bar.pack(fill="x", padx=14, pady=(4, 4))
        bar.set(0)
        sub_lbl = ctk.CTkLabel(card, text="", font=ctk.CTkFont(size=11),
                               text_color="gray")
        sub_lbl.pack(anchor="w", padx=14, pady=(0, 10))
        return {"value": val_lbl, "bar": bar, "sub": sub_lbl}

    def _build_fixed_rows(self):
        """Crea MAX_PROCS filas vacías una sola vez. Se reusan en cada refresco."""
        self._row_refs.clear()
        for i in range(MAX_PROCS):
            bg = ("gray92", "gray18") if i % 2 == 0 else ("gray86", "gray22")
            row = ctk.CTkFrame(self._proc_scroll, fg_color=bg, corner_radius=4)
            row.pack(fill="x", pady=1)

            lbl_pid    = ctk.CTkLabel(row, text="", width=70,  anchor="w", font=ctk.CTkFont(size=12))
            lbl_name   = ctk.CTkLabel(row, text="", width=220, anchor="w", font=ctk.CTkFont(size=12))
            lbl_cpu    = ctk.CTkLabel(row, text="", width=80,  anchor="w", font=ctk.CTkFont(size=12))
            lbl_mem    = ctk.CTkLabel(row, text="", width=90,  anchor="w", font=ctk.CTkFont(size=12))
            lbl_status = ctk.CTkLabel(row, text="", width=100, anchor="w",
                                      font=ctk.CTkFont(size=12), text_color="gray")
            btn_kill   = ctk.CTkButton(
                row, text="Terminar", width=90, height=24,
                fg_color="#c0392b", hover_color="#922b21",
                font=ctk.CTkFont(size=11),
                command=lambda r=i: self._confirm_kill_row(r)
            )

            for w in (lbl_pid, lbl_name, lbl_cpu, lbl_mem, lbl_status):
                w.pack(side="left", padx=6)
            btn_kill.pack(side="left", padx=6, pady=3)

            self._row_refs.append({
                "frame": row, "pid": lbl_pid, "name": lbl_name,
                "cpu": lbl_cpu, "mem": lbl_mem, "status": lbl_status,
                "btn": btn_kill, "proc_pid": None,
            })

    # ── Ciclo de refresco ────────────────────────────────────────────────────

    def _schedule_refresh(self):
        """Programa el siguiente refresco sin bloquear."""
        self._after_id = self.after(REFRESH_MS, self._trigger_refresh)

    def _trigger_refresh(self):
        """Lanza el Worker solo si no hay uno corriendo ya."""
        if self._busy:
            return
        self._busy = True
        Worker(
            task_fn=self._collect_metrics,
            on_progress=lambda _: None,   # sin log de métricas para no saturar
            on_done=self._on_metrics_ready,
        ).start()

    def _collect_metrics(self, _progress_cb) -> dict:
        """Corre en hilo daemon — todo el trabajo pesado de psutil aquí."""
        cpu   = ctrl.get_cpu_percent(interval=0.5)
        ram   = ctrl.get_ram_info()
        disks = ctrl.get_disk_info()
        procs = ctrl.get_top_processes(MAX_PROCS)
        tips  = ctrl.get_system_recommendations(cpu, ram, disks)
        return {"cpu": cpu, "ram": ram, "disks": disks, "procs": procs, "tips": tips}

    def _on_metrics_ready(self, success: bool, data):
        """Callback en hilo Worker — programa la actualización de UI via after."""
        self._busy = False
        if success and data:
            self.after(0, lambda: self._apply_metrics(data))
        # Programar siguiente ciclo
        self._schedule_refresh()

    def _apply_metrics(self, data: dict):
        """Actualiza la UI — corre en el hilo principal de Tkinter."""
        try:
            self._update_cpu_card(data["cpu"])
            self._update_ram_card(data["ram"])
            self._update_disk_card(data["disks"])
            self._rec_label.configure(text="\n".join(data["tips"]))
            self._update_process_rows(data["procs"])
        except Exception as e:
            logger.error(f"Error al aplicar métricas: {e}")

    # ── Actualización de tarjetas ────────────────────────────────────────────

    def _update_cpu_card(self, cpu: float):
        self._cpu_card["value"].configure(text=f"{cpu:.1f}%")
        self._cpu_card["bar"].set(cpu / 100)
        ci = self._cpu_info
        self._cpu_card["sub"].configure(
            text=f"{ci['physical_cores']}C / {ci['logical_cores']}T  "
                 f"@ {ci['freq_current_mhz']} MHz"
        )

    def _update_ram_card(self, ram: dict):
        used_gb  = ram["used"]  / (1024 ** 3)
        total_gb = ram["total"] / (1024 ** 3)
        self._ram_card["value"].configure(text=f"{ram['percent']:.1f}%")
        self._ram_card["bar"].set(ram["percent"] / 100)
        self._ram_card["sub"].configure(
            text=f"{used_gb:.1f} GB / {total_gb:.1f} GB usados"
        )

    def _update_disk_card(self, disks: list):
        if not disks:
            self._disk_card["value"].configure(text="—")
            return
        worst = max(disks, key=lambda d: d["percent"])
        self._disk_card["value"].configure(text=f"{worst['percent']:.1f}%")
        self._disk_card["bar"].set(worst["percent"] / 100)
        free_gb  = worst["free"]  / (1024 ** 3)
        total_gb = worst["total"] / (1024 ** 3)
        self._disk_card["sub"].configure(
            text=f"{worst['mountpoint']}  libre: {free_gb:.1f} / {total_gb:.1f} GB"
        )

    # ── Actualización de tabla (sin recrear widgets) ─────────────────────────

    def _update_process_rows(self, procs: list):
        for i, ref in enumerate(self._row_refs):
            if i < len(procs):
                p = procs[i]
                ref["proc_pid"] = p["pid"]
                ref["pid"].configure(text=str(p["pid"]))
                ref["name"].configure(text=p["name"])
                ref["cpu"].configure(text=f"{p['cpu_percent']:.1f}")
                ref["mem"].configure(text=f"{p['mem_mb']:.1f}")
                ref["status"].configure(text=p["status"])
                ref["btn"].configure(state="normal")
                ref["frame"].configure(fg_color=("gray92", "gray18") if i % 2 == 0 else ("gray86", "gray22"))
            else:
                # Fila vacía si hay menos procesos que filas
                ref["proc_pid"] = None
                ref["pid"].configure(text="")
                ref["name"].configure(text="")
                ref["cpu"].configure(text="")
                ref["mem"].configure(text="")
                ref["status"].configure(text="")
                ref["btn"].configure(state="disabled")

    # ── Terminar proceso ─────────────────────────────────────────────────────

    def _confirm_kill_row(self, row_index: int):
        ref = self._row_refs[row_index]
        pid  = ref["proc_pid"]
        name = ref["name"].cget("text")
        if pid is None:
            return
        ok = messagebox.askyesno(
            "Terminar proceso",
            f"¿Terminar '{name}' (PID {pid})?\n\nLos cambios no guardados se perderán."
        )
        if not ok:
            return
        Worker(
            task_fn=lambda cb: ctrl.kill_process(pid, cb),
            on_progress=self._append_log,
            on_done=lambda s, _: None,   # el siguiente ciclo actualizará la tabla
        ).start()

    # ── Log ──────────────────────────────────────────────────────────────────

    def _append_log(self, msg: str):
        def _do():
            self.log_box.configure(state="normal")
            self.log_box.insert("end", msg + "\n")
            self.log_box.see("end")
            self.log_box.configure(state="disabled")
        self.after(0, _do)

    # ── Limpieza ─────────────────────────────────────────────────────────────

    def destroy(self):
        if self._after_id:
            self.after_cancel(self._after_id)
        logger.unregister_ui_callback(self._append_log)
        super().destroy()
