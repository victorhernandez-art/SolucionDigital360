'use client';

import { useState, useEffect } from 'react';
import { 
  Download, 
  ShieldCheck, 
  MessageSquare, 
  Users, 
  Globe,
  Clock
} from 'lucide-react';

interface DownloadCtaCardProps {
  sistemaNombre: string;
  whatsappUrl: string;
  megaLink?: string;
  isTallerSystem?: boolean;
  downloadUrl?: string;
  sistemaSlug?: string;
}

export default function DownloadCtaCard({
  sistemaNombre,
  whatsappUrl,
  megaLink = "https://mega.nz",
  isTallerSystem = true,
  downloadUrl,
  sistemaSlug
}: DownloadCtaCardProps) {
  const isGym = sistemaSlug?.includes('gimnasio') || sistemaNombre.toLowerCase().includes('gimnasio') || sistemaNombre.toLowerCase().includes('gym');
  const baseCount = isGym ? 364 : 526;

  // Estado para el contador de descargas (inicia en 364 para gimnasio o 526 para taller)
  const [downloadCount, setDownloadCount] = useState<number>(baseCount);
  const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);

  // Cargar el conteo real persistido desde el servidor
  useEffect(() => {
    const slugParam = sistemaSlug || (isGym ? 'sistema-gestion-gimnasios' : 'sistema-gestion-tecnicos');
    fetch(`/api/downloads?sistema=${slugParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setDownloadCount(data.count);
        }
      })
      .catch((err) => {
        console.error('Error al sincronizar descargas:', err);
      });
  }, [sistemaSlug, isGym]);

  const handleDownload = async () => {
    if (!hasDownloaded) {
      setDownloadCount((prev) => prev + 1);
      setHasDownloaded(true);

      // Registrar incremento persistente en el servidor
      try {
        const slugParam = sistemaSlug || (isGym ? 'sistema-gestion-gimnasios' : 'sistema-gestion-tecnicos');
        const res = await fetch('/api/downloads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sistema: slugParam })
        });
        const data = await res.json();
        if (data && typeof data.count === 'number') {
          setDownloadCount(data.count);
        }
      } catch (err) {
        console.error('Error al guardar incremento de descarga:', err);
      }
    }
    // Usa la downloadUrl directa si está disponible, si no el megaLink
    window.open(downloadUrl || megaLink, '_blank');
  };

  const hasDirectDownload = !!downloadUrl;

  const whatsappPruebaMsg = encodeURIComponent(
    `Hola, acabo de descargar el "${sistemaNombre}". Quisiera solicitar mi clave de prueba gratuita por 7 días para comenzar a evaluar el sistema en mi ${isGym ? 'gimnasio' : 'taller'}.`
  );
  const whatsappPruebaUrl = `https://wa.me/529611209361?text=${whatsappPruebaMsg}`;

  return (
    <section id="adquirir" className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/60 relative overflow-hidden text-center space-y-7 border-2 border-slate-200/90">
      {/* Barra superior de acento con gradiente elegante */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />
      
      {/* Sutiles reflejos de fondo suaves para estética premium */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-72 h-72 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        {/* Badges superiores limpios y legibles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-bold tracking-wide uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Licencia Vitalicia + 6 Meses de Soporte Técnico Gratis</span>
          </div>
        </div>

        {/* Título equilibrado, sobrio y con alto contraste */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {isTallerSystem
            ? `¿Listo para ordenar tu taller técnico con ${sistemaNombre}?`
            : `¿Listo para potenciar y transformar tu negocio con ${sistemaNombre}?`}
        </h2>

        {/* Bloque de Información de Precio y Compra Internacional */}
        <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 sm:p-6 text-left shadow-sm mt-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex flex-wrap items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Precio internacional de referencia:</span>
              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-lg font-mono text-base sm:text-lg border border-emerald-200">
                $2,000.00 MXN en México
              </span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium">
              Pago único. Sin mensualidades ni cobros recurrentes.
            </p>
          </div>
        </div>

        {/* Bloque: Prueba Gratis con Acceso Completo */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 text-left space-y-2 shadow-sm mt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Prueba Gratuita de 7 Días con Todas las Funciones Activas
            </h4>
            <span className="text-xs font-bold text-blue-700 bg-blue-100/90 px-2.5 py-0.5 rounded-full border border-blue-200 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Acceso Total 7 Días
            </span>
          </div>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
            {isTallerSystem ? (
              <>
                Descarga el instalador en tu computadora y solicita tu clave de prueba por 7 días para utilizar el programa completo sin limitaciones. <strong className="text-slate-900 font-semibold">Puedes registrar órdenes reales, capturar clientes, probar el cobro en caja e imprimir tickets</strong> para comprobar con total tranquilidad que se adapta al 100% a tu taller antes de adquirir la licencia vitalicia.
              </>
            ) : (
              <>
                Prueba el sistema completo durante 7 días con todas las funciones activas. <strong className="text-slate-900 font-semibold">Registra socios, gestiona membresías, vende en la tienda POS y controla asistencias</strong> para comprobar con total tranquilidad que se adapta al 100% a tu gimnasio antes de adquirir la licencia vitalicia.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Botones CTA Prominentes y Marcador de Descargas al lado */}
      <div className="relative z-10 max-w-4xl mx-auto pt-2">
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {/* CTA 1: Descargar Instalador */}
          {hasDirectDownload && (
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial min-w-[220px] sm:min-w-[250px] min-h-[58px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all text-sm sm:text-base group cursor-pointer text-center"
            >
              <Download className="w-5 h-5 shrink-0 group-hover:translate-y-0.5 transition-transform" />
              <span className="leading-tight">Descargar Instalador</span>
            </button>
          )}

          {/* Marcador Premium Rediseñado al lado del Botón de Descarga */}
          {(isTallerSystem || hasDirectDownload || isGym) && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-400/30 shadow-md shadow-slate-950/15 min-h-[58px] select-none">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-white tracking-tight font-mono">
                    +{downloadCount.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-300 block leading-tight">
                  Descargas del Instalador
                </span>
              </div>
            </div>
          )}

          {/* CTA 2: WhatsApp para Clave de Prueba o Compra */}
          <a
            href={isTallerSystem ? whatsappPruebaUrl : whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial min-w-[220px] sm:min-w-[250px] min-h-[58px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all text-sm sm:text-base text-center"
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span className="leading-tight">{isTallerSystem ? 'Solicitar Clave de Prueba' : 'Solicitar Prueba o Demo'}</span>
          </a>
        </div>
      </div>

      {/* Notas al pie de seguridad y compra personal */}
      <div className="space-y-1.5 pt-1 relative z-10 text-xs text-slate-500">
        <p className="font-medium text-slate-700">
          La compra y entrega de accesos o claves se coordina de forma personal por WhatsApp. No se procesan pagos automáticos desde esta página.
        </p>
        {hasDirectDownload && (
          <p className="text-[11px] text-slate-400">
            🔒 Instalador libre de virus. Incluye 7 días de acceso completo a todas las funciones operativas{isTallerSystem ? ' e impresión de tickets' : ' y gestión de socios'}.
          </p>
        )}
      </div>
    </section>
  );
}
