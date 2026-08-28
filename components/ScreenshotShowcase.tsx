'use client';

import { useState, useEffect } from 'react';
import { 
  Lock, 
  FilePlus, 
  LayoutDashboard, 
  Wallet, 
  ShoppingCart, 
  Maximize2,
  CheckCircle2,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ZoomIn
} from 'lucide-react';

interface SlideItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  icon: any;
  image: string;
  description: string;
  highlights: string[];
}

const slides: SlideItem[] = [
  {
    id: 'login',
    number: '01',
    title: 'Seguridad Multi-Usuario & Licencia Vitalicia',
    badge: 'Privacidad & Respaldos',
    icon: Lock,
    image: '/taller/login.png',
    description: 'Acceso seguro con roles diferidos para Administrador (Dueño) y Técnicos (Taller), respaldos de seguridad en 1 clic y licenciamiento vitalicio sin mensualidades.',
    highlights: [
      'RBAC: El técnico no puede ver las ganancias del negocio',
      'Licencia Vitalicia sin rentas mensuales ni cuotas ocultas',
      'Respaldos de seguridad locales en 1 clic (taller.db)',
      'Personalización con el logotipo oficial de tu negocio'
    ]
  },
  {
    id: 'nueva_orden',
    number: '02',
    title: 'Recepción de Equipos en 2 Minutos',
    badge: 'Proceso Guiado en 4 Pasos',
    icon: FilePlus,
    image: '/taller/nueva_orden.png',
    description: 'Registra la entrada del equipo capturando datos del cliente, patrón táctil de seguridad (3x3), PIN cifrado, fotos de fallas pre-existentes y firma digital táctil del cliente en pantalla.',
    highlights: [
      'Búsqueda predictiva de clientes registrados',
      'Grilla táctil interactiva para patrón de desbloqueo y PIN',
      'Evidencia fotográfica de rayones y daños previos',
      'Impresión de Ticket Térmico 80mm, Carta y Etiqueta Code 128'
    ]
  },
  {
    id: 'ordenes_kanban',
    number: '03',
    title: 'Tablero Visual Kanban & WhatsApp Web',
    badge: 'Control de Reparaciones',
    icon: LayoutDashboard,
    image: '/taller/ordenes_kanban.png',
    description: 'Gestiona el flujo de trabajo del taller por estados operativos (Recibidos, En Diagnóstico, Esperando Pieza, Saldos por Cobrar) y notifica avances a tus clientes por WhatsApp en 1 clic.',
    highlights: [
      'Métricas superiores de saldos pendientes por cobrar',
      'Filtro instantáneo por folio, cliente, marca o IMEI',
      'WhatsApp Web embebido con mensajes precargados',
      'Entrega de conformidad con firma digital y finiquito'
    ]
  },
  {
    id: 'punto_de_venta',
    number: '04',
    title: 'Punto de Venta (POS) e Inventario',
    badge: 'Venta de Accesorios & Repuestos',
    icon: ShoppingCart,
    image: '/taller/punto_de_venta.png',
    description: 'Vende cargadores, micas, cables y refacciones a máxima velocidad con soporte para pistola lectora de códigos de barras USB y descuento automático de inventario.',
    highlights: [
      'Lector de código de barras USB Plug & Play',
      'Fotografías de productos ultraligeras WebP (~15 KB)',
      'Calculadora de cambio integrada en pantalla',
      'Cancelación de venta con reabastecimiento automático'
    ]
  },
  {
    id: 'contabilidad',
    number: '05',
    title: 'Caja Chica & Arqueo de Efectivo Físico',
    badge: 'Contabilidad sin Descuadres',
    icon: Wallet,
    image: '/taller/contabilidad.png',
    description: 'Unifica todos los ingresos por anticipos, finiquitos y ventas POS contra los egresos por gastos operativos. Incluye desglose contable de billetes y monedas de $1 a $1000 MXN.',
    highlights: [
      'Balance neto en tiempo real (Ingresos vs Gastos)',
      'Registro de egresos por compras a proveedores y renta',
      'Arqueo de efectivo físico para evitar robos hormiga',
      'Exportación del libro diario contable a Excel'
    ]
  }
];

