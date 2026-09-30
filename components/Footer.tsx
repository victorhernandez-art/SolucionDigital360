import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageSquare, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Solución Digital 360"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                Solución Digital <span className="text-blue-600">360</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Desarrollamos soluciones digitales, software de gestión y herramientas SaaS especializadas para potenciar la productividad y el crecimiento de negocios y talleres técnicos.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#herramientas-gratuitas" className="hover:text-blue-600 transition-colors">
                  Herramientas Gratis
                </Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="hover:text-blue-600 transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-blue-600 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Legal & Soporte
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/privacidad" className="hover:text-blue-600 transition-colors">
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-blue-600 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/529611209361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Soporte WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs sm:text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Solución Digital 360. Todos los derechos reservados.</p>
          <div className="inline-flex items-center gap-2 text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Transacciones y software 100% seguros</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
