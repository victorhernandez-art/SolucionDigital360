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
} from 'lucide-react';

interface OfficeDownloadBoxProps {
  downloadUrl: string;
}

export default function OfficeDownloadBox({ downloadUrl }: OfficeDownloadBoxProps) {
  const baseCount = 215;
  const storageKey = 'sd360_downloads_office';

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

    fetch('/api/downloads?sistema=office-2019')
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
      .catch((err) => console.error('Error al sincronizar descargas de Office 2019:', err));
  }, [baseCount, storageKey]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    // 1. Abrir la descarga en nueva pestaña y activar modal simultáneamente
    window.open(downloadUrl, '_blank');
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
        body: JSON.stringify({ sistema: 'office-2019' }),
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
              Obtén el Instalador de Office 2019 Profesional
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Paquete completo de instalación de Microsoft Office 2019. Descarga directa desde GitHub Releases sin publicidad ni acortadores.
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

            {/* Botón Principal de Descarga */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/25 w-full sm:w-auto cursor-pointer"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Iniciando descarga...' : 'Descargar Gratis (.ZIP)'}</span>
            </button>

            {/* Botón de Asistencia WhatsApp */}
            <a
              href="https://wa.me/529611209361?text=Hola,%20tengo%20una%20duda%20sobre%20la%20instalaci%C3%B3n%20de%20Office%202019"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Pedir Asistencia</span>
            </a>
          </div>
        </div>

        {/* Banner Promocional de Comunidad: Meta Office 2021 */}
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 border border-red-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-red-600 flex items-center justify-center sm:justify-start gap-1">
                <span>🎁</span> ¡Meta Especial de la Comunidad!
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                Suscríbete y comparte para que estés enterado de los programas que estaré publicando. Si este canal sube a más suscriptores estaré subiendo{' '}
                <strong className="text-red-600 font-extrabold">Office 2021 totalmente gratis Licencia original</strong>.
              </p>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@Soluci%C3%B3nDigital360"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm shadow-red-600/20"
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>Suscribirme</span>
          </a>
        </div>

        {/* Garantías y Requisitos */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Paquete verificado y seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Compatible con Windows 10 y 11</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Orientado a licencias originales</span>
          </div>
        </div>
      </section>

      {/* Tarjeta de Descargo de Responsabilidad Oficial */}
      <section
        aria-label="Descargo de responsabilidad"
        className="relative bg-amber-50/50 border border-amber-300/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-wide uppercase">
              Descargo de Responsabilidad
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              El software y herramientas listados en <strong>Solución Digital 360</strong> se publican con fines
              estrictamente informativos, educativos y de prueba. Recomendamos respetar las licencias de sus
              desarrolladores y adquirir una licencia oficial cuando corresponda.{' '}
              <strong>Solución Digital 360</strong> no es el desarrollador ni el propietario de los programas enlazados.
            </p>
            <div className="pt-2 border-t border-amber-200/80 text-amber-900 font-semibold text-xs sm:text-sm flex items-start gap-2">
              <span className="text-base shrink-0">📌</span>
              <span>
                <strong>Importante:</strong> este contenido está orientado al uso de licencias legítimas. No se
                proporcionan métodos para evadir o vulnerar la activación de Microsoft Office.
              </span>
            </div>
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
          aria-labelledby="modal-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Contenedor del Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden space-y-5 animate-in zoom-in-95 duration-200"
          >
            {/* Botón de Cierre (X) */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Encabezado con Icono de Éxito */}
            <div className="text-center space-y-2 pt-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                id="modal-titulo"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
              >
                ¡Tu descarga ha comenzado!
              </h3>
            </div>

            {/* Mensaje Empático (Soft Ask) */}
            <p className="text-center text-slate-600 text-xs sm:text-sm leading-relaxed px-2">
              Mantener estas herramientas gratuitas toma mucho esfuerzo. Si este aporte te fue útil,
              me ayudarías enormemente suscribiéndote a mi canal de YouTube.
            </p>

            {/* Llamado de Suscripción: Meta Office 2021 */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 via-amber-50 to-red-50 border-2 border-red-200/90 text-center space-y-1.5 shadow-sm">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-700">
                <span className="text-base">🚀</span>
                <span>¡Ayúdanos a llegar a la meta!</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                Suscríbete y comparte para que estés enterado de los programas que estaré publicando. Si este canal sube a más suscriptores estaré subiendo{' '}
                <strong className="text-red-600 font-extrabold">Office 2021 totalmente gratis Licencia original</strong>.
              </p>
            </div>

            {/* Botón Grande de YouTube */}
            <div>
              <a
                href="https://www.youtube.com/@Soluci%C3%B3nDigital360"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#FF0000] hover:bg-[#D90000] active:scale-[0.98] text-white font-extrabold text-base transition-all shadow-lg shadow-red-500/25 group cursor-pointer"
              >
                <Youtube className="w-6 h-6 transition-transform group-hover:scale-110" />
                <span>Suscribirme a Solución Digital 360</span>
              </a>
            </div>

            {/* Separador sutil */}
            <div className="h-px w-full bg-slate-200/80 my-1" />

            {/* Banner de Venta Cruzada (Cross-Selling) */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-5 sm:p-6 border border-slate-700/60 shadow-md space-y-4">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Soluciones Empresariales</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  ¿Necesitas optimizar tu negocio?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Conoce nuestros sistemas administrativos y desarrollo de software a medida.
                </p>
              </div>

              {/* Botón Secundario de Servicios hacia Catálogo de Pago */}
              <Link
                href="/#sistemas"
                onClick={() => setIsModalOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-600/30 group cursor-pointer"
              >
                <span>Ver soluciones para mi negocio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Opción de Cierre en texto inferior */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-medium underline underline-offset-4 transition-colors cursor-pointer"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
