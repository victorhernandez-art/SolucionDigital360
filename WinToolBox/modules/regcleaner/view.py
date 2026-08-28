"""
modules/regcleaner/view.py
Panel de UI — Limpieza del Registro de Windows.
"""
import customtkinter as ctk
from tkinter import messagebox
from core.worker import Worker
from core import logger
from modules.regcleaner import controller as ctrl


class RegCleanerView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._entries = []
        self._checkboxes = {}
        self._build_ui()

    def _build_ui(self):
        ctk.CTkLabel(self, text="Limpieza del Registro",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(
            self,
            text="Detecta y elimina entradas huérfanas del registro de Windows "
                 "de programas desinstalados.",
            font=ctk.CTkFont(size=13), text_color="gray",
            wraplength=800, justify="left"
        ).pack(anchor="w", padx=20, pady=(0, 6))

        ctk.CTkLabel(
            self,
            text="⚠️  Solo se eliminan entradas de programas ya no instalados. "
                 "No se tocan claves del sistema.",
            font=ctk.CTkFont(size=11), text_color="#e67e22"
        ).pack(anchor="w", padx=20, pady=(0, 14))

        # Barra de acciones
        bar = ctk.CTkFrame(self, fg_color="transparent")
        bar.pack(fill="x", padx=20, pady=(0, 8))
        self._scan_btn = ctk.CTkButton(
            bar, text="🔍  Escanear registro", width=180, height=36,
            command=self._scan)
        self._scan_btn.pack(side="left", padx=(0, 10))
        self._clean_btn = ctk.CTkButton(
            bar, text="🗑  Limpiar seleccionados", width=190, height=36,
            fg_color="#c0392b", hover_color="#922b21",
            state="disabled", command=self._clean)
        self._clean_btn.pack(side="left", padx=(0, 10))

        # Seleccionar/deseleccionar todo
        self._sel_all_btn = ctk.CTkButton(
            bar, text="☑  Seleccionar todo", width=160, height=36,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            state="disabled", command=self._select_all)
        self._sel_all_btn.pack(side="left", padx=(0, 6))
        self._desel_btn = ctk.CTkButton(
            bar, text="☐  Deseleccionar", width=140, height=36,
            fg_color="transparent", border_width=1,
            text_color=("gray10", "gray90"),
            state="disabled", command=self._deselect_all)
        self._desel_btn.pack(side="left")

        self._count_lbl = ctk.CTkLabel(bar, text="",
                                       font=ctk.CTkFont(size=12), text_color="gray")
        self._count_lbl.pack(side="right", padx=10)

        # Cabecera tabla
        hdr = ctk.CTkFrame(self, fg_color=("gray85", "gray20"), corner_radius=6)
        hdr.pack(fill="x", padx=20, pady=(0, 2))
        for text, w in [("", 30), ("Nombre", 260), ("Origen", 100), ("Motivo", 340)]:
            ctk.CTkLabel(hdr, text=text, width=w, anchor="w",
                         font=ctk.CTkFont(size=12, weight="bold")
                         ).pack(side="left", padx=6, pady=5)

        # Lista scrollable
        self._list = ctk.CTkScrollableFrame(self, height=320)
        self._list.pack(fill="both", expand=True, padx=20, pady=(0, 8))
        ctk.CTkLabel(self._list,
                     text="Presiona 'Escanear registro' para buscar entradas huérfanas.",
                     text_color="gray").pack(pady=20)

        # Barra progreso + log
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop(); self._progress.set(0)
        ctk.CTkLabel(self, text="Log:", font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(self, height=70,
                                      font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="x", padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    # ── Escaneo ──────────────────────────────────────────────────────────────

    def _scan(self):
        self._set_busy(True)
        self._clean_btn.configure(state="disabled")
        self._sel_all_btn.configure(state="disabled")
        self._desel_btn.configure(state="disabled")
        for w in self._list.winfo_children():
            w.destroy()
        self._checkboxes.clear()

        Worker(
            task_fn=ctrl.scan_all,
            on_progress=self._append_log,
            on_done=self._on_scan_done,
        ).start()

    def _on_scan_done(self, success, result):
        def _do():
            self._set_busy(False)
            if not success:
                messagebox.showerror("Error", str(result))
                return
            self._entries = result or []
            self._render_entries(self._entries)
            self._count_lbl.configure(
                text=f"{len(self._entries)} entradas encontradas")
            if self._entries:
                self._clean_btn.configure(state="normal")
                self._sel_all_btn.configure(state="normal")
                self._desel_btn.configure(state="normal")
        self.after(0, _do)

    def _render_entries(self, entries):
        for w in self._list.winfo_children():
            w.destroy()
        self._checkboxes.clear()

        if not entries:
            ctk.CTkLabel(self._list,
                         text="✅ No se encontraron entradas huérfanas.",
                         text_color="#27ae60").pack(pady=20)
            return

        for i, entry in enumerate(entries):
            bg = ("gray92", "gray18") if i % 2 == 0 else ("gray86", "gray22")
            row = ctk.CTkFrame(self._list, fg_color=bg, corner_radius=4)
            row.pack(fill="x", pady=1)

            var = ctk.BooleanVar(value=True)
            self._checkboxes[i] = var
            ctk.CTkCheckBox(row, text="", variable=var, width=30
                            ).pack(side="left", padx=4)
            ctk.CTkLabel(row, text=entry["name"][:55], width=260, anchor="w",
                         font=ctk.CTkFont(size=11)).pack(side="left", padx=4)
            ctk.CTkLabel(row, text=entry.get("hive_str", "—"), width=100, anchor="w",
                         font=ctk.CTkFont(size=11), text_color="gray"
                         ).pack(side="left", padx=4)
            ctk.CTkLabel(row, text=entry.get("reason", "—")[:60], width=340, anchor="w",
                         font=ctk.CTkFont(size=11), text_color="gray"
                         ).pack(side="left", padx=4)

    # ── Limpieza ─────────────────────────────────────────────────────────────

    def _clean(self):
        selected = [self._entries[i] for i, var in self._checkboxes.items() if var.get()]
        if not selected:
            messagebox.showwarning("Sin selección", "Selecciona al menos una entrada.")
            return
        ok = messagebox.askyesno(
            "Confirmar limpieza",
            f"Se eliminarán {len(selected)} entradas del registro.\n\n"
            "Esta acción no se puede deshacer fácilmente.\n\n¿Continuar?"
        )
        if not ok:
            return

        self._set_busy(True)
        Worker(
            task_fn=lambda cb: ctrl.clean_entries(selected, cb),
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo(
                    "Listo",
                    f"Limpieza completada.\n"
                    f"Entradas eliminadas: {r.get('cleaned', 0)}\n"
                    f"Errores: {r.get('errors', 0)}"
                ) if s else messagebox.showerror("Error", str(r)),
                self._scan()
            )),
        ).start()

    # ── Selección ────────────────────────────────────────────────────────────

    def _select_all(self):
        for var in self._checkboxes.values():
            var.set(True)

    def _deselect_all(self):
        for var in self._checkboxes.values():
            var.set(False)

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _set_busy(self, busy):
        self._scan_btn.configure(state="disabled" if busy else "normal")
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
