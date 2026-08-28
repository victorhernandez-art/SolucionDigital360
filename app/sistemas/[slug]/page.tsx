import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle, 
  AlertTriangle, 
  Terminal, 
  MessageSquare, 
  ShoppingBag, 
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Zap,
  WifiOff,
  QrCode,
  Lock,
  Printer,
  XCircle,
  CheckCircle2,
  PhoneCall,
  Download,
  ExternalLink
} from 'lucide-react';
import { sistemas, getSistemaBySlug } from '@/data/sistemas';
import FaqAccordion from '@/components/FaqAccordion';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import ScreenshotShowcase from '@/components/ScreenshotShowcase';
import CurrencySelector from '@/components/CurrencySelector';
import SupportedCategories from '@/components/SupportedCategories';
import LanAndRolesSection from '@/components/LanAndRolesSection';
import DownloadCtaCard from '@/components/DownloadCtaCard';
import DemoDownloadButton from '@/components/DemoDownloadButton';

interface SistemaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return sistemas.map((sistema) => ({
    slug: sistema.slug,
  }));
}

export async function generateMetadata({ params }: SistemaPageProps): Promise<Metadata> {
  const sistema = getSistemaBySlug(params.slug);
  if (!sistema) {
    return {
      title: 'Sistema no encontrado | Solución Digital 360',
    };
  }

  return {
    title: `${sistema.nombre} | Solución Digital 360`,
    description: sistema.descripcionCorta,
  };
}

