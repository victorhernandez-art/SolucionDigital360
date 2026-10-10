import Link from 'next/link';
import Image from 'next/image';
import { sistemas } from '@/data/sistemas';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HerramientasGratuitas from '@/components/HerramientasGratuitas';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      {/* Hero Section con Imagen a un costado */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Columna Izquierda: Texto e Información Principal */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
              Catálogo de Software SaaS & Herramientas
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sistemas Digitales para Impulsar tu Negocio
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Plataformas web optimizadas, listas para usar, sin costos ocultos y con el respaldo técnico de Solución Digital 360.
            </p>
          </div>

          {/* Columna Derecha: Imagen diseño.png totalmente sin contorno ni bordes */}
          <div className="w-full flex items-center justify-center bg-transparent border-0 shadow-none outline-none">
            <Image
              src="/diseno.png"
              alt="Diseño Solución Digital 360"
              width={640}
              height={480}
              unoptimized
              className="w-full max-w-lg h-auto object-contain bg-transparent border-0 outline-none shadow-none"
              priority
            />
          </div>
        </div>

        {/* Catálogo de Sistemas */}
        <div id="sistemas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-mt-24">
          {sistemas.map((sistema) => (
            <div
              key={sistema.slug}
              className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {sistema.proximamente ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      Próximamente
                    </span>
                  ) : sistema.esGratis ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Gratis
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      Premium
                    </span>
                  )}
                  {sistema.precio && sistema.precio !== 'Próximamente' ? (
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-2">
                        {sistema.precioAnterior && (
                          <span className="text-sm font-semibold text-slate-400 line-through">
                            {sistema.precioAnterior}
                          </span>
                        )}
                        <span className={`font-extrabold text-2xl ${sistema.esGratis ? 'text-emerald-600' : 'text-slate-900'}`}>
                          {sistema.precio}
                        </span>
                      </div>
                      {!sistema.esGratis && (
                        <span className="text-[11px] font-medium text-slate-500 block">
                          Único pago
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      En Desarrollo
                    </span>
                  )}
                </div>

                <h2 className={`text-xl font-bold text-slate-900 leading-snug ${sistema.proximamente ? '' : 'group-hover:text-blue-600'} transition-colors`}>
                  {sistema.nombre}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                  {sistema.descripcionCorta}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                {sistema.proximamente ? (
                  <button
                    disabled
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-400 font-semibold text-sm cursor-not-allowed border border-slate-200 select-none"
                  >
                    <span>Próximamente Disponible</span>
                  </button>
                ) : (
                  <Link
                    href={`/sistemas/${sistema.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md group-hover:shadow-blue-500/20"
                  >
                    <span>Ver Detalle del Sistema</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sección: Herramientas de Apoyo Gratuitas */}
        <HerramientasGratuitas />
      </main>

      <Footer />
    </div>
  );
}
