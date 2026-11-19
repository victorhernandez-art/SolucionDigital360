import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Office2016DownloadBox from '@/components/Office2016DownloadBox';
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
  title: 'Office 2016 GRATIS y LEGAL ✔️ | Descarga e Instalación Oficial | Solución Digital 360',
  description:
    'Aprende a instalar Microsoft Office 2016 Profesional (Word, Excel, PowerPoint, Outlook, Access) con instalador oficial y soporte para licencias originales.',
};

const DOWNLOAD_OFFICE_2016_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/Office2016/OfficeLicenciaOriginal2016.rar';

export default function Office2016Page() {
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
          <span className="text-slate-800 font-semibold truncate">Office 2016 Profesional</span>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span>Herramienta Gratuita · Paquete Completo Office</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Microsoft Office 2016 Profesional — Guía e Instalación
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Obtén el paquete completo de Microsoft Office 2016 para Windows. Incluye Word, Excel, PowerPoint, Outlook y Access. Paquete completo y estable con alto rendimiento.
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

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-slate-700/60 relative overflow-hidden">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-red-600/20 border-2 border-red-500/40 flex items-center justify-center text-red-400">
              <PlayCircle className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                Próximamente en YouTube
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Video Tutorial de Instalación Paso a Paso
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Estamos preparando la guía visual detallada para instalar y activar Office 2016 de forma legal. Suscríbete a nuestro canal oficial para recibir la notificación tan pronto se estrene.
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
        <Office2016DownloadBox downloadUrl={DOWNLOAD_OFFICE_2016_URL} />

        {/* Sección: Aplicaciones Incluidas */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Aplicaciones Incluidas en la Suite 2016
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Las herramientas esenciales de ofimática preparadas para trabajar en proyectos escolares, profesionales y empresariales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Word 2016</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Procesador de textos líder para cartas, documentos académicos, contratos y formatos profesionales.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Excel 2016</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hojas de cálculo con fórmulas avanzadas, tablas dinámicas y gráficos analíticos.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Presentation className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">PowerPoint 2016</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diseño de presentaciones visuales dinámicas con transiciones elegantes y plantillas ejecutivas.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Outlook 2016</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gestión centralizada de correo electrónico profesional, calendario de citas y contactos.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Access 2016</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gestor de bases de datos relacionales para administración de inventarios y formularios de datos.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">OneNote & Publisher 2016</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bloc de notas digital y maquetación de folletos, trípticos y material publicitario.
              </p>
            </div>
          </div>
        </section>

        {/* Guía en 3 Pasos */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              ¿Cómo descargar e instalar Office 2016?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sigue estas sencillas instrucciones para descomprimir e instalar sin errores:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Desbloquea y Descarga</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pulsa el botón de descarga, suscríbete al canal para desbloquear el enlace y obtén el archivo comprimido <code className="bg-slate-100 px-1 py-0.5 rounded text-red-600 font-mono text-[11px]">.RAR</code>.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Descomprime con WinRAR</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Haz clic derecho sobre el archivo descargado y selecciona <em>Extraer aquí</em> con WinRAR o 7-Zip.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ejecuta el Instalador</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Abre el archivo ejecutable <code className="bg-slate-100 px-1 py-0.5 rounded text-red-600 font-mono text-[11px]">setup.exe</code> como administrador y sigue los pasos del instalador.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

