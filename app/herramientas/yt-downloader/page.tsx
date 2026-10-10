import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import YTDownloaderDownloadBox from '@/components/YTDownloaderDownloadBox';
import FacebookReelEmbed from '@/components/FacebookReelEmbed';
import {
  ArrowLeft,
  CheckCircle2,
  Music,
  Youtube,
  FolderDown,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Zap,
  Sliders,
  Volume2,
  Tv,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'YT Downloader — Descarga Música y Videos de YouTube Gratis Sin Anuncios | Solución Digital 360',
  description:
    'Descarga canciones y videos de YouTube en alta fidelidad y sin publicidad molesta. Herramienta gratuita para Windows con descargas simultáneas y temas neón interactivos.',
};

const DOWNLOAD_YT_URL =
  'https://drive.google.com/file/d/1dOgcOtdbSb-3u89ZGnc5S8Foom7c_jAA/view?usp=sharing';

export default function YTDownloaderPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Breadcrumb y Navegación de regreso */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/#herramientas-gratuitas"
            className="inline-flex items-center gap-1.5 hover:text-rose-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Herramientas Gratuitas</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold truncate">YT Downloader v2.0</span>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200 shadow-sm">
            <Youtube className="w-3.5 h-3.5 text-rose-600 fill-current" />
            <span>Herramienta de Apoyo Gratuita · 100% Sin Publicidad</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="hidden sm:flex p-2 bg-slate-100 border border-slate-200 rounded-2xl shadow-sm shrink-0 items-center justify-center">
              <Image
                src="/yt-downloader-icon.svg"
                alt="YT Downloader"
                width={56}
                height={56}
                className="w-12 h-12 object-contain"
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                YT Downloader — Música & Videos de YouTube Sin Anuncios
              </h1>
              <p className="text-xs font-bold text-rose-600 mt-1 uppercase tracking-wider">
                Versión 2.0 Oficial · Desarrollado por Solución Digital 360
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Una herramienta de escritorio diseñada para que descargues tus pistas y videos favoritos de YouTube directamente a tu computadora{' '}
            <strong className="text-slate-900">sin interrupciones, sin publicidad invasiva y sin ventanas emergentes</strong>. Cuenta con soporte para descargas simultáneas por lotes (hasta 3 canciones a la vez), selector de carpeta de destino y temas visuales estilo neón interactivos.
          </p>
        </div>

        {/* Showcase Visual de la Aplicación */}
        <section aria-label="Vista previa de la interfaz de la aplicación" className="space-y-4">
          <div className="relative bg-slate-100/90 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-sm border border-slate-200/90 overflow-hidden">
            {/* Barra superior estilo ventana premium */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-600 hidden sm:inline">
                  YT Downloader v2.0 — Solución Digital 360
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                  Estilo Neón Activo
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                  Sin Anuncios
                </span>
              </div>
            </div>

            {/* Captura oficial de pantalla */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
              <Image
                src="/yt-downloader-preview.png"
                alt="Interfaz oficial de la aplicación YT Downloader v2.0 con estética neón y descargas simultáneas"
                width={1200}
                height={675}
                className="w-full h-auto object-cover rounded-xl"
                priority
                unoptimized
              />
            </div>

            {/* Badges al pie de la vista previa */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Audio en máxima calidad MP3 & Video MP4
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                3 Ranuras de descarga simultáneas
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Modos visuales: Rock, Norteño, Pop, Urbano & Auto
              </span>
            </div>
          </div>
        </section>

        {/* Video Demostración Oficial (Facebook Reel) */}
        <FacebookReelEmbed
          videoUrl="https://www.facebook.com/reel/2226372958286827"
          title="Demostración Oficial de YT Downloader en Facebook"
          coverImage="/yt-downloader-reel-cover.jpg"
        />

        {/* Caja de Descarga Principal */}
        <YTDownloaderDownloadBox downloadUrl={DOWNLOAD_YT_URL} />

        {/* ========================================================================= */}
        {/* ⭐ CARACTERÍSTICAS ESPECIALES                                             */}
        {/* ========================================================================= */}
        <section aria-labelledby="caracteristicas-especiales-titulo" className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <Sparkles className="w-4 h-4" />
              <span>Funciones Exclusivas v2.0</span>
            </div>
            <h2 id="caracteristicas-especiales-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ⭐ Características Especiales de YT Downloader
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Diseñado pensando en la comodidad del usuario, eliminando los peligros de sitios web con virus, acortadores y publicidad molesta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Función 1: Selector de Estilo Musical */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Selector de Estilo Musical
                  </h3>
                  <p className="text-xs text-slate-500">Temática interactiva en barra superior</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cambia la temática visual de la aplicación entre <strong>Norteño, Rock, Pop o DJ / Urbano</strong> (o modo Auto) con iluminación y arte neón dinámico.
              </p>
            </div>

            {/* Función 2: Detección de duplicados */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Detección de Duplicados
                  </h3>
                  <p className="text-xs text-slate-500">Ahorra espacio en tu disco duro</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                La aplicación te avisa automáticamente si una canción ya la habías descargado con anterioridad, evitando descargas repetidas y gastos de memoria innecesarios.
              </p>
            </div>

            {/* Función 3: Cola de descargas */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Cola de Descargas
                  </h3>
                  <p className="text-xs text-slate-500">Hasta 3 enlaces simultáneos</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Descarga hasta <strong>3 canciones o videos simultáneamente</strong> procesando tu lote de música en un solo clic y a máxima velocidad.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 📥 PASOS PARA INSTALAR                                                    */}
        {/* ========================================================================= */}
        <section aria-labelledby="pasos-instalacion-titulo" className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <FolderDown className="w-4 h-4" />
              <span>Guía de Instalación Paso a Paso</span>
            </div>
            <h2 id="pasos-instalacion-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              📥 Pasos para Instalar en Windows
            </h2>
            <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
              Sigue estas sencillas instrucciones para instalar <strong>SD360 YT Downloader</strong> en tu computadora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paso 1 */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-base">Ejecutar el Instalador</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Haz doble clic en el archivo descargado:{' '}
                <code className="px-2 py-1 rounded-md bg-slate-100 text-rose-600 font-mono text-xs font-semibold">
                  SD360 YT Downloader Setup 2.0.0.exe
                </code>
              </p>
            </div>

            {/* Paso 2: SmartScreen Callout */}
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-sky-200 text-sky-800 font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Pantalla &quot;Windows protegió su PC&quot; (SmartScreen)
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Si Windows muestra la pantalla azul de advertencia de SmartScreen:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
                <li>Haz clic en el enlace: <strong>&quot;Más información&quot;</strong></li>
                <li>Luego haz clic en el botón: <strong>&quot;Ejecutar de todas formas&quot;</strong></li>
              </ul>
              <p className="text-[11px] text-sky-700 font-medium italic pt-1 border-t border-sky-200/60">
                ℹ️ Esto es normal en programas nuevos desarrollados de forma independiente.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-base">Instrucciones del Asistente</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sigue las instrucciones del instalador en pantalla:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc">
                <li>Elige la carpeta donde deseas instalarlo (por defecto se instala en tu usuario).</li>
                <li>Haz clic en el botón <strong>&quot;Instalar&quot;</strong>.</li>
              </ul>
            </div>

            {/* Paso 4 */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0">
                  4
                </span>
                <h3 className="font-bold text-slate-900 text-base">¡Listo para Usar!</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Se creará automáticamente un acceso directo en tu <strong>Escritorio</strong> y en tu <strong>Menú de Inicio</strong> con el nombre:
              </p>
              <p className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                &quot;SD360 YT Downloader&quot;
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 🎵 CÓMO USAR LA APLICACIÓN                                                */}
        {/* ========================================================================= */}
        <section aria-labelledby="como-usar-titulo" className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <Music className="w-4 h-4" />
              <span>Guía de Uso Rápido</span>
            </div>
            <h2 id="como-usar-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              🎵 Cómo Usar la Aplicación
            </h2>
            <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
              Descarga canciones o videos completos en unos sencillos clics:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Abrir la Aplicación</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Abre <strong>&quot;SD360 YT Downloader&quot;</strong> desde el icono en tu Escritorio.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Configurar Carpeta</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Configura tu carpeta de descarga (por defecto guarda en tu carpeta <em>Música</em>) o pulsa <strong>&quot;Cambiar carpeta&quot;</strong>.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Pegar Enlace</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Pega el enlace de la canción o video de YouTube en el campo <strong>&quot;Descarga 1&quot;</strong>.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Buscar Video</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Haz clic en el botón <strong>&quot;Buscar&quot;</strong>. La app mostrará la miniatura y los datos del video.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                5
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Seleccionar Formato</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Elige entre <strong>&quot;Audio MP3&quot;</strong> (solo música) o <strong>&quot;Video MP4&quot;</strong> (video completo).
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                6
              </span>
              <h3 className="font-bold text-slate-900 text-sm">¡Descargar!</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Haz clic en <strong>&quot;Descargar&quot;</strong> y espera a que termine. ¡Eso es todo!
              </p>
            </div>
          </div>
        </section>

        {/* Requisitos del Sistema Recomendados */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-rose-600" />
            <span>Requisitos del Sistema para YT Downloader</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span><strong>Sistema Operativo:</strong> Windows 10 u 11 (64 bits)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span><strong>Procesador:</strong> Intel Core o AMD (1.6 GHz o superior)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span><strong>Memoria RAM:</strong> 2 GB mínimo (4 GB recomendado)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span><strong>Almacenamiento:</strong> 150 MB de espacio libre para la aplicación</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span><strong>Conexión:</strong> Internet activa para la extracción y descarga</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span><strong>Pantalla:</strong> Resolución mínima 1280 x 720</span>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
