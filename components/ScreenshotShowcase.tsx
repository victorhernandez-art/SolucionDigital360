'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TallerFeatureCard {
  id: string;
  tag: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  alt: string;
}

const tallerFeatures: TallerFeatureCard[] = [
  {
    id: 'nueva_orden',
    tag: 'Recepción & Blindaje',
    title: 'Recepción de Equipos en 4 Pasos',
    badge: 'Recepción & Diagnóstico',
    description: 'Registro guiado de órdenes en 2 minutos: Datos del cliente, Información del equipo, Diagnóstico previo con checklist y Resumen financiero en tiempo real.',
    image: '/taller/nueva_orden.png',
    alt: 'Nueva Orden de Servicio en FixPOS Pro'
  },
  {
    id: 'punto_de_venta',
    tag: 'Punto de Venta & Refacciones',
    title: 'Punto de Venta (POS) y Control de Ventas',
    badge: 'Punto de Venta con Carrito',
    description: 'Catálogo visual de accesorios, refacciones y cables con stock en vivo, carrito interactivo de cobro ($8,400.00 MXN) y compatibilidad con lector de código de barras.',
    image: '/taller/punto_de_venta.png',
    alt: 'Punto de Venta POS y Carrito en FixPOS Pro'
  },
  {
    id: 'contabilidad',
    tag: 'Finanzas & Arqueo',
    title: 'Contabilidad, Flujo de Caja & Costos COGS',
    badge: 'Auditoría & Corte Z',
    description: 'Control de ingresos brutos, costos directos de repuestos (COGS), gastos operativos y utilidad neta real ($2,400.00 MXN) con arqueo físico de caja ($9,850.00 MXN).',
    image: '/taller/contabilidad.png',
    alt: 'Contabilidad y Flujo de Caja en FixPOS Pro'
  },
  {
    id: 'red_lan',
    tag: 'Conectividad & Móvil',
    title: 'Servidor de Red Local (LAN) & Código QR',
    badge: 'Acceso Wi-Fi Móvil & PWA',
    description: 'Conexión simultánea desde teléfonos y tablets escaneando el código QR interactivo (puerto 3000). Opera 100% en red local Wi-Fi sin depender de internet.',
    image: '/taller/red_lan.png',
    alt: 'Servidor Red Local LAN y Código QR en FixPOS Pro'
  },
  {
    id: 'login',
    tag: 'Seguridad & Acceso',
    title: 'Inicio de Sesión & Licenciamiento Vitalicio',
    badge: 'Roles Dueño y Técnico',
    description: 'Autenticación segura con credenciales diferenciadas para Administrador (Dueño) y Técnicos (privacidad financiera), con blindaje de base de datos local y licencia vitalicia.',
    image: '/taller/login.png',
    alt: 'Inicio de Sesión y Roles RBAC en FixPOS Pro'
  }
];

