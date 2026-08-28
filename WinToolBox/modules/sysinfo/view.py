"""
modules/sysinfo/view.py
Panel de UI — Información del Sistema.
"""
import customtkinter as ctk
from tkinter import filedialog, messagebox

from core.worker import Worker
from core import logger
from modules.sysinfo import controller as ctrl


class SysInfoView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._data = {}
        self._build_ui()
        self._load()

    def _build_ui(self):
        # Título
        ctk.CTkLabel(self, text="Información del Sistema",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(self,
                     text="Hardware, sistema operativo y datos del equipo en un solo lugar.",
                     font=ctk.CTkFont(size=13), text_color="gray"
                     ).pack(anchor="w", padx=20, pady=(0, 12))

        # Barra de acciones
        bar = ctk.CTkFrame(self, fg_color="transparent")
        bar.pack(fill="x", padx=20, pady=(0, 10))
        self._refresh_btn = ctk.CTkButton(
            bar, text="🔄  Actualizar", width=130, height=34,
            command=self._load)
        self._refresh_btn.pack(side="left", padx=(0, 10))
        ctk.CTkButton(
            bar, text="💾  Exportar .txt", width=150, height=34,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            command=self._export
        ).pack(side="left")

        # Barra de progreso
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 8))
        self._progress.stop(); self._progress.set(0)

        # Área scrollable con secciones
        self._scroll = ctk.CTkScrollableFrame(self)
        self._scroll.pack(fill="both", expand=True, padx=20, pady=(0, 16))

    # ── Carga ────────────────────────────────────────────────────────────────

    def _load(self):
        self._set_busy(True)
        for w in self._scroll.winfo_children():
            w.destroy()
        Worker(
            task_fn=ctrl.collect_all,
            on_progress=lambda m: None,
            on_done=self._on_loaded,
        ).start()

    def _on_loaded(self, success: bool, data):
        def _do():
            self._set_busy(False)
            if not success:
                messagebox.showerror("Error", f"No se pudo recopilar la información:\n{data}")
                return
            self._data = data
            self._render(data)
        self.after(0, _do)

    def _render(self, data: dict):
        for section, values in data.items():
            # Cabecera de sección
            sec_frame = ctk.CTkFrame(self._scroll, corner_radius=8)
            sec_frame.pack(fill="x", pady=(0, 10))

            ctk.CTkLabel(sec_frame, text=section,
                         font=ctk.CTkFont(size=14, weight="bold")
                         ).pack(anchor="w", padx=14, pady=(10, 6))

            ctk.CTkFrame(sec_frame, height=1, fg_color="gray40"
                         ).pack(fill="x", padx=14, pady=(0, 6))

            if isinstance(values, list):
                # Discos: una sub-sección por unidad
                for i, disk in enumerate(values, 1):
                    ctk.CTkLabel(sec_frame,
                                 text=f"  Disco {i} — {disk.get('Unidad','?')}",
                                 font=ctk.CTkFont(size=12, weight="bold"),
                                 text_color="gray"
                                 ).pack(anchor="w", padx=20, pady=(4, 2))
                    for k, v in disk.items():
                        if k == "Unidad":
                            continue
                        self._make_row(sec_frame, k, v)
            else:
                for k, v in values.items():
                    self._make_row(sec_frame, k, v)

            # Padding inferior
            ctk.CTkFrame(sec_frame, height=6, fg_color="transparent").pack()

    def _make_row(self, parent, key: str, value: str):
        row = ctk.CTkFrame(parent, fg_color="transparent")
        row.pack(fill="x", padx=14, pady=1)
        ctk.CTkLabel(row, text=key, width=180, anchor="w",
                     font=ctk.CTkFont(size=12), text_color="gray"
                     ).pack(side="left")
        val_lbl = ctk.CTkLabel(row, text=value, anchor="w",
                               font=ctk.CTkFont(size=12))
        val_lbl.pack(side="left", padx=(8, 0))
        # Botón copiar
        ctk.CTkButton(
            row, text="⎘", width=28, height=22,
            fg_color="transparent", hover_color=("gray80", "gray30"),
            font=ctk.CTkFont(size=12),
            command=lambda v=value: self._copy(v)
        ).pack(side="right", padx=4)

    # ── Acciones ─────────────────────────────────────────────────────────────

    def _copy(self, text: str):
        self.clipboard_clear()
        self.clipboard_append(text)

    def _export(self):
        if not self._data:
            messagebox.showwarning("Sin datos", "Primero carga la información del sistema.")
            return
        path = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("Texto", "*.txt"), ("Todos", "*.*")],
            initialfile="reporte_sistema.txt",
            title="Guardar reporte"
        )
        if not path:
            return
        try:
            ctrl.export_txt(self._data, path)
            messagebox.showinfo("Exportado", f"Reporte guardado en:\n{path}")
        except Exception as e:
            messagebox.showerror("Error", str(e))

    def _set_busy(self, busy: bool):
        self._refresh_btn.configure(state="disabled" if busy else "normal")
        if busy:
            self._progress.start()
        else:
            self._progress.stop(); self._progress.set(0)
