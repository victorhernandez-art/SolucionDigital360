'use client';

import { useState } from 'react';
import { 
  Download, 
  ShieldCheck, 
  MessageSquare, 
  PhoneCall, 
  Users, 
  ExternalLink 
} from 'lucide-react';

interface DownloadCtaCardProps {
  sistemaNombre: string;
  whatsappUrl: string;
  megaLink?: string;
  isTallerSystem?: boolean;
}

export default function DownloadCtaCard({
  sistemaNombre,
  whatsappUrl,
  megaLink = "https://mega.nz",
  isTallerSystem = true
}: DownloadCtaCardProps) {
  // Estado para el contador de descargas (inicia en 1,480)
  const [downloadCount, setDownloadCount] = useState<number>(1480);
  const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);

  const handleMegaDownload = () => {
    if (!hasDownloaded) {
      setDownloadCount((prev) => prev + 1);
      setHasDownloaded(true);
    }
    window.open(megaLink, '_blank');
  };

  return (
    <section id="adquirir" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-8 border border-slate-800">
      {/* Glow de fondo */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-5 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide uppercase bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Licencia Vitalicia + 1 Año de Soporte Técnico</span>
          </div>

          {/* Marcador de Descargas Realizado Visibles en la Tarjeta */}
          {isTallerSystem && (
            <div className="inline-flex items-center gap-2 text-indigo-300 text-xs sm:text-sm font-bold bg-indigo-950/80 px-3.5 py-1 rounded-full border border-indigo-500/40 font-mono shadow-sm">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>+{downloadCount.toLocaleString()} Descargas del Demo</span>
            </div>
          )}
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          ¿Listo para ordenar tu taller técnico con {sistemaNombre}?
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Te entregamos la plataforma configurada con la identidad de tu negocio y te guiamos paso a paso en la instalación inicial.
        </p>
      </div>

      {/* Tres Botones CTA Prominentes */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 max-w-2xl mx-auto">
        {/* CTA 1: Descargar Demo por MEGA (Incrementa Contador) */}
        {isTallerSystem && (
          <button
            onClick={handleMegaDownload}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-xl shadow-indigo-600/30 transition-all text-base group"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            <span>Descargar Demo (MEGA)</span>
          </button>
        )}

        {/* CTA 2: WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-xl shadow-emerald-500/25 transition-all text-base"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Solicitar por WhatsApp</span>
        </a>

        {/* CTA 3: Llamada de Asesoría */}
        <a
          href="tel:+529611209361"
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-base"
        >
          <PhoneCall className="w-5 h-5 text-indigo-400" />
          <span>Llamada de Asesoría</span>
        </a>
      </div>

      {/* Nota de Seguridad */}
      {isTallerSystem && (
        <p className="text-xs text-slate-400 relative z-10 font-medium">
          🔒 Instalador libre de virus. Incluye 5 registros de prueba completos e impresión de tickets.
        </p>
      )}
    </section>
  );
}
