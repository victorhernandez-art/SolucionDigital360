'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Users, 
  Wifi, 
  Layers
} from 'lucide-react';

export interface GymFeatureCard {
  id: string;
  tag: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  alt: string;
  icon: typeof Sparkles;
  accent: string;
  glowColor: string;
}

const gymFeatures: GymFeatureCard[] = [
  {
    id: 'login',
    tag: 'UI & Acceso Moderno',
    title: 'Pantalla de Acceso Glassmorphism',
    badge: 'Nuevo Login v2.6.3',
    description: 'Autenticación corporativa premium con fondo fotográfico ambiental, diseño translúcido glassmorphism y seguridad encriptada multi-usuario.',
    image: '/gym/gym-login.png',
    alt: 'Pantalla de Acceso y Login Glassmorphism en GymWeb',
    icon: ShieldCheck,
    accent: 'from-cyan-500 via-teal-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.45)'
  },
  {
    id: 'socios',
    tag: 'Gestión Comercial & Cobranza',
    title: 'Directorio y Control de Socios',
    badge: 'WhatsApp & Deudores',
    description: 'Panel de socios con filtro en vivo de cuentas por cobrar ($ saldo deudor), difusiones masivas por WhatsApp, fichas y exportación directa a Excel.',
    image: '/gym/gym-socios.png',
    alt: 'Directorio y Control de Socios con WhatsApp y Excel en GymWeb',
    icon: Users,
    accent: 'from-emerald-500 via-teal-500 to-cyan-600',
    glowColor: 'rgba(16, 185, 129, 0.45)'
  },
  {
    id: 'red-lan',
    tag: 'Conectividad Multi-Dispositivo',
    title: 'Servidor Red Local (LAN) & QR',
    badge: '100% Offline / Wi-Fi',
    description: 'Conexión simultánea desde celulares Android e iOS escaneando un código QR. Opera y cobra en tiempo real sin requerir internet.',
    image: '/gym/gym-red-lan.png',
    alt: 'Servidor de Red Local LAN y Código QR en GymWeb',
    icon: Wifi,
    accent: 'from-blue-600 via-indigo-600 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.45)'
  }
];

interface Gym3DFeatureCardsProps {
  isDetailPage?: boolean;
}

export default function Gym3DFeatureCards({ isDetailPage = false }: Gym3DFeatureCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<GymFeatureCard | null>(null);

  const activeFeature = gymFeatures[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % gymFeatures.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + gymFeatures.length) % gymFeatures.length);
  };

  return (
    <div className={`mt-5 pt-4 border-t border-slate-100 ${isDetailPage ? 'bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm' : ''}`}>
      {/* Header destacado: Nuevas funciones implementadas */}
      <div className="flex items-center justify-between mb-3.5 gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 text-cyan-900 text-xs font-bold shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="tracking-tight text-slate-900 font-extrabold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            Nuevas Funciones Implementadas
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
          3D Showcase
        </span>
      </div>

      {/* Escenario 3D interactivo estilo baraja / cartas */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-[#0b1329] to-slate-950 p-4 sm:p-5 overflow-hidden border border-slate-800 shadow-xl group/stage">
        {/* Luces ambientales en el fondo */}
        <div 
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-500"
          style={{ background: activeFeature.glowColor }}
        />
        <div 
          className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
          style={{ background: activeFeature.glowColor }}
        />

        {/* Mini etiquetas de estado */}
        <div className="relative z-10 flex items-center justify-between text-[11px] mb-3 text-slate-300">
          <div className="flex items-center gap-1.5">
            <activeFeature.icon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-cyan-300">{activeFeature.tag}</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-[10px] font-bold border border-white/10">
            {activeIndex + 1} / {gymFeatures.length}
          </span>
        </div>

        {/* Baraja 3D de Cartas */}
        <div className="relative h-48 sm:h-56 w-full flex items-center justify-center my-2 [perspective:1000px] select-none">
          {gymFeatures.map((feature, idx) => {
            const isCurrent = idx === activeIndex;
            const diff = (idx - activeIndex + gymFeatures.length) % gymFeatures.length;
            
            // Posiciones en el abanico 3D según distancia al activo
            let transformClass = '';
            let zIndex = 10;
            let opacity = 'opacity-60 hover:opacity-100';

            if (diff === 0) {
              // Carta frontal activa
              transformClass = 'translate-x-0 translate-y-0 scale-100 rotate-0 [transform:translateZ(40px)]';
              zIndex = 30;
              opacity = 'opacity-100';
            } else if (diff === 1) {
              // Carta derecha
              transformClass = 'translate-x-6 sm:translate-x-10 translate-y-2 scale-90 rotate-6 sm:rotate-8 [transform:translateZ(10px)]';
              zIndex = 20;
            } else {
              // Carta izquierda
              transformClass = '-translate-x-6 sm:-translate-x-10 translate-y-2 scale-90 -rotate-6 sm:-rotate-8 [transform:translateZ(10px)]';
              zIndex = 15;
            }

            return (
              <div
                key={feature.id}
                onClick={() => setActiveIndex(idx)}
                className={`absolute w-[86%] sm:w-[82%] max-w-[340px] aspect-[16/10] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border-2 ${
                  isCurrent 
                    ? 'border-cyan-400 shadow-[0_12px_30px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400/30' 
                    : 'border-slate-700/80 shadow-md hover:border-slate-500'
                } ${transformClass} ${opacity}`}
                style={{ zIndex }}
              >
                {/* Imagen del Sistema */}
                <div className="relative w-full h-full bg-slate-900 group/card">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority={idx === 0}
                  />

                  {/* Gradiente protector para texto de la carta */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Badge flotante de la carta */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{feature.badge}</span>
                  </div>

                  {/* Botón de Zoom en la carta activa */}
                  {isCurrent && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalImage(feature);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-600 text-white border border-white/20 backdrop-blur-md transition-all shadow-md hover:scale-110"
                      title="Ver captura en pantalla completa"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Título en la base de la carta */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-left">
                    <p className="text-white font-bold text-xs sm:text-sm drop-shadow-md truncate">
                      {feature.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de navegación y descripción interactiva */}
        <div className="relative z-10 pt-2 space-y-2.5">
          {/* Título y descripción de la función seleccionada */}
          <div className="text-left bg-slate-900/80 rounded-xl p-2.5 sm:p-3 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">{activeFeature.title}</span>
              </h4>
              <button
                type="button"
                onClick={() => setModalImage(activeFeature)}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 shrink-0"
              >
                <span>Ampliar</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-2">
              {activeFeature.description}
            </p>
          </div>

          {/* Selector de Cartas Interactivas (3 Botones / Tabs) */}
          <div className="flex items-center justify-between gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors shrink-0"
              aria-label="Función anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 flex-1">
              {gymFeatures.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex-1 max-w-[105px] py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center truncate ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-400/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {index === 0 ? '1. Login 3D' : index === 1 ? '2. Socios & WA' : '3. Red LAN QR'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors shrink-0"
              aria-label="Siguiente función"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Lightbox de Pantalla Completa para Inspección de Alta Resolución */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {modalImage.title}
                  </h3>
                  <p className="text-[11px] text-cyan-300 font-medium">
                    {modalImage.tag} • {modalImage.badge}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors border border-slate-700"
                aria-label="Cerrar vista completa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen en Alta Resolución */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden">
              <Image
                src={modalImage.image}
                alt={modalImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Pie del Modal con Explicación Detallada */}
            <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {modalImage.description}
              </p>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700 self-end sm:self-auto shrink-0"
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
