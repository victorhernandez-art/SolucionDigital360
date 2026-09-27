import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileCheck, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Solución Digital 360',
  description: 'Términos y condiciones de uso de las licencias de software y servicios de Solución Digital 360.',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800">
            <FileCheck className="w-3.5 h-3.5 text-blue-600" /> Condiciones de Servicio
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-sm text-slate-500">
            Vigente para todas las licencias y adquisiciones de software
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Licencia Vitalicia y Pago Único</h2>
            <p>
              La adquisición de las licencias de nuestros sistemas (por ejemplo, Sistema Taller v1.0) otorga al comprador un derecho de uso no exclusivo, vitalicio y sin cobros periódicos ni suscripciones mensuales obligatorias.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Conexión Multi-Dispositivo en Red Local (LAN)</h2>
            <p>
              El usuario puede conectar dispositivos secundarios (teléfonos móviles, tabletas u otras computadoras) dentro de la misma red local Wi-Fi / LAN sin costo adicional de licencias, bajo la infraestructura técnica provista en el instalador.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Periodo de Prueba Gratuita de 7 Días</h2>
            <p>
              Solución Digital 360 proporciona acceso a un periodo de prueba de 7 días con el software 100% funcional y activo para que los clientes verifiquen el desempeño en sus propios equipos de cómputo antes de formalizar la compra de la clave definitiva.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Soporte Técnico y Actualizaciones</h2>
            <p>
              Cada compra incluye 6 meses de soporte técnico gratis directo para asistencia en instalación, dudas operativas y actualizaciones de mejoras del producto.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
