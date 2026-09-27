import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | Solución Digital 360',
  description: 'Conoce cómo protegemos tus datos y garantizamos la confidencialidad absoluta de tu información.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Política de Seguridad
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Aviso de Privacidad
          </h1>
          <p className="text-sm text-slate-500">
            Última actualización: Agosto 2026
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" /> 1. Propiedad y Control Total de tus Datos
            </h2>
            <p>
              En <strong>Solución Digital 360</strong> respetamos al 100% la privacidad de nuestros usuarios y clientes. Los sistemas de software desarrollados (como Sistema Taller v1.0) operan con bases de datos nativas y locales (SQLite) alojadas exclusivamente en la computadora o dispositivo del usuario.
            </p>
            <p>
              Nuestra empresa <strong>no tiene acceso, no transmite, no almacena ni comercializa</strong> los registros de clientes, equipos, órdenes de servicio, contraseñas de pantalla ni importes contables generados en el uso del software.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-blue-600" /> 2. Datos Recopilados en Contacto Comercial
            </h2>
            <p>
              Los únicos datos que recopilamos a través de nuestros canales de comunicación (WhatsApp o llamada telefónica) son los datos indispensables para la facturación, emisión de licencias y atención de soporte técnico (nombre, correo electrónico y número de teléfono).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> 3. Respaldos y Seguridad Local
            </h2>
            <p>
              El usuario es el único custodio y administrador de los respaldos de seguridad generados por el software en sus propios equipos de cómputo y unidades de almacenamiento externas.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900">Contacto de Privacidad</h2>
            <p>
              Para cualquier duda o aclaración referente al tratamiento de tus datos, puedes comunicarte a nuestra línea oficial de atención vía WhatsApp al <strong>+52 961 120 9361</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
