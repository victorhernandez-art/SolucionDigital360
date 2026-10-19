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
import Gym3DFeatureCards from '@/components/Gym3DFeatureCards';
import FixPosVsSaasComparison from '@/components/FixPosVsSaasComparison';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface SistemaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return sistemas.filter((s) => !s.proximamente).map((sistema) => ({
    slug: sistema.slug,
  }));
}

export async function generateMetadata({ params }: SistemaPageProps): Promise<Metadata> {
  const sistema = getSistemaBySlug(params.slug);
  if (!sistema || sistema.proximamente) {
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

  if (!sistema || sistema.proximamente) {
    notFound();
  }

  const whatsappMensaje = encodeURIComponent(
    `Hola, me interesa adquirir el "${sistema.nombre}". Quisiera más información sobre la compra y demostración.`
  );
  const whatsappUrl = `https://wa.me/529611209361?text=${whatsappMensaje}`;

  const isTallerSystem = sistema.slug === 'sistema-gestion-tecnicos';
  const isGymSystem = sistema.slug === 'sistema-gestion-gimnasios';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12 md:space-y-16 w-full">
        {/* Breadcrumb de regreso */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Volver al Inicio / Catálogo</span>
          </Link>
        </div>
        
        {/* Encabezado Principal y Hero */}
        <section className="space-y-6 text-center md:text-left max-w-4xl mx-auto md:mx-0">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            {sistema.esGratis ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Herramienta Gratuita
              </span>
            ) : !isTallerSystem ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                Sistema Profesional
              </span>
            ) : null}

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
            {!sistema.esGratis && (
            <div className="shrink-0 text-center md:text-right bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Único Pago</span>
              <div className="flex items-baseline justify-center md:justify-end gap-2 my-0.5">
                {sistema.precioAnterior && (
                  <span className="text-base text-slate-400 line-through font-semibold">
                    {sistema.precioAnterior}
                  </span>
                )}
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {sistema.precio}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block">Sin mensualidades ni rentas</span>
            </div>
          )}
        </div>

          {/* Texto Informativo de Prueba Gratuita & Listo para Usar */}
          <div className="space-y-4 my-6 text-slate-700 text-base leading-relaxed">
            {sistema.esGratis ? (
              <>
                <p>
                  <strong className="text-slate-900 font-semibold">{sistema.nombre}</strong> es un software profesional <strong className="text-slate-900 font-semibold">100% gratuito y sin costo</strong> desarrollado como un obsequio exclusivo por <strong className="text-slate-900 font-semibold">Solución Digital 360</strong> para ayudar a negocios, talleres y profesionales a formalizar sus presupuestos comerciales sin pagar costosas mensualidades.
                </p>

                <p>
                  Incluye todas las funciones completas: emite cotizaciones formales en PDF con el logotipo y datos fiscales de tu empresa, cálculo automático de impuestos / IVA por país, buscador en vivo de productos y servicios, clonación rápida de cotizaciones en 1 clic, exportación ejecutiva a Excel (.xlsx) con fórmulas dinámicas, y conexión multi-dispositivo por Wi-Fi mediante código QR.
                </p>

                <p>
                  La gran ventaja es que <strong className="text-slate-900 font-semibold">todo viene listo para usar</strong>: no necesitas configurar servidores, instalar XAMPP ni bases de datos complicadas. Simplemente descargas el instalador oficial, lo ejecutas en tu computadora con Windows y comienzas a cotizar de inmediato.
                </p>
              </>
            ) : isTallerSystem ? (
              <>
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Prueba FixPOS Pro Gratis por 7 Días con todas sus funciones habilitadas.
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base font-medium">
                    Sin tarjeta de crédito, sin compromisos y con la posibilidad de conservar todos tus registros al activar tu licencia definitiva.
                  </p>
                </div>

                <p>
                  Evalúa el sistema directamente desde tu computadora con una <strong className="text-slate-900 font-semibold">prueba gratuita de 7 días con todas las funciones activas</strong> antes de adquirir la licencia. Puedes realizar operaciones con registros reales, capturar clientes, registrar reparaciones, usar el punto de venta y hasta imprimir tickets para que compruebes que se adapta al 100% a tus necesidades.
                </p>

                <p>
                  La gran ventaja es que <strong className="text-slate-900 font-semibold">todo viene listo para usar</strong>: no necesitas configurar servidores, instalar bases de datos ni realizar procesos técnicos complicados. Simplemente instalas el sistema, ingresas tu clave de prueba y comienzas a trabajar de inmediato.
                </p>
              </>
            ) : (
              <>
                <p>
                  Primero puedes probar el sistema directamente desde tu computadora con una <strong className="text-slate-900 font-semibold">prueba gratuita de 7 días con todas las funciones activas</strong> antes de adquirir la licencia. Puedes realizar operaciones con registros reales, capturar clientes, gestionar membresías o servicios, usar el punto de venta y hasta imprimir tickets para que compruebes que se adapta al 100% a tus necesidades.
                </p>

                <p>
                  Si el sistema cumple con tus expectativas y te convence su funcionamiento, se activa tu licencia vitalicia definitiva conservando todos tus datos intactos.
                </p>

                <p>
                  La gran ventaja es que <strong className="text-slate-900 font-semibold">todo viene listo para usar</strong>: no necesitas configurar servidores, instalar bases de datos ni realizar procesos técnicos complicados. Simplemente instalas el sistema, ingresas tu clave de prueba y comienzas a trabajar de inmediato.
                </p>
              </>
            )}
          </div>

          {!sistema.esGratis && (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-600/20 transition-all text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Solicitar Prueba de 7 Días</span>
              </a>
              <a
                href="#adquirir"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-all text-sm shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                <span>Ver Formas de Pago</span>
              </a>
            </div>
          )}</section>

        {/* MUESTRA INTERACTIVA DE CAPTURAS DE PANTALLA REALES (SOLO TALLER) */}
        {isTallerSystem && (
          <>
            <ScreenshotShowcase />
            <SupportedCategories />
            <LanAndRolesSection />
            <CurrencySelector systemName={sistema.nombre} />
          </>
        )}

        {/* COBERTURA MULTIMONEDA Y PAÍSES INTERACTIVA (GIMNASIO) */}
        {isGymSystem && (
          <>
            <Gym3DFeatureCards isDetailPage={true} />
            <CurrencySelector systemName="GymWeb" isGym={true} />
          </>
        )}

        {/* DEMOSTRACIÓN EN VIDEO Y CANAL OFICIAL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Demostraciones y Tutoriales en Video
            </h2>
            <span className="text-xs text-slate-500">Canal Oficial de YouTube</span>
          </div>
          <YoutubeEmbed
            videoId={sistema.videoYoutubeId}
            channelUrl={sistema.canalYoutubeUrl}
            title={`Demostración y Canal de YouTube de ${sistema.nombre}`}
          />
        </section>

        {/* TABLA COMPARATIVA ESTRATÉGICA: FIXPOS PRO VS SAAS (SOLO TALLER) */}
        {isTallerSystem && (
          <FixPosVsSaasComparison />
        )}

        {/* SECCIÓN: EL PROBLEMA QUE RESUELVE */}
        <section className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
          {/* Barra lateral de acento */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-red-500" />

          <div className="pl-6 pr-6 py-6 sm:pl-8 sm:pr-8 sm:py-7 space-y-3">
            {/* Etiqueta */}
            <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>El Problema que Resuelve</span>
            </div>

            {/* Texto del problema */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
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
            {sistema.funciones.map((funcion, index) => {
              const colonIndex = funcion.indexOf(': ');
              const hasSplit = colonIndex !== -1;
              const title = hasSplit ? funcion.substring(0, colonIndex) : `Módulo ${index + 1}`;
              const description = hasSplit ? funcion.substring(colonIndex + 2) : funcion;

              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
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

        {/* TARJETA CTA CON INFORMACIÓN DE PRECIOS, DESCARGAS Y BOTONES */}
        <DownloadCtaCard
          sistemaSlug={sistema.slug}
          sistemaNombre={sistema.nombre}
          whatsappUrl={whatsappUrl}
          isTallerSystem={isTallerSystem}
          megaLink="https://mega.nz"
          downloadUrl={sistema.downloadUrl}
          esGratis={sistema.esGratis}
        />

      </main>

      <Footer />
    </div>
  );
}
