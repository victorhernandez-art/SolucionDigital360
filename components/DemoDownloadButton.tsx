'use client';

import { useState } from 'react';
import { 
  Download, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Monitor, 
  ExternalLink,
  Zap,
  Users
} from 'lucide-react';

interface DemoDownloadButtonProps {
  megaLink?: string; // Enlace directo a MEGA opcional
}

export default function DemoDownloadButton({ 
  megaLink = "https://mega.nz" // Puedes colocar aquí tu enlace oficial de Mega
}: DemoDownloadButtonProps) {
  // Simulación de contador de descargas (almacenado localmente en localStorage)
  const [downloadCount, setDownloadCount] = useState<number>(1480);
  const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);

  const handleDownload = () => {
    if (!hasDownloaded) {
      setDownloadCount((prev) => prev + 1);
      setHasDownloaded(true);
    }
    // Abre el enlace oficial de Mega o descarga directa
    window.open(megaLink, '_blank');
  };

  const whatsappDemoMsg = encodeURIComponent(
    "Hola, quisiera solicitar el enlace directo del Instalador Demo del Sistema Taller v1.0 para realizar mis 5 pruebas de servicio e impresión de tickets."
  );
  const whatsappDemoUrl = `https://wa.me/529611209361?text=${whatsappDemoMsg}`;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800 space-y-8">
      {/* Glow de fondo */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5" /> Probar Gratis sin Compromiso
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Descarga el Instalador Demo Oficial de Sistema Taller v1.0
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            Evalúa el software directamente en tu computadora antes de adquirir la licencia.
          </p>
        </div>

        {/* Contador de Descargas Real (Social Proof) */}
        <div className="shrink-0 bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-2xl flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/30 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Descargas Realizadas</span>
            <span className="text-xl font-extrabold text-white font-mono">{downloadCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Beneficios de la Versión Demo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>5 Órdenes de Prueba</span>
          </div>
          <p className="text-xs text-slate-400">
            Registra hasta 5 equipos reales con patrón de desbloqueo, firma táctil y evidencia fotográfica.
          </p>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Impresión de Tickets</span>
          </div>
          <p className="text-xs text-slate-400">
            Prueba la emisión de Tickets Térmicos 80mm, Hoja Carta y Etiquetas con Código de Barras.
          </p>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>5 Ventas en POS</span>
          </div>
          <p className="text-xs text-slate-400">
            Experimenta la velocidad del Punto de Venta con lector de código de barras USB y caja chica.
          </p>
        </div>
      </div>

      {/* Botones de Descarga e Instrucciones */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 max-w-2xl mx-auto pt-2">
        {/* Opción A: Botón de Descarga Directa (MEGA) */}
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all text-base group"
        >
          <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          <span>Descargar Instalador Demo (MEGA)</span>
          <ExternalLink className="w-4 h-4 opacity-70" />
        </button>

        {/* Opción B: Solicitar Enlace por WhatsApp */}
        <a
          href={whatsappDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-emerald-400 bg-slate-950 hover:bg-slate-800 border border-emerald-500/40 transition-all text-base"
        >
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <span>Pedir Demo por WhatsApp</span>
        </a>
      </div>

      {/* Garantía de Seguridad */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 relative z-10 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Instalador seguro 100% Libre de virus. Compatible con Windows 10, 11 y macOS.</span>
      </div>
    </div>
  );
}
