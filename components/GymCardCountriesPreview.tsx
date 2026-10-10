'use client';

import { useState } from 'react';
import { Globe, ChevronDown, Check, MessageSquare, CreditCard, Sparkles } from 'lucide-react';
import { supportedCountries, CountryCurrency } from '@/components/CurrencySelector';

export default function GymCardCountriesPreview() {
  const [selected, setSelected] = useState<CountryCurrency>(supportedCountries[0]); // México
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3.5">
      {/* Badges de Módulos Destacados Solicitados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900">
          <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Tickets por WhatsApp:</strong>
            <span className="text-[11px] text-emerald-700 leading-tight block">
              Envío de comprobante de pago de membresía o venta de producto al instante.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-900">
          <CreditCard className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Ventas a Crédito:</strong>
            <span className="text-[11px] text-indigo-700 leading-tight block">
              Membresías o productos a crédito con reporte de cuenta individual por socio (deudores).
            </span>
          </div>
        </div>
      </div>

      {/* Selector Desplegable Idéntico a la Configuración del Sistema */}
      <div className="bg-[#141b2d] text-white rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-md space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" /> 20 Países con Moneda & LADA
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Configuración GymWeb</span>
        </div>

        {/* Dropdown Box estilo captura del sistema */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#222f4c] hover:bg-[#2b3a5d] border border-blue-500/40 text-white font-medium text-xs sm:text-sm transition-all shadow-inner"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs font-mono font-bold text-blue-300 uppercase">
                {selected.code.toLowerCase()}
              </span>
              <span>{selected.flag}</span>
              <span className="font-semibold text-slate-100">{selected.country}</span>
              <span className="text-blue-300 font-mono text-xs">
                ({selected.symbol} {selected.currency})
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                {selected.lada}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#172033] border border-slate-700 rounded-xl shadow-2xl z-40 max-h-56 overflow-y-auto p-1 divide-y divide-slate-800/80 animate-in fade-in duration-100">
              {supportedCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(c);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    c.code === selected.code
                      ? 'bg-blue-600 text-white font-bold'
                      : 'hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-blue-300 uppercase w-4 text-left">
                      {c.code.toLowerCase()}
                    </span>
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-300">
                      ({c.symbol} {c.currency})
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {c.lada}
                    </span>
                    {c.code === selected.code && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mensaje Solicitado: Selección Automática */}
        <p className="text-[11px] text-slate-300 leading-snug flex items-start gap-1.5 bg-[#0f172a]/60 p-2 rounded-lg border border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>En automático:</strong> al seleccionar su país en el apartado de configuración del sistema, muestra el símbolo real de su moneda local (<code className="text-amber-300 font-mono font-bold">{selected.symbol} {selected.currency}</code>) y la LADA (<code className="text-emerald-300 font-mono font-bold">{selected.lada}</code>) que le corresponde para tickets de WhatsApp.
          </span>
        </p>
      </div>
    </div>
  );
}
