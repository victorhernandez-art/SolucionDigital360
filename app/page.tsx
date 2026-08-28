import Link from 'next/link';
import Image from 'next/image';
import { sistemas } from '@/data/sistemas';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Header con Logotipo Oficial y Título */}
      <header className="bg-white/80 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 sm:w-14">
              <Image
                src="/logo.png"
                alt="Solución Digital 360"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
              Solución Digital <span className="text-blue-600">360</span>
            </span>
          </Link>
          <a
            href="https://wa.me/529611209361"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">Contacto </span>
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

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
          <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-transparent border-0 shadow-none outline-none">
            <Image
              src="/diseno.png"
              alt="Diseño Solución Digital 360"
              fill
              unoptimized
              className="object-contain bg-transparent border-0 outline-none shadow-none"
              priority
            />
          </div>
        </div>

        {/* Catálogo de Sistemas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sistemas.map((sistema) => (
            <div
              key={sistema.slug}
              className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {sistema.esGratis ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Gratis
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      Premium
                    </span>
                  )}
                  <span className="font-extrabold text-2xl text-blue-600">{sistema.precio}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {sistema.nombre}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                  {sistema.descripcionCorta}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link
                  href={`/sistemas/${sistema.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md group-hover:shadow-blue-500/20"
                >
                  <span>Ver Detalle del Sistema</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Solución Digital 360. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