export default function SistemaDetailPage({ params }: SistemaPageProps) {
  const { slug } = params;
  const sistema = getSistemaBySlug(slug);

  if (!sistema) {
    notFound();
  }

  const whatsappMensaje = encodeURIComponent(
    `Hola, me interesa adquirir el "${sistema.nombre}". Quisiera más información sobre la compra y demostración.`
  );
  const whatsappUrl = `https://wa.me/529611209361?text=${whatsappMensaje}`;

  const isTallerSystem = sistema.slug === 'sistema-gestion-tecnicos';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header de Navegación con Logotipo Oficial */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 sm:w-12">
              <Image
                src="/logo.png"
                alt="Solución Digital 360"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
              Solución Digital <span className="text-blue-600">360</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14 md:space-y-20">
        
        {/* Encabezado Principal y Hero */}
        <section className="space-y-6 text-center md:text-left max-w-4xl mx-auto md:mx-0">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            {sistema.esGratis ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Herramienta Gratuita
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                Sistema SaaS Profesional
              </span>
            )}

            {isTallerSystem && (
              <>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <WifiOff className="w-3.5 h-3.5" /> 100% Offline
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <QrCode className="w-3.5 h-3.5" /> Red LAN & QR
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  <Lock className="w-3.5 h-3.5" /> Licencia Vitalicia
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {sistema.nombre}
            </h1>
            <div className="shrink-0 text-center md:text-right bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Inversión Única</span>
              <span className="text-3xl font-extrabold text-indigo-600 tracking-tight">
                {sistema.precio}
              </span>
              <span className="text-[11px] text-slate-500 block">Sin mensualidades ni rentas</span>
            </div>
          </div>

          {/* Texto Informativo de Prueba Demo Gratis & Listo para Usar (Sin recuadro) */}
          <div className="space-y-4 my-6 text-slate-700 text-base leading-relaxed">
            <p>
              Primero puedes probar el sistema directamente desde tu computadora y conocer todas sus funciones antes de adquirir la licencia. <strong className="text-slate-900 font-semibold">Puedes realizar pruebas con registros reales, capturar información, realizar operaciones y hasta imprimir tickets</strong>, para que conozcas de primera mano cómo funciona y compruebes que se adapta a tus necesidades.
            </p>

            <p>
              Si el sistema cumple con tus expectativas y te convence su funcionamiento, se activa tu licencia.
            </p>

            <p>
              La gran ventaja es que <strong className="text-slate-900 font-semibold">todo viene listo para usar</strong>: no necesitas configurar servidores, instalar bases de datos ni realizar procesos técnicos complicados. Simplemente instalas el sistema, lo ejecutas y comienzas a trabajar.
            </p>
          </div>

          {/* Quick CTA Buttons Header */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Demo por WhatsApp</span>
            </a>
            <a
              href="#adquirir"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-all text-sm shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>Ver Formas de Pago</span>
            </a>
          </div>
        </section>

        {/* MUESTRA INTERACTIVA DE CAPTURAS DE PANTALLA REALES (SOLO TALLER) */}
        {isTallerSystem && (
          <>
            <ScreenshotShowcase />
            <SupportedCategories />
            <LanAndRolesSection />
            <CurrencySelector />
          </>
        )}

        {/* DEMOSTRACIÓN EN VIDEO */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Video de Funcionamiento Oficial
            </h2>
            <span className="text-xs text-slate-500">Demostración en tiempo real</span>
          </div>
          <YoutubeEmbed
            videoId={sistema.videoYoutubeId}
            title={`Demostración en video de ${sistema.nombre}`}
          />
        </section>

        {/* COMPARACIÓN: EL CAOS TRADICIONAL VS LA SOLUCIÓN TALLER V1.0 */}
        {isTallerSystem && (
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ¿Por qué los Talleres Eligen Sistema Taller v1.0?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Compara el método manual de notas de papel frente a la automatización digital completa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tarjeta 1: El Caos Tradicional */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-lg">
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <span>El Caos Tradicional (Papel / Excel)</span>
                </div>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Tickets de papel extraviados y clientes molestos por desorganización.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Reclamos por rayones o fallas no especificadas en la recepción inicial.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Cobros mensuales recurrentes en programas en la nube que fallan sin internet.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>Descuadres en caja chica y falta de claridad en las ganancias reales.</span>
                  </li>
                </ul>
              </div>

              {/* Tarjeta 2: Con Sistema Taller v1.0 */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Con Sistema Taller v1.0 (Digital 360)</span>
                </div>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Recepción en 2 min con firma digital táctil y patrón de desbloqueo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Fotos de evidencia previa e impresión de etiquetas con Código de Barras (Code 128).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>100% Offline y Licencia Vitalicia (0 mensualidades). Conexión LAN por Código QR.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>WhatsApp Web embebido en 1 clic y arqueo exacto de monedas y billetes.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN: EL PROBLEMA QUE RESUELVE */}
        <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-lg">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <span>El Problema Específico que Soluciona</span>
            </div>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal max-w-4xl">
              {sistema.problemaQueResuelve}
            </p>
          </div>
        </section>

        {/* SECCIÓN: FUNCIONES Y MÓDULOS PRINCIPALES */}
        <section className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Módulos y Funciones Incluidas
            </h2>
            <p className="text-slate-600">
              Desglose detallado de las capacidades operativas del sistema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sistema.funciones.map((funcion, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                    Módulo {index + 1}
                  </span>
                  <h3 className="font-semibold text-slate-900 text-base leading-snug">
                    {funcion}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN: REQUISITOS TÉCNICOS */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="p-3 bg-slate-900 rounded-xl text-white">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Requisitos de Instalación e Infraestructura</h2>
              <p className="text-xs text-slate-500">Compatibilidad técnica garantizada</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sistema.requisitos.map((requisito, index) => (
              <div key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm sm:text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <span>{requisito}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN: PREGUNTAS FRECUENTES (FAQ) */}
        <section className="space-y-6">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-600">
              Respuestas claras sobre la licencia vitalicia, instalación y soporte técnico.
            </p>
          </div>

          <FaqAccordion items={sistema.faq} />
        </section>

        {/* TARJETA CTA CON MARCADOR DE DESCARGAS REALIZADAS Y BOTONES */}
        <DownloadCtaCard
          sistemaNombre={sistema.nombre}
          whatsappUrl={whatsappUrl}
          isTallerSystem={isTallerSystem}
          megaLink="https://mega.nz"
        />

      </main>

      <footer className="border-t border-slate-200 bg-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 space-y-2">
          <p>© {new Date().getFullYear()} Solución Digital 360. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
