'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

interface HeaderDownloadButtonProps {
  downloadUrl: string;
  sistemaSlug: string;
  sistemaNombre: string;
  label?: string;
  sublabel?: string;
}

export default function HeaderDownloadButton({
  downloadUrl,
  sistemaSlug,
  sistemaNombre,
  label = 'Descargar Cotizador Gratis',
  sublabel = 'Instalador Windows (.exe) · 100% Sin Costo',
}: HeaderDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    // 1. Abrir la descarga directa inmediatamente
    window.open(downloadUrl, '_blank');

    // 2. Incrementar contador en localStorage y backend
    try {
      const isCotizador = sistemaSlug.includes('cotiza');
      const storageKey = isCotizador ? 'sd360_downloads_cotizador' : `sd360_downloads_${sistemaSlug}`;
      try {
        const stored = localStorage.getItem(storageKey);
        const parsed = stored ? parseInt(stored, 10) : 0;
        localStorage.setItem(storageKey, (parsed + 1).toString());
      } catch {}

      const slugParam = isCotizador ? 'cotizador' : sistemaSlug;
      await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sistema: slugParam }),
      });
    } catch (err) {
      console.error('Error al registrar incremento de descarga:', err);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center sm:items-start lg:items-end gap-1.5 w-full sm:w-auto">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 active:scale-[0.98] transition-all cursor-pointer group"
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
          <span className="block text-[11px] font-normal text-indigo-100 opacity-90 leading-tight mt-0.5">
            {sublabel}
          </span>
        </div>
      </button>
    </div>
  );
}

