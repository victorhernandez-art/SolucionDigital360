import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NitroDownloadBox from '@/components/NitroDownloadBox';
import {
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nitro PDF Pro — Video Tutorial y Descarga Gratuita | Solución Digital 360',
  description:
    'Aprende a instalar y configurar Nitro PDF Pro con nuestro video tutorial exclusivo en alta definición sin publicidad y descarga los archivos necesarios.',
};

// ---------------------------------------------------------------------------
// ENLACES OFICIALES (GitHub Releases CDN)
// ---------------------------------------------------------------------------
const VIDEO_RELEASE_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/NitroPDF/Nitro.PDF.mp4';
const DOWNLOAD_RELEASE_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/NitroPDF/Nitro.PDF.Pro.14.41.0.15.x64.Enterprise.rar';

export default function NitroPdfPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Breadcrumb y Navegación de regreso */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/#herramientas-gratuitas"
            className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Herramientas Gratuitas</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold truncate">Nitro PDF Pro</span>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200 shadow-sm">
            <FileCheck2 className="w-3.5 h-3.5 text-orange-600" />
            <span>Herramienta de Apoyo Gratuita · Video Tutorial HD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Nitro PDF Pro — Guía de Instalación y Descarga
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Sigue este tutorial paso a paso para instalar y activar Nitro PDF Pro en tu equipo.
            El video se reproduce de forma nativa desde nuestros servidores en GitHub Releases,{' '}
            <strong className="text-slate-900">sin anuncios molestos ni ventanas de terceros</strong>.
          </p>
        </div>

        {/* Reproductor de Video Nativo (HTML5) */}
        <section aria-label="Reproductor de video tutorial" className="space-y-4">
          <div className="relative bg-slate-950 rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-2xl border border-slate-800 overflow-hidden">
            {/* Barra superior estilo ventana premium */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  Nitro.PDF.mp4
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                1080p HD · Sin Anuncios
              </span>
            </div>

            {/* Video HTML5 Nativo */}
            <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain rounded-xl sm:rounded-2xl focus:outline-none"
              >
                <source src={VIDEO_RELEASE_URL} type="video/mp4" />
                Tu navegador no soporta el reproductor nativo de video HTML5.
              </video>
            </div>
          </div>

          {/* Aviso informativo de streaming optimizado */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-sm text-emerald-950">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-900">Video oficial en alta resolución activo</p>
              <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                Este video tutorial está alojado en la red CDN de GitHub Releases para garantizar una carga
                rápida, sin interrupciones ni publicidad externa.
              </p>
            </div>
          </div>
        </section>

        {/* Tarjeta de Descarga Directa con Marcador y Descargo de Responsabilidad */}
        <NitroDownloadBox downloadUrl={DOWNLOAD_RELEASE_URL} />

        {/* Pasos de Instalación */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Instrucciones Rápidas de Instalación
            </h2>
            <p className="text-slate-600 text-sm">
              Sigue estos 4 sencillos pasos para completar la instalación sin contratiempos:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-base">Descargar Archivo</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Haz clic en el botón naranja de descarga para obtener el paquete comprimido en formato .RAR (64 bits).
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-base">Descomprimir</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Usa WinRAR, 7-Zip o el explorador de Windows para extraer el contenido en una carpeta de tu preferencia.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-y space-y-3">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-base">Ejecutar Asistente</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Abre el instalador y sigue las indicaciones mostradas en el video tutorial para la configuración.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-base">Completar y Disfrutar</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Pulsa &ldquo;Finish&rdquo; en el asistente y comienza a editar, unir y firmar documentos PDF con total libertad.
              </p>
            </div>
          </div>
        </section>

        {/* Requisitos Mínimos */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Requisitos del Sistema Recomendados</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span><strong>Sistema Operativo:</strong> Windows 10 u 11 (64 bits)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span><strong>Memoria RAM:</strong> Mínimo 2 GB (4 GB recomendado)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span><strong>Almacenamiento:</strong> 500 MB de espacio disponible</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span><strong>Resolución:</strong> 1024x768 o superior</span>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
