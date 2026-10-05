import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilmoraDownloadBox from '@/components/FilmoraDownloadBox';
import {
  ArrowLeft,
  CheckCircle2,
  Film,
  Scissors,
  Sparkles,
  Layers,
  Palette,
  Mic,
  Video,
  Check,
  ShieldCheck,
  Monitor,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wondershare Filmora — Guía & Descarga Gratuita | Solución Digital 360',
  description:
    'Aprende a instalar y dominar Wondershare Filmora con herramientas de edición profesional: corte magnético, keyframes, curvas de velocidad, chroma key, tracking y corrección de color con LUTs 3D.',
};

const DOWNLOAD_FILMORA_URL =
  'https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/Filmora/Filmora.rar';

export default function FilmoraPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Breadcrumb y Navegación de regreso */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/#herramientas-gratuitas"
            className="inline-flex items-center gap-1.5 hover:text-teal-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Herramientas Gratuitas</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold truncate">Wondershare Filmora</span>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200 shadow-sm">
            <Image
              src="/filmora-icon.png"
              alt="Filmora"
              width={16}
              height={16}
              className="w-3.5 h-3.5 object-contain rounded-[3px]"
              unoptimized
            />
            <span>Herramienta de Apoyo Gratuita · Paquete Completo 64 bits</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="hidden sm:flex p-2.5 bg-white border border-slate-200/90 rounded-2xl shadow-sm shrink-0 items-center justify-center">
              <Image
                src="/filmora-logo.png"
                alt="Wondershare Filmora"
                width={100}
                height={32}
                className="w-28 h-auto object-contain"
                unoptimized
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Wondershare Filmora — Suite de Edición de Video Profesional
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Wondershare Filmora ofrece un conjunto completo de herramientas de edición tradicional que abarcan el corte,
            la división y el ajuste magnético en la línea de tiempo, junto con animación avanzada mediante fotogramas clave
            (keyframes), curvas de velocidad y rastreo de movimiento. Para la composición visual y sonora, incluye pantalla verde
            (Chroma Key), máscaras personalizables, pantalla dividida, mezcla de audio y sincronización automática. Todo esto
            se complementa con herramientas de corrección de color mediante LUTs 3D, titulación animada y un grabador de pantalla integrado.
          </p>
        </div>

        {/* Funciones y Capacidades de Filmora */}
        <section aria-labelledby="capacidades-filmora-titulo" className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600">
              <Sparkles className="w-4 h-4" />
              <span>Herramientas & Flujo Creativo</span>
            </div>
            <h2 id="capacidades-filmora-titulo" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ¿Qué puedes crear con Wondershare Filmora?
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Un entorno intuitivo y potente diseñado tanto para creadores de contenido de YouTube y redes sociales
              como para editores de video corporativo y cineasta independiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta 1: Edición Tradicional & Línea de Tiempo */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>🎬</span>
                    <span>Edición Tradicional & Línea de Tiempo</span>
                  </h3>
                  <p className="text-xs text-slate-500">Corte de precisión y ensamblado fluido</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Corte y división instantáneos:</strong> Recorta fragmentos no deseados con un solo clic.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Ajuste magnético en línea de tiempo:</strong> Clips que se unen automáticamente sin dejar espacios vacíos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Edición multicapa:</strong> Pistas ilimitadas de video, audio, superposiciones y texto.</span>
                </li>
              </ul>
            </div>

            {/* Tarjeta 2: Animación Avanzada & Keyframes */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>⚡</span>
                    <span>Animación & Rastreo de Movimiento</span>
                  </h3>
                  <p className="text-xs text-slate-500">Efectos dinámicos y control fotograma a fotograma</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Fotogramas clave (Keyframes):</strong> Anima rotación, opacidad, tamaño y posición suavemente.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Curvas de velocidad (Speed Ramping):</strong> Control cinematográfico de cámara lenta y acelerada.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Rastreo de movimiento (Motion Tracking):</strong> Sigue objetos en movimiento y ancla textos o gráficos.</span>
                </li>
              </ul>
            </div>

            {/* Tarjeta 3: Composición Visual & Mezcla Sonora */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>🎭</span>
                    <span>Composición Visual & Audio Pro</span>
                  </h3>
                  <p className="text-xs text-slate-500">Chroma key, máscaras y sonido envolvente</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                  <span><strong>Pantalla verde (Chroma Key):</strong> Remueve fondos verdes o de color sólido con acabado impecable.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                  <span><strong>Máscaras personalizables & Pantalla dividida:</strong> Muestra múltiples tomas simultáneas con composiciones artísticas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                  <span><strong>Mezcla de audio & Sincronización automática:</strong> Combina pistas sonoras y alinea audio externo al instante.</span>
                </li>
              </ul>
            </div>

            {/* Tarjeta 4: Corrección de Color & Grabador */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>🎨</span>
                    <span>Colorimetría, Títulos & Grabador</span>
                  </h3>
                  <p className="text-xs text-slate-500">LUTs 3D, tipografía animada y captura HD</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Gradación con LUTs 3D:</strong> Aplica estilos cinematográficos de películas famosas en un clic.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Titulación animada:</strong> Cientos de plantillas de texto 3D, tercios inferiores y créditos finales.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Grabador de pantalla integrado:</strong> Captura pantalla completa, cámara web y micrófono en alta resolución.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tarjeta de Descarga Directa con Marcador y Modal */}
        <FilmoraDownloadBox downloadUrl={DOWNLOAD_FILMORA_URL} />

        {/* Pasos Rápidos de Instalación */}
        <section className="space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Instrucciones Rápidas de Instalación
            </h2>
            <p className="text-slate-600 text-sm">
              Sigue estos 4 pasos sencillos para tener Filmora listo para editar en tu computadora:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-base">Descargar Archivo</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Haz clic en el botón de descarga para obtener el paquete comprimido <strong>Filmora.rar</strong> desde GitHub Releases.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-base">Descomprimir</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Usa WinRAR o 7-Zip para extraer el instalador en una carpeta de tu disco duro.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-base">Instalar</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Ejecuta el asistente de instalación y sigue las indicaciones en pantalla hasta completar el proceso.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-base">¡Comenzar a Crear!</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Abre Filmora y disfruta de una experiencia fluida de edición, exportación en 4K y efectos profesionales.
              </p>
            </div>
          </div>
        </section>

        {/* Requisitos del Sistema Recomendados */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span>Requisitos del Sistema Recomendados</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span><strong>Sistema Operativo:</strong> Windows 10 u 11 (64 bits)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span><strong>Procesador:</strong> Intel Core i3 / AMD Ryzen 3 (2 GHz o superior)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span><strong>Memoria RAM:</strong> 8 GB (16 GB recomendado para video HD y 4K)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span><strong>Gráficos:</strong> Intel HD Graphics 5000 / NVIDIA GeForce GTX 700 / AMD Radeon R5</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span><strong>Almacenamiento:</strong> 10 GB de espacio libre (se recomienda SSD)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span><strong>Pantalla:</strong> Resolución mínima 1280 x 768</span>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
