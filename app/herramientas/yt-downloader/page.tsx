import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import YTDownloaderDownloadBox from '@/components/YTDownloaderDownloadBox';
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
            <div className="hidden sm:flex p-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm shrink-0 items-center justify-center">
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
          <div className="relative bg-slate-950 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl border border-slate-800 overflow-hidden">
            {/* Barra superior estilo ventana premium */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  YT Downloader v2.0 — Solución Digital 360
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-400 border border-rose-800">
                  Estilo Neón Activo
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Sin Anuncios
                </span>
              </div>
            </div>

            {/* Captura oficial de pantalla */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800/90 shadow-inner group">
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
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Audio en máxima calidad MP3 & Video MP4
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                3 Ranuras de descarga simultáneas
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Modos visuales: Rock, Norteño, Pop, Urbano & Auto
              </span>
            </div>
          </div>
        </section>

        {/* Caja de Descarga Principal */}
        <YTDownloaderDownloadBox downloadUrl={DOWNLOAD_YT_URL} />

        {/* Funciones y Capacidades Destacadas */}
        <section aria-labelledby="capacidades-yt-titulo" className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <Sparkles className="w-4 h-4" />
              <span>Características Principales</span>
            </div>
            <h2 id="capacidades-yt-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Por qué usar YT Downloader de Solución Digital 360?
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Diseñado pensando en la comodidad del usuario, eliminando los peligros de sitios web llenos de virus, acortadores engañosos y redirecciones molestas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta 1: Sin Anuncios ni Malware */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>🛡️</span>
                    <span>100% Libre de Anuncios y Virus</span>
                  </h3>
                  <p className="text-xs text-slate-500">Cero banners, pop-ups ni software espía</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Descarga limpia y directa:</strong> Olvídate de los portales web que abren 5 pestañas de publicidad engañosa por cada canción.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Desarrollo seguro y transparente:</strong> Creado por Solución Digital 360 bajo estándares seguros para Windows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Sin límites de tiempo:</strong> Úsalo las veces que quieras cuando lo necesites.</span>
                </li>
              </ul>
            </div>

            {/* Tarjeta 2: Descargas Simultáneas por Lotes */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>⚡</span>
                    <span>Descarga Múltiple Simultánea</span>
                  </h3>
                  <p className="text-xs text-slate-500">Hasta 3 enlaces procesados en paralelo</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Ranuras organizadas:</strong> Descarga tu pista principal mientras encolar 2 opcionales en la misma pantalla.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Búsqueda y extracción inteligente:</strong> Detecta el enlace automáticamente y prepara el flujo de descarga.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Limpieza con un clic:</strong> Botón rápido para borrar enlaces y preparar la siguiente tanda.</span>
                </li>
              </ul>
            </div>

            {/* Tarjeta 3: Estilos Musicales & Arte Neón */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>🎸</span>
                    <span>Temas Neón por Estilo Musical</span>
                  </h3>
                  <p className="text-xs text-slate-500">Una experiencia visual inmersiva</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Selector de Géneros:</strong> Cambia dinámicamente entre Norteño, Rock, Pop, DJ/Urbano o modo Auto.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Ilustraciones Neón Reactivas:</strong> Cada estilo musical activa una estética artística retro-futurista única.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Modo Oscuro Integrado:</strong> Agradable a la vista, ideal para sesiones nocturnas.</span>
                </li>
              </ul>
            </div>

            {/* Tarjeta 4: Gestión de Carpetas y Calidad */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <FolderDown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>📁</span>
                    <span>Control Total de Almacenamiento</span>
                  </h3>
                  <p className="text-xs text-slate-500">Organización exacta en tu disco duro</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Ruta Personalizable:</strong> Escoge cualquier directorio o memoria USB para guardar tus archivos de audio y video.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Audio en Alta Fidelidad:</strong> Extrae el sonido en MP3 nítido preservando el espectro de graves y agudos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Compatibilidad Total:</strong> Pistas listas para reproducir en tu automóvil, celular, smart TV o equipo estéreo.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Guía Rápida de Instalación y Uso (4 Pasos) */}
        <section aria-labelledby="pasos-instalacion-titulo" className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 id="pasos-instalacion-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Cómo instalar y usar YT Downloader?
            </h2>
            <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
              El proceso toma menos de 2 minutos. Sigue estos 4 pasos para comenzar a descargar tu música favorita.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-base">Descargar</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Haz clic en el botón oficial de descarga para obtener el instalador ejecutable desde Google Drive.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-base">Instalar</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Ejecuta el archivo instalador en tu equipo con Windows y completa el asistente en pantalla.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-base">Pegar Enlace</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Copia el enlace del video o canción de YouTube, pégalo en una de las ranuras y selecciona tu carpeta destino.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-base">¡Disfrutar!</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Haz clic en Buscar / Descargar y tendrás tu música lista en tu equipo sin publicidad y en alta fidelidad.
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
