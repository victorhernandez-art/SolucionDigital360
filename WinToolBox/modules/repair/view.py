"""
modules/repair/view.py
Panel de UI — Reparación de Windows (SFC, DISM, CHKDSK).
"""
import customtkinter as ctk
from tkinter import messagebox
import psutil
from core.worker import Worker
from core import logger
from modules.repair import controller as ctrl


class RepairView(ctk.CTkFrame):

    def __init__(self, master, **kwargs):
        super().__init__(master, fg_color="transparent", **kwargs)
        self._build_ui()

    def _build_ui(self):
        ctk.CTkLabel(self, text="Reparación de Windows",
                     font=ctk.CTkFont(size=20, weight="bold")
                     ).pack(anchor="w", padx=20, pady=(20, 2))
        ctk.CTkLabel(self,
                     text="Herramientas oficiales de Microsoft para detectar y reparar "
                          "archivos del sistema dañados.",
                     font=ctk.CTkFont(size=13), text_color="gray",
                     wraplength=800, justify="left"
                     ).pack(anchor="w", padx=20, pady=(0, 16))

        # ── Tarjetas de herramientas ─────────────────────────────
        tools_frame = ctk.CTkFrame(self, fg_color="transparent")
        tools_frame.pack(fill="x", padx=20, pady=(0, 12))
        tools_frame.columnconfigure((0, 1, 2), weight=1, uniform="col")

        # SFC
        sfc = ctk.CTkFrame(tools_frame, corner_radius=10)
        sfc.grid(row=0, column=0, padx=6, pady=4, sticky="nsew")
        ctk.CTkLabel(sfc, text="SFC",
                     font=ctk.CTkFont(size=16, weight="bold"),
                     text_color="#2980b9").pack(anchor="w", padx=14, pady=(12, 2))
        ctk.CTkLabel(sfc, text="System File Checker",
                     font=ctk.CTkFont(size=11), text_color="gray").pack(anchor="w", padx=14)
        ctk.CTkLabel(
            sfc,
            text="Verifica y repara archivos del sistema de Windows. "
                 "Tarda 5-15 minutos.",
            font=ctk.CTkFont(size=11), text_color="gray",
            wraplength=200, justify="left"
        ).pack(anchor="w", padx=14, pady=(6, 10))
        ctk.CTkButton(
            sfc, text="▶  Ejecutar SFC", height=36,
            fg_color="#2980b9", hover_color="#1a5276",
            font=ctk.CTkFont(size=13),
            command=self._run_sfc
        ).pack(fill="x", padx=14, pady=(0, 12))

        # DISM ScanHealth
        dism_scan = ctk.CTkFrame(tools_frame, corner_radius=10)
        dism_scan.grid(row=0, column=1, padx=6, pady=4, sticky="nsew")
        ctk.CTkLabel(dism_scan, text="DISM Scan",
                     font=ctk.CTkFont(size=16, weight="bold"),
                     text_color="#8e44ad").pack(anchor="w", padx=14, pady=(12, 2))
        ctk.CTkLabel(dism_scan, text="Escaneo de imagen",
                     font=ctk.CTkFont(size=11), text_color="gray").pack(anchor="w", padx=14)
        ctk.CTkLabel(
            dism_scan,
            text="Detecta daños en la imagen de Windows sin reparar. "
                 "Tarda 5-10 minutos.",
            font=ctk.CTkFont(size=11), text_color="gray",
            wraplength=200, justify="left"
        ).pack(anchor="w", padx=14, pady=(6, 10))
        ctk.CTkButton(
            dism_scan, text="🔍  Escanear", height=36,
            fg_color="#8e44ad", hover_color="#6c3483",
            font=ctk.CTkFont(size=13),
            command=self._run_dism_scan
        ).pack(fill="x", padx=14, pady=(0, 12))

        # DISM RestoreHealth
        dism_fix = ctk.CTkFrame(tools_frame, corner_radius=10)
        dism_fix.grid(row=0, column=2, padx=6, pady=4, sticky="nsew")
        ctk.CTkLabel(dism_fix, text="DISM Repair",
                     font=ctk.CTkFont(size=16, weight="bold"),
                     text_color="#16a085").pack(anchor="w", padx=14, pady=(12, 2))
        ctk.CTkLabel(dism_fix, text="Restaurar imagen",
                     font=ctk.CTkFont(size=11), text_color="gray").pack(anchor="w", padx=14)
        ctk.CTkLabel(
            dism_fix,
            text="Descarga y repara archivos dañados desde Windows Update. "
                 "Requiere internet. 10-20 min.",
            font=ctk.CTkFont(size=11), text_color="gray",
            wraplength=200, justify="left"
        ).pack(anchor="w", padx=14, pady=(6, 10))
        ctk.CTkButton(
            dism_fix, text="🔧  Reparar", height=36,
            fg_color="#16a085", hover_color="#0e6655",
            font=ctk.CTkFont(size=13),
            command=self._run_dism_fix
        ).pack(fill="x", padx=14, pady=(0, 12))

        # ── CHKDSK ───────────────────────────────────────────────
        chkdsk_frame = ctk.CTkFrame(self)
        chkdsk_frame.pack(fill="x", padx=20, pady=(0, 12))
        ctk.CTkLabel(chkdsk_frame, text="CHKDSK — Verificación de disco",
                     font=ctk.CTkFont(size=14, weight="bold")
                     ).pack(anchor="w", padx=14, pady=(10, 4))
        ctk.CTkLabel(
            chkdsk_frame,
            text="Programa una verificación del disco duro al próximo reinicio. "
                 "Detecta y repara errores del sistema de archivos.",
            font=ctk.CTkFont(size=12), text_color="gray", justify="left"
        ).pack(anchor="w", padx=14, pady=(0, 8))

        chk_row = ctk.CTkFrame(chkdsk_frame, fg_color="transparent")
        chk_row.pack(fill="x", padx=14, pady=(0, 12))
        ctk.CTkLabel(chk_row, text="Unidad:", font=ctk.CTkFont(size=12)).pack(side="left")

        # Poblar unidades disponibles
        drives = [p.device.replace("\\", "") for p in psutil.disk_partitions(all=False)
                  if p.fstype and "cdrom" not in p.opts.lower()]
        self._drive_var = ctk.StringVar(value=drives[0] if drives else "C:")
        ctk.CTkOptionMenu(chk_row, variable=self._drive_var,
                          values=drives if drives else ["C:"],
                          width=100).pack(side="left", padx=8)
        ctk.CTkButton(
            chk_row, text="📅  Programar CHKDSK", width=200, height=34,
            fg_color="#e67e22", hover_color="#ca6f1e",
            font=ctk.CTkFont(size=13),
            command=self._run_chkdsk
        ).pack(side="left", padx=8)

        # Barra progreso + log
        self._progress = ctk.CTkProgressBar(self, mode="indeterminate")
        self._progress.pack(fill="x", padx=20, pady=(0, 4))
        self._progress.stop(); self._progress.set(0)
        ctk.CTkLabel(self, text="Salida en tiempo real:",
                     font=ctk.CTkFont(size=12)).pack(anchor="w", padx=20)
        self.log_box = ctk.CTkTextbox(self, height=160,
                                      font=ctk.CTkFont(family="Consolas", size=11))
        self.log_box.pack(fill="both", expand=True, padx=20, pady=(2, 16))
        self.log_box.configure(state="disabled")
        logger.register_ui_callback(self._append_log)

    # ── Acciones ─────────────────────────────────────────────────────────────

    def _run_sfc(self):
        ok = messagebox.askyesno(
            "Ejecutar SFC",
            "Se ejecutará 'sfc /scannow'. El proceso puede tardar varios minutos.\n\n"
            "No cierres la aplicación hasta que finalice.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(ctrl.run_sfc, "SFC finalizado.")

    def _run_dism_scan(self):
        self._run_task(ctrl.run_dism_scanhealth, "Escaneo DISM finalizado.")

    def _run_dism_fix(self):
        ok = messagebox.askyesno(
            "DISM RestoreHealth",
            "Se descargará y reparará la imagen de Windows desde internet.\n"
            "Este proceso puede tardar 10-20 minutos.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._run_task(ctrl.run_dism_health, "DISM RestoreHealth finalizado.")

    def _run_chkdsk(self):
        drive = self._drive_var.get()
        ok = messagebox.askyesno(
            "Programar CHKDSK",
            f"Se programará CHKDSK en la unidad {drive}.\n"
            "La verificación se ejecutará al próximo reinicio del equipo.\n\n¿Continuar?"
        )
        if not ok:
            return
        self._set_busy(True)
        Worker(
            task_fn=lambda cb: ctrl.run_chkdsk(drive, cb),
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo(
                    "CHKDSK programado",
                    f"CHKDSK se ejecutará en {drive} al reiniciar el equipo."
                ) if s else messagebox.showerror("Error", str(r))
            )),
        ).start()

    def _run_task(self, fn, success_msg: str):
        self._set_busy(True)
        Worker(
            task_fn=fn,
            on_progress=self._append_log,
            on_done=lambda s, r: self.after(0, lambda: (
                self._set_busy(False),
                messagebox.showinfo("Completado", success_msg) if s
                else messagebox.showwarning("Advertencia",
                    f"El proceso terminó con advertencias.\nRevisa el log.")
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
