'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, Sparkles } from 'lucide-react';

export interface GymFeatureCard {
  id: string;
  tag: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  alt: string;
}

const gymFeatures: GymFeatureCard[] = [
  {
    id: 'login',
    tag: 'UI & Acceso Moderno',
    title: 'Pantalla de Acceso Glassmorphism',
    badge: 'Nuevo Login v2.6.3',
    description: 'Autenticación corporativa moderna con fondo fotográfico ambiental, diseño translúcido glassmorphism y seguridad encriptada multi-usuario.',
    image: '/gym/gym-login.png',
    alt: 'Pantalla de Acceso y Login Glassmorphism en GymWeb'
  },
  {
    id: 'socios',
    tag: 'Gestión Comercial & Cobranza',
    title: 'Directorio y Control de Socios',
    badge: 'WhatsApp & Deudores',
    description: 'Panel de socios con filtro en vivo de cuentas por cobrar ($ saldo deudor), difusiones masivas por WhatsApp, estados de cuenta y exportación directa a Excel.',
    image: '/gym/gym-socios.png',
    alt: 'Directorio y Control de Socios con WhatsApp y Excel en GymWeb'
  },
  {
    id: 'red-lan',
    tag: 'Conectividad Multi-Dispositivo',
    title: 'Servidor Red Local (LAN) & QR',
    badge: '100% Offline / Wi-Fi',
    description: 'Conexión simultánea desde celulares Android e iOS escaneando un código QR interactivo. Registra visitas, consulta reportes y cobra en tiempo real sin requerir internet.',
    image: '/gym/gym-red-lan.png',
    alt: 'Servidor de Red Local LAN y Código QR en GymWeb'
  }
];

interface Gym3DFeatureCardsProps {
  isDetailPage?: boolean;
}

