"""
modules/printer/view.py
Panel de UI — Gestión de Impresoras.
"""
import customtkinter as ctk
from tkinter import messagebox
from core.worker import Worker
from core import logger
from modules.printer import controller as ctrl


class PrinterView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._printers = []
        self._build_ui()
        self._load()

    def _build_ui(self):
        ctk.CTkLabel(self, text="Gestión de Impresoras",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(self,
                     text="Lista de impresoras instaladas, limpieza de cola y control del spooler.",
                     font=ctk.CTkFont(size=13), text_color="gray"
                     ).pack(anchor="w", padx=20, pady=(0, 14))

        # Barra de acciones
        bar = ctk.CTkFrame(self, fg_color="transparent")
        bar.pack(fill="x", padx=20, pady=(0, 10))
        self._refresh_btn = ctk.CTkButton(
            bar, text="🔄  Actualizar", width=130, height=36,
            command=self._load)
        self._refresh_btn.pack(side="left", padx=(0, 10))
        ctk.CTkButton(
            bar, text="⚙️  Panel de impresoras", width=180, height=36,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            command=ctrl.open_printers_panel
        ).pack(side="left", padx=(0, 10))
        self._count_lbl = ctk.CTkLabel(bar, text="", font=ctk.CTkFont(size=12),
                                       text_color="gray")
        self._count_lbl.pack(side="left", padx=10)

        # Cabecera tabla
        hdr = ctk.CTkFrame(self, fg_color=("gray85", "gray20"), corner_radius=6)
        hdr.pack(fill="x", padx=20, pady=(0, 2))
        for text, w in [("Nombre", 260), ("Puerto", 130), ("Estado", 120), ("Predeterminada", 130), ("", 120)]:
            ctk.CTkLabel(hdr, text=text, width=w, anchor="w",
                         font=ctk.CTkFont(size=12, weight="bold")
                         ).pack(side="left", padx=8, pady=5)

        self._list = ctk.CTkScrollableFrame(self, height=260)
        self._list.pack(fill="both", expand=True, padx=20, pady=(0, 12))

        # Herramientas spooler
        tools = ctk.CTkFrame(self)
        tools.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(tools, text="Herramientas del Spooler:",
                     font=ctk.CTkFont(size=13, weight="bold")
                     ).pack(anchor="w", padx=12, pady=(10, 8))
        btn_row = ctk.CTkFrame(tools, fg_color="transparent")
        btn_row.pack(fill="x", padx=12, pady=(0, 10))

        ctk.CTkButton(
            btn_row, text="🗑  Limpiar cola de impresión",
            width=220, height=38,
            fg_color="#c0392b", hover_color="#922b21",
            font=ctk.CTkFont(size=13),
            command=self._clear_queue
        ).pack(side="left", padx=(0, 12))
        ctk.CTkButton(
            btn_row, text="🔄  Reiniciar Spooler",
            width=180, height=38,
            fg_color="#e67e22", hover_color="#ca6f1e",
            font=ctk.CTkFont(size=13),
            command=self._restart_spooler
        ).pack(side="left")

        # Barra progreso + log
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop(); self._progress.set(0)
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(self, height=80,
                                      font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="x", padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    def _load(self):
        self._set_busy(True)
        for w in self._list.winfo_children():
            w.destroy()
        Worker(
            task_fn=lambda cb: ctrl.get_printers(),
            on_progress=lambda m: None,
            on_done=self._on_loaded,
        ).start()

    def _on_loaded(self, success, result):
        def _do():
            self._set_busy(False)
            if not success:
                messagebox.showerror("Error", str(result))
                return
            self._printers = result or []
            self._count_lbl.configure(
                text=f"{len(self._printers)} impresora(s) encontrada(s)")
            if not self._printers:
                ctk.CTkLabel(self._list,
                             text="No se encontraron impresoras instaladas.",
                             text_color="gray").pack(pady=20)
                return
            for i, p in enumerate(self._printers):
                bg = ("gray92", "gray18") if i % 2 == 0 else ("gray86", "gray22")
                row = ctk.CTkFrame(self._list, fg_color=bg, corner_radius=4)
                row.pack(fill="x", pady=1)
                ctk.CTkLabel(row, text=p["name"],   width=260, anchor="w",
                             font=ctk.CTkFont(size=12)).pack(side="left", padx=8)
                ctk.CTkLabel(row, text=p["port"],   width=130, anchor="w",
                             font=ctk.CTkFont(size=11), text_color="gray").pack(side="left", padx=4)
                ctk.CTkLabel(row, text=p["status"], width=120, anchor="w",
                             font=ctk.CTkFont(size=12)).pack(side="left", padx=4)
                default_txt = "⭐ Sí" if p["is_default"] else "—"
                ctk.CTkLabel(row, text=default_txt, width=130, anchor="w",
                             font=ctk.CTkFont(size=12),
                             text_color="#f1c40f" if p["is_default"] else "gray"
                             ).pack(side="left", padx=4)
        self.after(0, _do)

    def _clear_queue(self):
        ok = messagebox.askyesno(
            "Limpiar cola",
            "Se detendrá el spooler, se eliminarán todos los trabajos en cola "
            "y se reiniciará el servicio.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._set_busy(True)
        Worker(
            task_fn=ctrl.clear_print_queue,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo("Listo", "Cola de impresión limpiada.") if s
                else messagebox.showerror("Error", str(r))
            )),
        ).start()

    def _restart_spooler(self):
        self._set_busy(True)
        Worker(
            task_fn=ctrl.restart_spooler,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo("Listo", "Spooler reiniciado correctamente.") if s
                else messagebox.showerror("Error", str(r))
            )),
        ).start()

    def _set_busy(self, busy):
        self._refresh_btn.configure(state="disabled" if busy else "normal")
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
