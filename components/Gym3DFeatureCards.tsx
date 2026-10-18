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
      // Si hace clic en la carta frontal, avanza a la siguiente carta
      setActiveIndex((prev) => (prev + 1) % gymFeatures.length);
    } else {
      // Si hace clic en una carta lateral, la trae al frente
      setActiveIndex(clickedIndex);
    }
  };

  return (
    <div className={`w-full my-3 select-none ${isDetailPage ? 'max-w-2xl mx-auto py-4' : ''}`}>
      {/* Etiqueta sutil superior: Nuevas Funciones */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Nuevas Funciones Implementadas</span>
        </span>
        <span className="text-[11px] font-semibold text-slate-400">
          Clic para pasar ({activeIndex + 1}/{gymFeatures.length})
        </span>
      </div>

      {/* Escenario 3D Limpio sin marco de fondo */}
      <div className={`relative w-full ${isDetailPage ? 'h-72 sm:h-84' : 'h-56 sm:h-64'} flex items-center justify-center [perspective:1200px]`}>
        {gymFeatures.map((feature, idx) => {
          const isCurrent = idx === activeIndex;
          const diff = (idx - activeIndex + gymFeatures.length) % gymFeatures.length;

          // Posicionamiento 3D estilo baraja / cartas
          let transformStyle = '';
          let zIndex = 10;
          let opacity = 'opacity-65 hover:opacity-90';

          if (diff === 0) {
            // Carta activa en el centro (más grande y al frente)
            transformStyle = 'translate-x-0 translate-y-0 scale-100 rotate-0 [transform:translateZ(40px)]';
            zIndex = 30;
            opacity = 'opacity-100';
          } else if (diff === 1) {
            // Carta derecha detrás
            transformStyle = 'translate-x-7 sm:translate-x-12 translate-y-2 scale-[0.88] rotate-6 sm:rotate-8 [transform:translateZ(10px)]';
            zIndex = 20;
          } else {
            // Carta izquierda detrás
            transformStyle = '-translate-x-7 sm:-translate-x-12 translate-y-2 scale-[0.88] -rotate-6 sm:-rotate-8 [transform:translateZ(10px)]';
            zIndex = 15;
          }

          return (
            <div
              key={feature.id}
              onClick={() => handleCardClick(idx)}
              className={`absolute w-[88%] sm:w-[84%] max-w-[390px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border-2 ${
                isCurrent
                  ? 'border-cyan-400 shadow-[0_12px_32px_rgba(6,182,212,0.4)] ring-2 ring-cyan-400/30'
                  : 'border-slate-800 shadow-lg hover:border-cyan-500/60'
              } ${transformStyle} ${opacity}`}
              style={{ zIndex }}
            >
              <div className="relative w-full h-full bg-slate-950 group/card">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority={idx === 0}
                />

                {/* Sombra gradiente inferior para que el texto resalte perfectamente */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />

                {/* Badge en esquina superior izquierda */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-400/30 text-[10px] sm:text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{feature.badge}</span>
                </div>

                {/* Botón para ampliar captura */}
                {isCurrent && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage(feature);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/85 hover:bg-cyan-600 text-white border border-white/20 backdrop-blur-md transition-all shadow-md hover:scale-110"
                    title="Ampliar captura en pantalla completa"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Título en la base de la carta exactamente como en la imagen */}
                <div className="absolute bottom-3 left-3.5 right-3.5 text-left">
                  <p className="text-white font-extrabold text-xs sm:text-sm drop-shadow-lg truncate">
                    {feature.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de navegación interactivos (Pills/Dots) */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {gymFeatures.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex 
                ? 'w-7 bg-cyan-500' 
                : 'w-2 bg-slate-300 hover:bg-slate-400'
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
