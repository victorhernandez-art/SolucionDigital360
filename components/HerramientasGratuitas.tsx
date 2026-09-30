'use client';

import { Calculator, ClipboardList, FileText, ArrowUpRight } from 'lucide-react';

interface HerramientaGratuita {
  id: string;
  icono: React.ElementType;
  colorIcono: string;
  bgIcono: string;
  nombre: string;
  descripcion: string;
  labelBoton: string;
  href: string;
}

const herramientas: HerramientaGratuita[] = [
  {
    id: 'calculadora-costos-taller',
    icono: Calculator,
    colorIcono: 'text-emerald-600',
    bgIcono: 'bg-emerald-50',
    nombre: 'Calculadora de Costos de Taller',
    descripcion:
      'Calcula al instante el precio justo de tus reparaciones. Ingresa el costo de refacciones, tiempo de mano de obra y margen de ganancia para obtener un precio final sugerido.',
    labelBoton: 'Usar ahora',
    href: '#calculadora-costos',
  },
  {
    id: 'plantilla-control-asistencia',
    icono: ClipboardList,
    colorIcono: 'text-blue-600',
    bgIcono: 'bg-blue-50',
    nombre: 'Plantilla de Control de Asistencia',
    descripcion:
      'Lista de Excel/PDF lista para imprimir o compartir. Lleva el registro diario de tu equipo de trabajo sin necesidad de software adicional.',
    labelBoton: 'Descargar PDF',
    href: '#plantilla-asistencia',
  },
  {
    id: 'generador-cotizaciones-basico',
    icono: FileText,
    colorIcono: 'text-violet-600',
    bgIcono: 'bg-violet-50',
    nombre: 'Generador de Cotizaciones Básico',
    descripcion:
      'Crea presupuestos profesionales en segundos directamente en el navegador. Agrega tus servicios, ajusta precios y descarga tu cotización lista para enviar por WhatsApp.',
    labelBoton: 'Probar herramienta',
    href: '#generador-cotizaciones',
  },
];

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
                hover:shadow-lg hover:border-emerald-200
                transition-all duration-300
                flex flex-col justify-between
                overflow-hidden
              "
            >
              {/* Destello de fondo en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              <div className="relative space-y-4">
                {/* Badge GRATIS + ícono */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 tracking-wide">
                    Gratis
                  </span>
                  <div className={`p-2.5 rounded-xl ${h.bgIcono} transition-transform duration-300 group-hover:scale-110`}>
                    <Icono className={`w-5 h-5 ${h.colorIcono}`} strokeWidth={2} />
                  </div>
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
                <a
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
                </a>
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