export default function ScreenshotShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<TallerFeatureCard | null>(null);

  const activeFeature = tallerFeatures[activeIndex];

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCardClick = (clickedIndex: number) => {
    if (clickedIndex === activeIndex) {
      // Si hace clic en la carta frontal, pasa fluidamente a la siguiente
      setActiveIndex((prev) => (prev + 1) % tallerFeatures.length);
    } else {
      // Si hace clic en una carta lateral, la trae al frente
      setActiveIndex(clickedIndex);
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % tallerFeatures.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? tallerFeatures.length - 1 : prev - 1));
  };

  return (
    <div className="w-full select-none max-w-5xl mx-auto py-6 md:py-8">
      {/* Encabezado elegante */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-1 sm:px-2">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-600" />
          <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Capturas Reales de FixPOS Pro
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-medium text-slate-500 mr-1 hidden sm:inline">
            Clic para pasar ({activeIndex + 1}/{tallerFeatures.length})
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Anterior captura"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Siguiente captura"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Escenario 3D con capturas nítidas 100% visibles (SIN capas ni desvanecidos oscuros) */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] lg:h-[580px] flex items-center justify-center [perspective:1400px]">
        {tallerFeatures.map((feature, idx) => {
          const isCurrent = idx === activeIndex;

          // Cálculo circular de offset (-2, -1, 0, 1, 2)
          let offset = (idx - activeIndex + tallerFeatures.length) % tallerFeatures.length;
          if (offset > Math.floor(tallerFeatures.length / 2)) {
            offset -= tallerFeatures.length;
          }

          let transformStyle = '';
          let zIndex = 10;
          let opacity = 'opacity-0 pointer-events-none';

          if (offset === 0) {
            // Carta activa al frente, centrada y en tamaño protagonista
            transformStyle = 'translate-x-0 translate-y-0 scale-100 rotate-0 [transform:translateZ(50px)]';
            zIndex = 30;
            opacity = 'opacity-100';
          } else if (offset === 1) {
            // Carta derecha en perspectiva
            transformStyle = 'translate-x-12 sm:translate-x-24 md:translate-x-36 translate-y-3 md:translate-y-4 scale-[0.88] rotate-6 sm:rotate-7 [transform:translateZ(10px)]';
            zIndex = 20;
            opacity = 'opacity-65 hover:opacity-90';
          } else if (offset === -1) {
            // Carta izquierda en perspectiva
            transformStyle = '-translate-x-12 sm:-translate-x-24 md:-translate-x-36 translate-y-3 md:translate-y-4 scale-[0.88] -rotate-6 sm:-rotate-7 [transform:translateZ(10px)]';
            zIndex = 20;
            opacity = 'opacity-65 hover:opacity-90';
          } else if (offset === 2) {
            // Carta lejana derecha
            transformStyle = 'translate-x-20 sm:translate-x-36 md:translate-x-56 translate-y-6 md:translate-y-8 scale-[0.76] rotate-12 [transform:translateZ(-30px)]';
            zIndex = 10;
            opacity = 'opacity-0 sm:opacity-35 hover:opacity-70';
          } else if (offset === -2) {
            // Carta lejana izquierda
            transformStyle = '-translate-x-20 sm:-translate-x-36 md:-translate-x-56 translate-y-6 md:translate-y-8 scale-[0.76] -rotate-12 [transform:translateZ(-30px)]';
            zIndex = 10;
            opacity = 'opacity-0 sm:opacity-35 hover:opacity-70';
          }

          return (
            <div
              key={feature.id}
              onClick={() => handleCardClick(idx)}
              className={`absolute w-[92%] sm:w-[86%] md:w-[82%] max-w-[820px] aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border-2 ${
                isCurrent
                  ? 'border-cyan-400 shadow-[0_16px_45px_rgba(6,182,212,0.45)] ring-2 md:ring-4 ring-cyan-400/30'
                  : 'border-slate-800 shadow-xl hover:border-cyan-500/60'
              } ${transformStyle} ${opacity}`}
              style={{ zIndex }}
            >
              {/* Contenedor limpio: SIN CAPA OSCURA NI GRADIENTE SUPERPUESTO */}
              <div className="relative w-full h-full bg-slate-900 group/card">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-contain sm:object-cover object-top transition-transform duration-500 group-hover/card:scale-102"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority={idx === 0}
                />

                {/* Badge flotante en esquina superior izquierda */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 font-bold text-white flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{feature.badge}</span>
                </div>

                {/* Botón para ampliar captura en alta resolución */}
                {isCurrent && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage(feature);
                    }}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-xl bg-slate-950/85 hover:bg-cyan-600 text-white border border-white/20 backdrop-blur-md transition-all shadow-lg hover:scale-110"
                    title="Ampliar captura en pantalla completa"
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detalle del Módulo Activo: claro, legible y sin tapar la captura */}
      <div className="text-center mt-4 sm:mt-6 px-4 max-w-2xl mx-auto transition-all duration-300">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200 mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>{activeFeature.tag} • Módulo {activeIndex + 1} de {tallerFeatures.length}</span>
        </div>
        <h4 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {activeFeature.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          {activeFeature.description}
        </p>
      </div>

      {/* Indicadores de navegación interactivos (Pills/Dots) */}
      <div className="flex items-center justify-center gap-2.5 mt-4">
        {tallerFeatures.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex 
                ? 'w-10 sm:w-12 h-2.5 bg-cyan-500 shadow-sm shadow-cyan-500/50' 
                : 'w-3 h-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Ver captura ${i + 1}`}
          />
        ))}
      </div>

      {/* Modal / Lightbox de Pantalla Completa (100% Nítido y Limpio) */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {modalImage.title}
                  </h3>
                  <p className="text-xs text-cyan-300 font-medium">
                    {modalImage.tag} • {modalImage.badge}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors border border-slate-700"
                aria-label="Cerrar vista completa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen en Alta Resolución sin filtros */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden">
              <Image
                src={modalImage.image}
                alt={modalImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1400px) 100vw, 1400px"
                priority
              />
            </div>

            {/* Pie del Modal con Explicación Detallada */}
            <div className="p-5 sm:p-6 bg-slate-950/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {modalImage.description}
              </p>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-colors border border-slate-700 self-end sm:self-auto shrink-0"
              >
                Cerrar Vista
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
