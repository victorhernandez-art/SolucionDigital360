import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Office2013DownloadBox from '@/components/Office2013DownloadBox';
import {
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Check,
  FileSpreadsheet,
  FileText,
  Presentation,
  Mail,
  Database,
  Youtube,
  PlayCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Office 2013 GRATIS y LEGAL ✔️ | Descarga e Instalación Ligera | Solución Digital 360',
  description:
    'Aprende a instalar Microsoft Office 2013 Profesional (Word, Excel, PowerPoint, Outlook, Access). La versión más ligera y compatible para cualquier PC con Windows.',
};

const DOWNLOAD_OFFICE_2013_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/Office2013/OfficeLicenciaOriginal2013.rar';

export default function Office2013Page() {
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
          <span className="text-slate-800 font-semibold truncate">Office 2013 Profesional</span>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span>Herramienta Gratuita · Paquete Ultra Ligero</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Microsoft Office 2013 Profesional — Guía e Instalación
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            La versión más veloz, estable y ligera de Microsoft Office. Ideal para laptops y computadoras de escritorio con recursos estándar, garantizando fluidez sin ralentizar tu equipo.
          </p>
        </div>

        {/* Sección de Video Tutorial (Próximamente / Canal Oficial) */}
        <section aria-labelledby="video-tutorial-title" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="video-tutorial-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Video Tutorial Oficial en YouTube
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Canal Oficial @SoluciónDigital360
            </span>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-slate-700/60 relative overflow-hidden">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-amber-600/20 border-2 border-amber-500/40 flex items-center justify-center text-amber-400">
              <PlayCircle className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Próximamente en YouTube
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Video Tutorial de Instalación Paso a Paso
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Estamos preparando la guía visual detallada para instalar y activar Office 2013 en minutos. Suscríbete a nuestro canal oficial para no perderte el estreno.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://www.youtube.com/@SolucionDigital360?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-600/30"
              >
                <Youtube className="w-5 h-5" />
                <span>Suscribirme al Canal Oficial</span>
              </a>
            </div>
          </div>
        </section>

        {/* Componente Interactivo de Descarga con Sub2Unlock */}
        <Office2013DownloadBox downloadUrl={DOWNLOAD_OFFICE_2013_URL} />

        {/* Sección: Aplicaciones Incluidas */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Aplicaciones Incluidas en la Suite 2013
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Rendimiento inmediato sin sobrecargar el procesador ni el consumo de memoria RAM de tu computadora.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Word 2013</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apertura y edición instantánea de documentos de texto, cartas y formularios comerciales.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Excel 2013</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Control numérico, cálculo contable, gráficos y fórmulas estándar con bajo consumo de memoria.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Presentation className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">PowerPoint 2013</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Creación y proyección de diapositivas limpias con transiciones rápidas y ligeras.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Outlook 2013</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bandeja de entrada empresarial y gestión confiable de correos IMAP / POP3.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Access 2013</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Base de datos de escritorio sólida para registros de inventario y administración básica.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">OneNote & Publisher 2013</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Notas sincronizadas y diseño básico de documentos impresos.
              </p>
            </div>
          </div>
        </section>

        {/* Guía en 3 Pasos */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              ¿Cómo descargar e instalar Office 2013?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sigue estas sencillas instrucciones para descomprimir e instalar sin errores:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Desbloquea y Descarga</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pulsa el botón de descarga, suscríbete al canal para desbloquear el enlace y obtén el archivo comprimido <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-600 font-mono text-[11px]">.RAR</code>.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Descomprime con WinRAR</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Haz clic derecho sobre el archivo descargado y selecciona <em>Extraer aquí</em> con WinRAR o 7-Zip.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ejecuta el Instalador</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Abre el archivo ejecutable <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-600 font-mono text-[11px]">setup.exe</code> como administrador y sigue los pasos del instalador.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

