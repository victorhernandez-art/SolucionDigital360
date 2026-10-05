import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OfficeDownloadBox from '@/components/OfficeDownloadBox';
import {
  CheckCircle2,
  AppWindow,
  ArrowLeft,
  Sparkles,
  Check,
  FileSpreadsheet,
  FileText,
  Presentation,
  Mail,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Office 2019 GRATIS y LEGAL ✔️ | Cómo Activarlo con Licencia Original | Solución Digital 360',
  description:
    'Aprende a instalar y activar Microsoft Office 2019 (Word, Excel, PowerPoint, Outlook, OneNote) con licencia original paso a paso con nuestro video tutorial oficial.',
};

const DOWNLOAD_OFFICE_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/Office2019/Office.Profesional.2019-20261001T161622Z-1-001.zip';

export default function Office2019Page() {
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
          <span className="text-slate-800 font-semibold truncate">Office 2019 Profesional</span>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 shadow-sm">
            <Image
              src="/office-2019-icon.png"
              alt="Office 2019"
              width={16}
              height={16}
              className="w-3.5 h-3.5 object-contain"
              unoptimized
            />
            <span>Guía Oficial · Video Tutorial en YouTube & Descarga</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="hidden sm:flex p-2.5 bg-white border border-slate-200/90 rounded-2xl shadow-sm shrink-0 items-center justify-center">
              <Image
                src="/office-2019-logo.png"
                alt="Microsoft Office"
                width={80}
                height={32}
                className="w-24 h-auto object-contain"
                unoptimized
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Office 2019 GRATIS y LEGAL ✔️ | Cómo Activarlo con una Licencia Original
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            En este video te mostramos paso a paso cómo instalar Microsoft Office 2019 y realizar su activación
            utilizando una licencia original. Aprenderás de manera sencilla cómo realizar el proceso correctamente
            y dejar Office listo para utilizar en tu equipo.
          </p>
        </div>

        {/* Reproductor de Video de YouTube Embebido */}
        <section aria-label="Reproductor de video tutorial YouTube" className="space-y-4">
          <div className="relative bg-slate-950 rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-2xl border border-slate-800 overflow-hidden">
            {/* Barra superior estilo ventana premium */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  youtube.com/watch?v=L1HGFcqHDsI
                </span>
              </div>
              <span className="text-xs font-semibold text-red-400 bg-red-950/80 border border-red-800/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>Canal @SoluciónDigital360</span>
              </span>
            </div>

            {/* Iframe de YouTube */}
            <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl"
                src="https://www.youtube.com/embed/L1HGFcqHDsI?start=6&rel=0&modestbranding=1"
                title="Office 2019 GRATIS y LEGAL ✔️ | Cómo Activarlo con una Licencia Original"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Paquetería Incluida */}
        <section aria-labelledby="apps-incluidas-titulo" className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span>Paquetería Completa</span>
            </div>
            <h2 id="apps-incluidas-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              💻 Aplicaciones Incluidas en Office 2019 Profesional
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              Todas las herramientas esenciales de productividad listas para trabajar en oficina, escuela o proyectos personales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Word */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2 text-center hover:border-blue-400 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-extrabold text-lg">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Word</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Creación y edición de textos y documentos profesionales.
              </p>
            </div>

            {/* Excel */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2 text-center hover:border-emerald-400 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold text-lg">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Microsoft Excel</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Hojas de cálculo, fórmulas avanzadas y gráficos interactivos.
              </p>
            </div>

            {/* PowerPoint */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2 text-center hover:border-orange-400 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-extrabold text-lg">
                <Presentation className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">PowerPoint</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Presentaciones dinámicas con transiciones y animaciones.
              </p>
            </div>

            {/* Outlook */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2 text-center hover:border-sky-400 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-extrabold text-lg">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Outlook</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Gestión de correo electrónico, calendario y contactos.
              </p>
            </div>

            {/* OneNote */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2 text-center hover:border-purple-400 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-extrabold text-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">OneNote</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Bloc de notas digital para apuntes, listas e ideas.
              </p>
            </div>
          </div>
        </section>

        {/* Qué encontrarás en el video */}
        <section aria-labelledby="contenido-video-titulo" className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 id="contenido-video-titulo" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              En este video tutorial aprenderás:
            </h2>
            <p className="text-slate-600 text-sm">
              Una guía clara y concisa pensada para que cualquier persona pueda completar el proceso sin dificultad:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Instalación de Office 2019</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Paso a paso de cómo ejecutar el paquete y configurar los componentes esenciales.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Configuración Inicial</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Ajustes recomendados para el primer inicio de Word, Excel y PowerPoint.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Activación con Licencia Original</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Procedimiento oficial y legítimo para vincular tu clave de producto.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Comprobación de Estado</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Recomendaciones para verificar que Office quedó 100% activado y sin alertas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tarjeta de Descarga Directa con Marcador y Descargo de Responsabilidad */}
        <OfficeDownloadBox downloadUrl={DOWNLOAD_OFFICE_URL} />

        {/* Pasos de Instalación */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Instrucciones de Instalación
            </h2>
            <p className="text-slate-600 text-sm">
              Sigue estos 4 pasos guiados para tener Office 2019 funcionando en minutos:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-base">Descargar Archivo</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Haz clic en el botón azul de descarga para obtener el paquete comprimido en formato .ZIP.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-base">Descomprimir</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Da clic derecho en el archivo .zip y selecciona &ldquo;Extraer todo&rdquo; en tu computadora.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-base">Ejecutar Instalador</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Abre el archivo de instalación y sigue las indicaciones mostradas en el video tutorial de YouTube.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-base">Validar y Disfrutar</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Ingresa tu licencia original y disfruta de toda la suite de Office con soporte completo.
              </p>
            </div>
          </div>
        </section>

        {/* Requisitos Mínimos */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Requisitos Recomendados del Sistema</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Sistema Operativo:</strong> Windows 10 u 11 (32 o 64 bits)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Memoria RAM:</strong> Mínimo 4 GB (8 GB recomendado)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Espacio en Disco:</strong> Mínimo 4 GB de espacio libre</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Procesador:</strong> 1.6 GHz o superior (2 núcleos o más)</span>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
