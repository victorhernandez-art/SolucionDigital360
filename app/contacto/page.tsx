import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MessageSquare, PhoneCall, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | Solución Digital 360',
  description: 'Contáctanos directamente vía WhatsApp o llamada telefónica. Estamos listos para asesorarte en la adquisición e implementación de nuestros sistemas.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Atención Personalizada
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Estamos para ayudarte a impulsar tu negocio
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            ¿Tienes dudas sobre las funciones de algún software, métodos de pago o instalación? Comunícate directamente con nuestro equipo de asesores técnicos.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Direct Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">WhatsApp Oficial Directo</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Respuesta rápida para demostraciones, soporte técnico y activación de licencias vitalicias.
                </p>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Asesoría 1 a 1 sin intermediarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Envío inmediato de instaladores y tutoriales</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/529611209361"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatear por WhatsApp (+52 961 120 9361)</span>
            </a>
          </div>

          {/* Direct Call & Support Info */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Llamada Telefónica & Horarios</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Ponte en contacto por llamada directa para consultas corporativas o dudas generales.
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <span><strong>Horario de atención:</strong> Lunes a Sábado de 9:00 AM a 8:00 PM</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <span><strong>Garantía:</strong> Soporte de instalación incluido en tu compra</span>
                </div>
              </div>
            </div>

            <a
              href="tel:+529611209361"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Llamar al +52 961 120 9361</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