export default function ScreenshotShowcase() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  // Transición automática cada 5 segundos
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="space-y-8 bg-slate-100/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm relative">
      {/* Encabezado Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            Demostración Interactiva Automática
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explora la Interfaz de Sistema Taller v1.0
          </h2>
        </div>

        {/* Botones de Control: Atrás, Siguiente y Reproducir/Pausar */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-sm text-xs font-medium flex items-center gap-1.5"
            title={isPlaying ? 'Pausar reproducción automática' : 'Reanudar reproducción automática'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline">Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">Auto-play</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-300 shadow-sm">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-slate-600 px-3 font-mono">
              {currentIndex + 1} / {slides.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Diapositiva siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor Lado a Lado (Texto Izquierda | Captura Nítida Derecha) */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Columna Izquierda: Información del Módulo */}
        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg">
                Módulo {currentSlide.number}
              </span>
              <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-sm">
                {currentSlide.badge}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentSlide.title}
            </h3>
          </div>

          <p className="text-slate-600 text-base leading-relaxed">
            {currentSlide.description}
          </p>

          <div className="space-y-2.5">
            {currentSlide.highlights.map((h, hIdx) => (
              <div key={hIdx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                <div className="p-1 rounded-md bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => setSelectedImage({ url: currentSlide.image, title: currentSlide.title })}
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors group"
            >
              <span>Ver pantalla completa en Nitidez HD</span>
              <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Columna Derecha: Captura HD Nítida */}
        <div className="lg:col-span-7">
          <div 
            onClick={() => setSelectedImage({ url: currentSlide.image, title: currentSlide.title })}
            className="group bg-slate-900 rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-slate-800 cursor-pointer hover:shadow-indigo-500/10 transition-all duration-300"
          >
            {/* Header Ventana Desktop */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/90 rounded-xl mb-2 border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-slate-300 truncate max-w-[200px] sm:max-w-none">
                  Sistema Taller v1.0 — {currentSlide.title}
                </span>
              </div>
              <span className="text-[11px] text-indigo-300 font-semibold bg-indigo-900/60 px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-indigo-500/30">
                <ZoomIn className="w-3.5 h-3.5" /> Ampliar Nitidez
              </span>
            </div>

            {/* Imagen HD (Sin Forzar Ancho 100% que Deforme los Píxeles) */}
            <div className="bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center p-1 sm:p-2 border border-slate-800/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="max-w-full h-auto max-h-[500px] object-contain rounded-lg border border-slate-800 transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de Puntos */}
      <div className="flex items-center justify-center gap-2 pt-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 bg-indigo-600'
                : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Ir a la captura ${idx + 1}`}
          />
        ))}
      </div>

      {/* Lightbox Modal HD Sin Sobre-Estiramiento */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="w-full max-w-5xl flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-base sm:text-lg">
                {selectedImage.title}
              </span>
              <span className="text-xs text-indigo-300 bg-indigo-900/60 px-2.5 py-1 rounded-md border border-indigo-500/40 hidden sm:inline-block font-mono">
                Escala Real 1:1 (Nitidez Máxima)
              </span>
            </div>

            <button
              onClick={() => setSelectedImage(null)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-2 text-xs font-bold shadow-md"
            >
              <X className="w-5 h-5" />
              <span>Cerrar (ESC)</span>
            </button>
          </div>

          {/* Contenedor del Modal: Escala Nativa sin Estirar Píxeles */}
          <div 
            className="w-full max-w-5xl max-h-[85vh] overflow-auto bg-slate-900 rounded-2xl border border-slate-700 p-2 sm:p-6 shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-lg border border-slate-800"
              style={{ imageRendering: 'high-quality' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
