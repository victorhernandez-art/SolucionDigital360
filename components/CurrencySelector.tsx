'use client';

import { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

export interface CountryCurrency {
  code: string;
  country: string;
  currency: string;
  symbol: string;
  flag: string;
}

export const supportedCountries: CountryCurrency[] = [
  { code: 'MX', country: 'México', currency: 'MXN', symbol: '$', flag: '🇲🇽' },
  { code: 'CO', country: 'Colombia', currency: 'COP', symbol: '$', flag: '🇨🇴' },
  { code: 'AR', country: 'Argentina', currency: 'ARS', symbol: '$', flag: '🇦🇷' },
  { code: 'CL', country: 'Chile', currency: 'CLP', symbol: '$', flag: '🇨🇱' },
  { code: 'PE', country: 'Perú', currency: 'PEN', symbol: 'S/', flag: '🇵🇪' },
  { code: 'EC', country: 'Ecuador', currency: 'USD', symbol: '$', flag: '🇪🇨' },
  { code: 'GT', country: 'Guatemala', currency: 'GTQ', symbol: 'Q', flag: '🇬🇹' },
  { code: 'CR', country: 'Costa Rica', currency: 'CRC', symbol: '₡', flag: '🇨🇷' },
  { code: 'PA', country: 'Panamá', currency: 'USD / PAB', symbol: '$', flag: '🇵🇦' },
  { code: 'HN', country: 'Honduras', currency: 'HNL', symbol: 'L', flag: '🇭🇳' },
  { code: 'SV', country: 'El Salvador', currency: 'USD', symbol: '$', flag: '🇸🇻' },
  { code: 'NI', country: 'Nicaragua', currency: 'NIO', symbol: 'C$', flag: '🇳🇮' },
  { code: 'DO', country: 'República Dominicana', currency: 'DOP', symbol: 'RD$', flag: '🇩🇴' },
  { code: 'BO', country: 'Bolivia', currency: 'BOB', symbol: 'Bs.', flag: '🇧🇴' },
  { code: 'PY', country: 'Paraguay', currency: 'PYG', symbol: '₲', flag: '🇵🇾' },
  { code: 'UY', country: 'Uruguay', currency: 'UYU', symbol: '$U', flag: '🇺🇾' },
  { code: 'VE', country: 'Venezuela', currency: 'USD / VES', symbol: '$', flag: '🇻🇪' },
  { code: 'PR', country: 'Puerto Rico', currency: 'USD', symbol: '$', flag: '🇵🇷' },
  { code: 'ES', country: 'España', currency: 'EUR', symbol: '€', flag: '🇪🇸' },
  { code: 'US', country: 'Estados Unidos', currency: 'USD', symbol: '$', flag: '🇺🇸' },
];

export default function CurrencySelector() {
  const [selected, setSelected] = useState<CountryCurrency>(supportedCountries[0]); // México por defecto
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Encabezado del Módulo Internacional */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Globe className="w-3.5 h-3.5 text-blue-600" /> Cobertura Internacional & Multimoneda
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Disponible para 20+ Países en Latinoamérica, EE.UU. y España
          </h3>
          <p className="text-sm text-slate-600">
            Elige tu país de origen para previsualizar el tipo de moneda oficial configurada en Sistema Taller v1.0.
          </p>
        </div>

        {/* Desplegable Selector de País */}
        <div className="relative shrink-0">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Selecciona tu País:
          </label>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-900 font-semibold text-sm transition-all w-64 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">{selected.flag}</span>
              <span>{selected.country}</span>
              <span className="text-xs text-blue-600 font-mono">({selected.currency})</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Menú Desplegable con todos los países */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-30 max-h-80 overflow-y-auto p-1.5 space-y-1 divide-y divide-slate-100 animate-in fade-in duration-150">
              {supportedCountries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setSelected(c);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    c.code === selected.code
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">({c.currency})</span>
                    {c.code === selected.code && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid Interactivo de Banderas de Países Soportados */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-1">
        {supportedCountries.map((c) => {
          const isSelected = c.code === selected.code;
          return (
            <button
              key={c.code}
              onClick={() => setSelected(c)}
              className={`p-3 rounded-2xl border transition-all text-left space-y-1 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{c.flag}</span>
                <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {c.code}
                </span>
              </div>
              <div className="font-bold text-xs truncate">
                {c.country}
              </div>
              <div className={`text-[11px] font-mono ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                {c.currency} ({c.symbol})
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