export default function Gym3DFeatureCards({ isDetailPage = false }: Gym3DFeatureCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<GymFeatureCard | null>(null);

  const activeFeature = gymFeatures[activeIndex];

  const handleCardClick = (clickedIndex: number) => {
    if (clickedIndex === activeIndex) {
      // Si hace clic en la carta frontal, pasa fluidamente a la siguiente
      setActiveIndex((prev) => (prev + 1) % gymFeatures.length);
    } else {
      // Si hace clic en una carta lateral, la trae al frente
      setActiveIndex(clickedIndex);
    }
  };

  return (
    <div className={`w-full select-none ${isDetailPage ? 'max-w-5xl mx-auto py-6 md:py-8' : 'my-3'}`}>
      {/* Encabezado elegante y espacioso */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-1 sm:px-2">
        <div className="inline-flex items-center gap-2">
          <Sparkles className={`${isDetailPage ? 'w-5 h-5 text-cyan-600' : 'w-3.5 h-3.5 text-cyan-600'}`} />
          <h3 className={`${isDetailPage ? 'text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight' : 'text-xs sm:text-sm font-bold text-slate-800'}`}>
            Nuevas Funciones Implementadas
          </h3>
        </div>
        <span className={`${isDetailPage ? 'text-xs sm:text-sm font-medium text-slate-500' : 'text-[11px] font-semibold text-slate-400'}`}>
          Clic para pasar ({activeIndex + 1}/{gymFeatures.length})
        </span>
      </div>

      {/* Escenario 3D Amplio y Proporcional sin marco de fondo */}
      <div className={`relative w-full ${isDetailPage ? 'h-[360px] sm:h-[460px] md:h-[540px] lg:h-[580px]' : 'h-60 sm:h-72'} flex items-center justify-center [perspective:1400px]`}>
        {gymFeatures.map((feature, idx) => {
          const isCurrent = idx === activeIndex;
          const diff = (idx - activeIndex + gymFeatures.length) % gymFeatures.length;

          // Posicionamiento 3D estilo baraja / cartas a gran escala
          let transformStyle = '';
          let zIndex = 10;
          let opacity = 'opacity-65 hover:opacity-90';

          if (diff === 0) {
            // Carta activa al frente, centrada y en tamaño protagonista
            transformStyle = 'translate-x-0 translate-y-0 scale-100 rotate-0 [transform:translateZ(50px)]';
            zIndex = 30;
            opacity = 'opacity-100';
          } else if (diff === 1) {
            // Carta derecha en perspectiva
            transformStyle = isDetailPage
              ? 'translate-x-12 sm:translate-x-24 md:translate-x-36 translate-y-3 md:translate-y-4 scale-[0.88] rotate-6 sm:rotate-7 [transform:translateZ(10px)]'
              : 'translate-x-7 sm:translate-x-12 translate-y-2 scale-[0.88] rotate-6 [transform:translateZ(10px)]';
            zIndex = 20;
          } else {
            // Carta izquierda en perspectiva
            transformStyle = isDetailPage
              ? '-translate-x-12 sm:-translate-x-24 md:-translate-x-36 translate-y-3 md:translate-y-4 scale-[0.88] -rotate-6 sm:-rotate-7 [transform:translateZ(10px)]'
              : '-translate-x-7 sm:-translate-x-12 translate-y-2 scale-[0.88] -rotate-6 [transform:translateZ(10px)]';
            zIndex = 15;
          }

          return (
            <div
              key={feature.id}
              onClick={() => handleCardClick(idx)}
              className={`absolute ${
                isDetailPage 
                  ? 'w-[92%] sm:w-[86%] md:w-[82%] max-w-[820px]' 
                  : 'w-[88%] sm:w-[84%] max-w-[420px]'
              } aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border-2 ${
                isCurrent
                  ? 'border-cyan-400 shadow-[0_16px_45px_rgba(6,182,212,0.45)] ring-2 md:ring-4 ring-cyan-400/30'
                  : 'border-slate-800 shadow-xl hover:border-cyan-500/60'
              } ${transformStyle} ${opacity}`}
              style={{ zIndex }}
            >
              <div className="relative w-full h-full bg-slate-950 group/card">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority={idx === 0}
                />

                {/* Sombra gradiente inferior protectora para lectura perfecta */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />

                {/* Badge en esquina superior izquierda */}
                <div className={`absolute ${isDetailPage ? 'top-4 left-4 px-3.5 py-1.5 text-xs sm:text-sm' : 'top-2.5 left-2.5 px-2.5 py-1 text-[10px] sm:text-[11px]'} rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 font-bold text-white flex items-center gap-2 shadow-lg`}>
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
                    className={`absolute ${isDetailPage ? 'top-4 right-4 p-2.5' : 'top-2.5 right-2.5 p-1.5'} rounded-xl bg-slate-950/85 hover:bg-cyan-600 text-white border border-white/20 backdrop-blur-md transition-all shadow-lg hover:scale-110`}
                    title="Ampliar captura en pantalla completa"
                  >
                    <Maximize2 className={`${isDetailPage ? 'w-5 h-5' : 'w-3.5 h-3.5'}`} />
                  </button>
                )}

                {/* Título en la base de la carta en gran formato */}
                <div className={`absolute ${isDetailPage ? 'bottom-5 left-5 right-5' : 'bottom-3 left-3.5 right-3.5'} text-left`}>
                  <p className={`text-white font-black drop-shadow-xl truncate ${
                    isDetailPage 
                      ? 'text-base sm:text-xl md:text-2xl' 
                      : 'text-xs sm:text-sm'
                  }`}>
                    {feature.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de navegación interactivos (Pills/Dots) */}
      <div className={`flex items-center justify-center gap-2.5 ${isDetailPage ? 'mt-4 md:mt-6' : 'mt-2.5'}`}>
        {gymFeatures.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              isDetailPage 
                ? (i === activeIndex ? 'w-10 sm:w-12 h-2.5 bg-cyan-500 shadow-sm shadow-cyan-500/50' : 'w-3 h-2.5 bg-slate-300 hover:bg-slate-400')
                : (i === activeIndex ? 'w-7 h-1.5 bg-cyan-500' : 'w-2 h-1.5 bg-slate-300 hover:bg-slate-400')
            }`}
            aria-label={`Ver función ${i + 1}`}
          />
        ))}
      </div>

      {/* Modal / Lightbox de Pantalla Completa */}
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

            {/* Imagen en Alta Resolución */}
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
