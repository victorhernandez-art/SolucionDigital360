'use client';

import { useState, useEffect } from 'react';
import {
  Download,
  MessageSquare,
  ShieldCheck,
  Laptop,
  Check,
  AlertTriangle,
  Users,
} from 'lucide-react';

interface NitroDownloadBoxProps {
  downloadUrl: string;
}

export default function NitroDownloadBox({ downloadUrl }: NitroDownloadBoxProps) {
  const baseCount = 142;
  const storageKey = 'sd360_downloads_nitro';

  const [downloadCount, setDownloadCount] = useState<number>(baseCount);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    let localSavedVal = baseCount;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= baseCount) {
          localSavedVal = parsed;
          setDownloadCount(parsed);
        }
      }
    } catch {
      // Ignorar en caso de restricciones de localStorage
    }

    fetch('/api/downloads?sistema=nitro-pdf')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          const highest = Math.max(data.count, localSavedVal);
          setDownloadCount(highest);
          try {
            localStorage.setItem(storageKey, highest.toString());
          } catch {}
        }
      })
      .catch((err) => {
        console.error('Error al sincronizar descargas de Nitro PDF:', err);
      });
  }, [baseCount, storageKey]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    // 1. Incremento visual inmediato
    const nextCount = downloadCount + 1;
    setDownloadCount(nextCount);
    try {
      localStorage.setItem(storageKey, nextCount.toString());
    } catch {}

    // 2. Disparar descarga en nueva pestaña
    window.open(downloadUrl, '_blank');

    // 3. Registrar en backend
    try {
      const res = await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sistema: 'nitro-pdf' }),
      });
      const data = await res.json();
      if (data && typeof data.count === 'number') {
        const finalCount = Math.max(data.count, nextCount);
        setDownloadCount(finalCount);
        try {
          localStorage.setItem(storageKey, finalCount.toString());
        } catch {}
      }
    } catch (err) {
      console.error('Error al registrar descarga en servidor:', err);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tarjeta Principal de Descarga */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Descarga Directa Gratuita · Verificada</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Obtén el Instalador de Nitro PDF Pro Enterprise
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Versión 14.41 x64 Enterprise completa. Descarga directa desde GitHub Releases sin acortadores ni publicidad engañosa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Marcador Dinámico de Descargas */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-md border border-slate-800 shrink-0 w-full sm:w-auto justify-center">
              <div className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm sm:text-base text-emerald-400 font-mono tracking-tight block leading-none">
                  +{downloadCount}
                </span>
                <span className="text-[10px] text-slate-300 font-medium tracking-wider uppercase block mt-0.5">
                  Descargas
                </span>
              </div>
            </div>

            {/* Botón de Descarga Interactiva */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-sm transition-all shadow-lg shadow-orange-600/25 w-full sm:w-auto cursor-pointer"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Iniciando descarga...' : 'Descargar Instalador (.RAR / x64)'}</span>
            </button>

            {/* Botón de Soporte WhatsApp */}
            <a
              href="https://wa.me/529611209361?text=Hola,%20tengo%20una%20duda%20sobre%20la%20instalaci%C3%B3n%20de%20Nitro%20PDF%20Pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Pedir Asistencia</span>
            </a>
          </div>
        </div>

        {/* Garantías y Requisitos */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Libre de virus y malware</span>
          </div>
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Compatible con Windows 10 y 11</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Instalación guiada paso a paso</span>
          </div>
        </div>
      </section>

      {/* Tarjeta de Descargo de Responsabilidad (Fiel al diseño solicitado) */}
      <section
        aria-label="Descargo de responsabilidad"
        className="relative bg-amber-50/50 border border-amber-300/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-wide uppercase">
              Descargo de Responsabilidad
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              El software y herramientas listados en <strong>Solución Digital 360</strong> se publican con fines
              estrictamente informativos, educativos y de prueba. Recomendamos respetar las licencias de sus
              desarrolladores y adquirir una licencia oficial cuando corresponda.{' '}
              <strong>Solución Digital 360</strong> no es el desarrollador ni el propietario de los programas enlazados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
