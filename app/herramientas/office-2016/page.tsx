import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OfficeDualDownloadBox from '@/components/OfficeDualDownloadBox';
import HeaderDownloadButton from '@/components/HeaderDownloadButton';
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
  Laptop,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Office 2016 y 2013 GRATIS ✔️ | Descarga e Instalación Oficial | Solución Digital 360',
  description:
    'Aprende a instalar Microsoft Office 2016 y Office 2013 Profesional (Word, Excel, PowerPoint, Outlook, Access). Guía unificada paso a paso con instaladores directos.',
};

const DOWNLOAD_OFFICE_2016_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/Office2016/OFFICE.2016.PERPETUO.rar';
const DOWNLOAD_OFFICE_2013_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/Office2013/OFFICE.2013.PERPETUO.rar';

export default function Office2016And2013Page() {
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
          <span className="text-slate-800 font-semibold truncate">Office 2016 y 2013 Profesional</span>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
            <span>Herramienta Gratuita · 2 Versiones en 1 Sola Guía</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl">
              Microsoft Office 2016 y 2013 — Guía e Instaladores
            </h1>

            {/* Botones de Descarga Superior para 2016 y 2013 */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center lg:justify-end">
              <HeaderDownloadButton
                targetModalEvent="sd360_open_modal_office2016"
                sistemaSlug="office-2016"
                sistemaNombre="Office 2016 Profesional"
                label="Descargar Office 2016 (.RAR)"
                sublabel="Recomendado para Win 10 / 11"
                color="indigo"
              />
              <HeaderDownloadButton
                targetModalEvent="sd360_open_modal_office2013"
                sistemaSlug="office-2013"
                sistemaNombre="Office 2013 Profesional"
                label="Descargar Office 2013 (.RAR)"
                sublabel="Ultra Ligero · PC Estándar"
                color="amber"
              />
            </div>
          </div>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            El mismo proceso de instalación para ambas versiones. Elige <strong>Office 2016</strong> para equipos modernos con Windows 10/11, o <strong>Office 2013</strong> para un rendimiento ultra ligero en cualquier computadora de recursos estándar.
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

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-slate-700/60 relative overflow-hidden">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-red-600/20 border-2 border-red-500/40 flex items-center justify-center text-red-400">
              <PlayCircle className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                Próximamente en YouTube
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Video Tutorial de Instalación Paso a Paso (Office 2016 / 2013)
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Estamos preparando el tutorial definitivo donde aprenderás a instalar y dejar operativo tu paquete Office de forma legal y segura. Suscríbete para ser el primero en verlo.
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

        {/* Componente Dual de Descarga con 2 Botones y Sub2Unlock */}
        <OfficeDualDownloadBox
          downloadUrl2016={DOWNLOAD_OFFICE_2016_URL}
          downloadUrl2013={DOWNLOAD_OFFICE_2013_URL}
        />

        {/* Sección: Comparativa rápida y Aplicaciones */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Cuál versión elegir para tu equipo?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ambas suites incluyen las aplicaciones completas: Word, Excel, PowerPoint, Outlook, Access, OneNote y Publisher.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-indigo-200/90 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  2016
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Office 2016 Profesional</h3>
                  <span className="text-xs text-indigo-600 font-semibold">Para Windows 10 y 11</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 pt-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interfaz gráfica oscura y moderna adaptada a pantallas HD.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Mayor compatibilidad con archivos y fórmulas recientes de Excel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Excelente estabilidad para trabajo de oficina y universidad.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-amber-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  2013
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Office 2013 Profesional</h3>
                  <span className="text-xs text-amber-600 font-semibold">Para PC con recursos estándar</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 pt-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Consumo mínimo de memoria RAM (funciona fluido en 2 GB y 4 GB).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Apertura instantánea de Word y Excel sin demoras de carga.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ideal para computadoras de mostrador, talleres y laptops estándar.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Guía en 3 Pasos */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Instrucciones de Instalación (Válidas para 2016 y 2013)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              El procedimiento es idéntico en ambas versiones:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Descarga tu Versión</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Selecciona 2016 o 2013, suscríbete para desbloquear el enlace y descarga el paquete comprimido <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-[11px]">.RAR</code>.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Descomprime con WinRAR</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Haz clic derecho sobre el archivo descargado y selecciona <em>Extraer aquí</em> con WinRAR o 7-Zip.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ejecuta Setup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ejecuta el archivo <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-[11px]">setup.exe</code> como administrador y deja que el instalador complete la copia de archivos.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
