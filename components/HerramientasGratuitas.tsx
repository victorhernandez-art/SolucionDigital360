'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileCheck2, LayoutGrid, Calculator, ArrowUpRight } from 'lucide-react';

interface HerramientaGratuita {
  id: string;
  icono: React.ElementType;
  colorIcono: string;
  bgIcono: string;
  glowIcono: string;
  ringIcono: string;
  nombre: string;
  descripcion: string;
  labelBoton: string;
  href: string;
}

const herramientas: HerramientaGratuita[] = [
  {
    id: 'nitro-pdf-pro',
    icono: FileCheck2,
    colorIcono: 'text-orange-600',
    bgIcono: 'bg-orange-50/90',
    glowIcono: 'bg-orange-400',
    ringIcono: 'border-orange-200/80',
    nombre: 'Nitro PDF Pro — Guía & Descarga',
    descripcion:
      'Aprende a instalar y configurar Nitro PDF Pro paso a paso con nuestro video tutorial exclusivo y obtén el instalador completo sin costo.',
    labelBoton: 'Ver tutorial y descarga',
    href: '/herramientas/nitro-pdf',
  },
  {
    id: 'office-2019-pro',
    icono: LayoutGrid,
    colorIcono: 'text-blue-600',
    bgIcono: 'bg-blue-50/90',
    glowIcono: 'bg-blue-400',
    ringIcono: 'border-blue-200/80',
    nombre: 'Office 2019 Profesional — Guía & Licencia',
    descripcion:
      'Aprende a instalar y activar Microsoft Office 2019 (Word, Excel, PowerPoint, Outlook, OneNote) con licencia original paso a paso.',
    labelBoton: 'Ver tutorial y descarga',
    href: '/herramientas/office-2019',
  },
  {
    id: 'generador-cotizaciones-basico',
    icono: Calculator,
    colorIcono: 'text-violet-600',
    bgIcono: 'bg-violet-50/90',
    glowIcono: 'bg-violet-400',
    ringIcono: 'border-violet-200/80',
    nombre: 'Generador de Cotizaciones Básico',
    descripcion:
      'Crea presupuestos profesionales en segundos directamente en el navegador. Agrega tus servicios, ajusta precios y descarga tu cotización lista para enviar por WhatsApp.',
    labelBoton: 'Probar herramienta',
    href: '#generador-cotizaciones',
  },
];

/**
 * Subcomponente de Icono Animado con JavaScript:
 * - Flotación suave continua en reposo.
 * - Efecto interactivo magnético al mover el puntero sobre el icono.
 * - Halo perimétrico dinámico (glow) y rotación sutil calculada en tiempo real.
 * - Iconografía profesional y sobria (sin estrellas para evitar aspecto artificial).
 */
function InteractiveCardIcon({
  Icon,
  color,
  bgColor,
  glowColor,
  ringColor,
}: {
  Icon: React.ElementType;
  color: string;
  bgColor: string;
  glowColor: string;
  ringColor: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0, rotate: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setOffset({
      x: x * 0.28,
      y: y * 0.28,
      rotate: (x / (rect.width / 2)) * 14,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0, rotate: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-1.5 cursor-pointer select-none group/icon"
      aria-hidden="true"
    >
      {/* Resplandor / Halo de luz con pulso suave continuo */}
      <span
        className={`absolute inset-1 rounded-2xl ${glowColor} blur-md transition-all duration-500 pointer-events-none ${
          isHovered ? 'opacity-85 scale-125' : 'opacity-35 scale-95 animate-pulse'
        }`}
      />

      {/* Anillo de pulso perimétrico sutil */}
      <span
        className={`absolute inset-0.5 rounded-2xl border ${ringColor} transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 scale-110 shadow-sm' : 'opacity-40'
        }`}
      />

      {/* Contenedor del icono con animación continua en reposo y física magnética en JS */}
      <div
        style={{
          transform: isHovered
            ? `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.18) rotate(${offset.rotate}deg)`
            : undefined,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`
          relative p-3 rounded-2xl ${bgColor} border border-white/80 shadow-sm flex items-center justify-center
          ${!isHovered ? 'animate-icon-float' : ''}
        `}
      >
        <Icon
          className={`w-5 h-5 ${color} transition-all duration-300 ${
            isHovered ? 'scale-110 drop-shadow-sm' : ''
          }`}
          strokeWidth={2.2}
        />
      </div>
    </div>
  );
}

export default function HerramientasGratuitas() {
  return (
    <section
      id="herramientas-gratuitas"
      aria-labelledby="herramientas-titulo"
      className="relative"
    >
      {/* Borde superior decorativo degradado */}
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 mb-10" />

      {/* Encabezado de sección */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Sin costo · Disponibles ahora
        </div>

        <h2
          id="herramientas-titulo"
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          Herramientas de Apoyo Gratuitas
        </h2>
        <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Conoce la calidad de nuestro desarrollo sin costo. Herramientas útiles para tu negocio
          mientras te decides por nuestros sistemas premium.
        </p>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {herramientas.map((h) => {
          const Icono = h.icono;
          return (
            <div
              key={h.id}
              className="
                relative group
                bg-white
                border border-slate-200/80
                rounded-2xl p-7
                shadow-sm
                hover:shadow-xl hover:border-emerald-200
                transition-all duration-300
                flex flex-col justify-between
                overflow-hidden
              "
            >
              {/* Destello de fondo en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              <div className="relative space-y-4">
                {/* Badge GRATIS + Ícono Animado en JS */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 tracking-wide shadow-sm">
                    Gratis
                  </span>

                  {/* Componente Interactivo de Ícono */}
                  <InteractiveCardIcon
                    Icon={Icono}
                    color={h.colorIcono}
                    bgColor={h.bgIcono}
                    glowColor={h.glowIcono}
                    ringColor={h.ringIcono}
                  />
                </div>

                {/* Nombre y descripción */}
                <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors duration-200">
                  {h.nombre}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {h.descripcion}
                </p>
              </div>

              {/* Botón outline */}
              <div className="relative pt-6 mt-6 border-t border-slate-100">
                <Link
                  href={h.href}
                  id={`btn-${h.id}`}
                  className="
                    w-full inline-flex items-center justify-center gap-2
                    px-5 py-3 rounded-xl
                    border-2 border-emerald-500
                    text-emerald-700 font-semibold text-sm
                    hover:bg-emerald-500 hover:text-white
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
                  "
                  aria-label={`${h.labelBoton} — ${h.nombre}`}
                >
                  <span>{h.labelBoton}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Nota de valor al pie */}
      <p className="mt-8 text-center text-xs text-slate-400 font-medium">
        Las herramientas gratuitas no requieren registro ni datos de pago.
      </p>
    </section>
  );
}
