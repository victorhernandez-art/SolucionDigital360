import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShieldCheck, Target, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quiénes Somos | Solución Digital 360',
  description: 'Conoce la misión y visión de Solución Digital 360. Desarrollamos software y herramientas accesibles de alto rendimiento para negocios y técnicos.',
};

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Users className="w-3.5 h-3.5 text-blue-600" /> Sobre Nosotros
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Impulsando el futuro de los negocios técnicos con <span className="text-blue-600">Solución Digital 360</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Nacimos con la convicción de que todo negocio, taller y emprendedor merece herramientas tecnológicas de primer nivel: rápidas, seguras, de pago único y sin ataduras a rentas mensuales abusivas.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nuestra Misión</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Desarrollar soluciones informáticas intuitivas que ordenen la operativa diaria de los centros de servicio, eliminen pérdidas económicas y aumenten la fidelidad de sus clientes.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Autonomía y Privacidad</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Creemos firmemente en el derecho de los negocios a ser dueños de su propia información. Por ello, diseñamos sistemas con bases de datos locales y funcionamiento 100% offline.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Calidad y Soporte</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Acompañamos a cada cliente con asesoría directa, capacitación paso a paso y actualizaciones continuas para asegurar que aprovechen al máximo cada funcionalidad.
            </p>
          </div>
        </div>

        {/* Commitment Statement */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ¿Listo para transformar la gestión de tu negocio?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Descubre nuestro catálogo de sistemas creados específicamente para resolver los retos reales de tu día a día.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30"
            >
              <span>Explorar Sistemas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
