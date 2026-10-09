'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Download,
  MessageSquare,
  ShieldCheck,
  Laptop,
  Check,
  AlertTriangle,
  CheckCircle2,
  Youtube,
  ArrowRight,
  X,
  Sparkles,
  Music2,
  Radio,
} from 'lucide-react';

interface YTDownloaderDownloadBoxProps {
  downloadUrl: string;
}

export default function YTDownloaderDownloadBox({ downloadUrl }: YTDownloaderDownloadBoxProps) {
  const baseCount = 245;
  const storageKey = 'sd360_downloads_yt_downloader';

  const [downloadCount, setDownloadCount] = useState<number>(baseCount);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Cerrar modal al presionar tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Sincronizar contador de descargas
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
    } catch {}

    fetch('/api/downloads?sistema=yt_downloader')
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
      .catch((err) => console.error('Error al sincronizar descargas de YT Downloader:', err));
  }, [baseCount, storageKey]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    // 1. Abrir la descarga en nueva pestaña y activar modal simultáneamente
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    setIsModalOpen(true);

    // 2. Incremento visual inmediato del contador
    const nextCount = downloadCount + 1;
    setDownloadCount(nextCount);
    try {
      localStorage.setItem(storageKey, nextCount.toString());
    } catch {}

    // 3. Registrar en backend
    try {
      const res = await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sistema: 'yt_downloader' }),
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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span>Instalador Gratuito Verificado · v2.0 Oficial 64 bits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Obtén YT Downloader para Windows
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Descargador completo para música y videos de YouTube. Instalador oficial seguro alojado en Google Drive,{' '}
              <strong className="text-slate-800">100% sin publicidad molesta, sin banners ni programas adicionales no deseados</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Marcador Dinámico de Descargas */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-md border border-slate-800 shrink-0 w-full sm:w-auto justify-center">
              <div className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm sm:text-base text-rose-400 font-mono tracking-tight block leading-none">
                  +{downloadCount}
                </span>
                <span className="text-[10px] text-slate-300 font-medium tracking-wider uppercase block mt-0.5">
                  Descargas
                </span>
              </div>
            </div>

            {/* Botón Principal de Descarga */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-sm transition-all shadow-lg shadow-rose-600/25 w-full sm:w-auto cursor-pointer"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Iniciando descarga...' : 'Descargar YT Downloader (.EXE)'}</span>
            </button>

            {/* Botón de Asistencia WhatsApp */}
            <a
              href="https://wa.me/529611209361?text=Hola,%20tengo%20una%20duda%20sobre%20el%20instalador%20de%20YT%20Downloader"
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
            <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Paquete verificado y libre de publicidad invasiva</span>
          </div>
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Compatible con Windows 10 y 11 (64 bits)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Descarga múltiple de hasta 3 enlaces simultáneos</span>
          </div>
        </div>

        {/* Descargo de Responsabilidad */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
              Uso Personal y Descargo de Responsabilidad
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Esta herramienta ha sido desarrollada por <strong>Solución Digital 360</strong> con propósitos formativos, didácticos y de uso personal privado.
              Respeta los derechos de autor y las políticas de los creadores de contenido al descargar material multimedia.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL DE AGRADECIMIENTO, SUSCRIPCIÓN Y VENTA CRUZADA (CROSS-SELLING)      */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-yt-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Contenedor del Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden space-y-6 animate-in zoom-in-95 duration-200"
          >
            {/* Botón de Cierre */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Encabezado con Icono de Éxito */}
            <div className="text-center space-y-3 pt-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                id="modal-yt-titulo"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
              >
                ¡Tu descarga ha comenzado!
              </h3>
            </div>

            {/* Mensaje de Comunidad */}
            <p className="text-center text-slate-600 text-sm sm:text-base leading-relaxed px-2">
              Suscríbete a nuestro canal oficial para enterarte antes que nadie de nuevas actualizaciones, herramientas gratuitas y tutoriales exclusivos.
            </p>

            {/* Botón Grande de YouTube */}
            <div className="pt-2">
              <a
                href="https://www.youtube.com/@SoluciónDigital360?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all"
              >
                <Youtube className="w-6 h-6 fill-current" />
                <span>Suscribirme al Canal Oficial</span>
              </a>
              <p className="text-center text-xs text-slate-400 mt-2 font-medium">
                Únete a la comunidad oficial en YouTube @SoluciónDigital360
              </p>
            </div>

            {/* ===================================================================== */}
            {/* SECCIÓN DE VENTA CRUZADA (CROSS-SELLING)                              */}
            {/* ===================================================================== */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ¿Tienes un negocio o emprendimiento?
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  <Sparkles className="w-3 h-3" />
                  SaaS Premium
                </span>
              </div>

              {/* Tarjeta de Venta Cruzada */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Sistemas de Gestión Comercial
                  </h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    Descubre nuestras plataformas para Talleres Técnicos y Gimnasios con prueba gratis.
                  </p>
                </div>
                <Link
                  href="/#sistemas"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
                >
                  <span>Ver Sistemas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Botón Secundario para Continuar Navegando */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Volver a la página
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
