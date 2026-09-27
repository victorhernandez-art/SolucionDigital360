'use client';

import { MessageSquare, ShieldCheck, Globe, HelpCircle } from 'lucide-react';

interface InternationalPricingCardProps {
  whatsappUrl: string;
  isTallerSystem?: boolean;
}

export default function InternationalPricingCard({
  whatsappUrl,
  isTallerSystem = true,
}: InternationalPricingCardProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
          <Globe className="w-5 h-5" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Precio y compra
        </h2>
      </div>

      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 relative overflow-hidden">
        {/* Top border accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Precio internacional de referencia: <span className="text-indigo-600">70 USDT</span>
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                o $2,000.00 MXN en México
              </span>
            </div>
            <p className="text-slate-600 text-base font-medium">
              Pago único. Sin mensualidades ni cobros recurrentes.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2">
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
              <strong className="text-slate-900 font-bold">Precio final en Argentina:</strong> se informa y confirma en moneda argentina (ARS) por WhatsApp antes de la compra.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm">
              Para los demás países de Latinoamérica, EE.UU. y España, la cotización se valida directamente en su moneda local o transferencia/USDT al momento del contacto.
            </p>
          </div>
        </div>

        {/* Botón WhatsApp de Compra y Coordinación */}
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base sm:text-lg transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35"
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span>Consultar y coordinar compra por WhatsApp</span>
          </a>
        </div>

        {/* Nota legal de compra personalizada */}
        <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-500 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <span>
            La compra se coordina de forma personal por WhatsApp. No se procesan pagos automáticos desde esta página.
          </span>
        </div>
      </div>
    </section>
  );
}
