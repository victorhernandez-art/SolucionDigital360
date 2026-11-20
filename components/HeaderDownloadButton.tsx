'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

export type ButtonColor = 'indigo' | 'orange' | 'blue' | 'teal' | 'rose' | 'amber';

interface HeaderDownloadButtonProps {
  downloadUrl?: string;
  targetModalEvent?: string;
  sistemaSlug: string;
  sistemaNombre: string;
  label?: string;
  sublabel?: string;
  color?: ButtonColor;
}

const COLOR_MAP: Record<ButtonColor, { btn: string; sub: string }> = {
  indigo: {
    btn: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-600/30 hover:shadow-indigo-600/40',
    sub: 'text-indigo-100',
  },
  orange: {
    btn: 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 shadow-orange-600/30 hover:shadow-orange-600/40',
    sub: 'text-orange-100',
  },
  blue: {
    btn: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-600/30 hover:shadow-blue-600/40',
    sub: 'text-blue-100',
  },
  teal: {
    btn: 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-teal-600/30 hover:shadow-teal-600/40',
    sub: 'text-teal-100',
  },
  rose: {
    btn: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-rose-600/30 hover:shadow-rose-600/40',
    sub: 'text-rose-100',
  },
  amber: {
    btn: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 shadow-amber-600/30 hover:shadow-amber-600/40',
    sub: 'text-amber-100',
  },
};

export default function HeaderDownloadButton({
  downloadUrl,
  targetModalEvent,
  sistemaSlug,
  sistemaNombre,
  label = 'Descargar Gratis',
  sublabel = 'Instalador Windows (.exe) · 100% Sin Costo',
  color = 'indigo',
}: HeaderDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleClick = async () => {
    // Si la herramienta maneja modal de desbloqueo (Sub2Unlock)
    if (targetModalEvent) {
      window.dispatchEvent(new CustomEvent(targetModalEvent));
      return;
    }

    // Si es descarga directa (ej. Cotizador)
    if (!downloadUrl || isDownloading) return;
    setIsDownloading(true);

    // 1. Abrir la descarga directa inmediatamente
    window.open(downloadUrl, '_blank');

    // 2. Incrementar contador en localStorage y emitir evento global en tiempo real
    const isCotizador = sistemaSlug.includes('cotiza');
    const storageKey = isCotizador ? 'sd360_downloads_cotizador' : `sd360_downloads_${sistemaSlug}`;
    const slugParam = isCotizador ? 'cotizador' : sistemaSlug;

    let nextCount = 1;
    try {
      const stored = localStorage.getItem(storageKey);
      const parsed = stored ? parseInt(stored, 10) : 0;
      nextCount = parsed + 1;
      localStorage.setItem(storageKey, nextCount.toString());
    } catch {}

    // Notificar en tiempo real a todos los componentes que muestren el marcador
    window.dispatchEvent(
      new CustomEvent('sd360_download_incremented', {
        detail: { sistema: slugParam, count: nextCount },
      })
    );

    // 3. Registrar en backend
    try {
      const res = await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sistema: slugParam }),
      });
      const data = await res.json();
      if (data && typeof data.count === 'number') {
        const finalCount = Math.max(data.count, nextCount);
        try {
          localStorage.setItem(storageKey, finalCount.toString());
        } catch {}
        window.dispatchEvent(
          new CustomEvent('sd360_download_incremented', {
            detail: { sistema: slugParam, count: finalCount },
          })
        );
      }
    } catch (err) {
      console.error('Error al registrar incremento de descarga:', err);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1500);
    }
  };

  const colorStyle = COLOR_MAP[color] || COLOR_MAP.indigo;

  return (
    <div className="flex flex-col items-center sm:items-start lg:items-end gap-1.5 w-full sm:w-auto">
      <button
        type="button"
        onClick={handleClick}
        disabled={isDownloading}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-2xl ${colorStyle.btn} text-white font-extrabold text-sm sm:text-base shadow-xl active:scale-[0.98] transition-all cursor-pointer group`}
      >
        <Download
          className={`w-5 h-5 shrink-0 ${
            isDownloading ? 'animate-bounce' : 'group-hover:translate-y-0.5'
          } transition-transform`}
        />
        <div className="text-left">
          <span className="block leading-tight font-extrabold">
            {isDownloading ? 'Iniciando Descarga...' : label}
          </span>
          <span className={`block text-[11px] font-normal ${colorStyle.sub} opacity-90 leading-tight mt-0.5`}>
            {sublabel}
          </span>
        </div>
      </button>
    </div>
  );
}
