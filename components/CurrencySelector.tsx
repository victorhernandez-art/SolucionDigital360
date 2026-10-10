'use client';

import { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

export interface CountryCurrency {
  code: string;
  country: string;
  currency: string;
  symbol: string;
  flag: string;
  lada: string;
}

export const supportedCountries: CountryCurrency[] = [
  { code: 'MX', country: 'México', currency: 'MXN', symbol: '$', flag: '🇲🇽', lada: '+52' },
  { code: 'AR', country: 'Argentina', currency: 'ARS', symbol: '$', flag: '🇦🇷', lada: '+54' },
  { code: 'CO', country: 'Colombia', currency: 'COP', symbol: '$', flag: '🇨🇴', lada: '+57' },
  { code: 'CL', country: 'Chile', currency: 'CLP', symbol: '$', flag: '🇨🇱', lada: '+56' },
  { code: 'PE', country: 'Perú', currency: 'PEN', symbol: 'S/', flag: '🇵🇪', lada: '+51' },
  { code: 'EC', country: 'Ecuador', currency: 'USD', symbol: '$', flag: '🇪🇨', lada: '+593' },
  { code: 'GT', country: 'Guatemala', currency: 'GTQ', symbol: 'Q', flag: '🇬🇹', lada: '+502' },
  { code: 'CR', country: 'Costa Rica', currency: 'CRC', symbol: '₡', flag: '🇨🇷', lada: '+506' },
  { code: 'PA', country: 'Panamá', currency: 'PAB', symbol: 'B/.', flag: '🇵🇦', lada: '+507' },
  { code: 'HN', country: 'Honduras', currency: 'HNL', symbol: 'L', flag: '🇭🇳', lada: '+504' },
  { code: 'SV', country: 'El Salvador', currency: 'USD', symbol: '$', flag: '🇸🇻', lada: '+503' },
  { code: 'NI', country: 'Nicaragua', currency: 'NIO', symbol: 'C$', flag: '🇳🇮', lada: '+505' },
  { code: 'DO', country: 'República Dominicana', currency: 'DOP', symbol: 'RD$', flag: '🇩🇴', lada: '+1' },
  { code: 'BO', country: 'Bolivia', currency: 'BOB', symbol: 'Bs', flag: '🇧🇴', lada: '+591' },
  { code: 'PY', country: 'Paraguay', currency: 'PYG', symbol: '₲', flag: '🇵🇾', lada: '+595' },
  { code: 'UY', country: 'Uruguay', currency: 'UYU', symbol: '$U', flag: '🇺🇾', lada: '+598' },
  { code: 'VE', country: 'Venezuela', currency: 'VES', symbol: 'Bs.', flag: '🇻🇪', lada: '+58' },
  { code: 'PR', country: 'Puerto Rico', currency: 'USD', symbol: '$', flag: '🇵🇷', lada: '+1' },
  { code: 'ES', country: 'España', currency: 'EUR', symbol: '€', flag: '🇪🇸', lada: '+34' },
  { code: 'US', country: 'Estados Unidos', currency: 'USD', symbol: '$', flag: '🇺🇸', lada: '+1' },
];

interface CurrencySelectorProps {
  systemName?: string;
  isGym?: boolean;
}

export default function CurrencySelector({ systemName = 'Sistema Taller v1.0', isGym = false }: CurrencySelectorProps) {
  const [selected, setSelected] = useState<CountryCurrency>(supportedCountries[0]); // México por defecto
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Encabezado del Módulo Internacional */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Globe className="w-3.5 h-3.5 text-blue-600" /> Cobertura Internacional & Multimoneda (20 Países)
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {isGym 
              ? 'Configuración Multi-País Automática para Gimnasios' 
              : 'Disponible para 20+ Países en Latinoamérica, EE.UU. y España'}
          </h3>
          <p className="text-sm text-slate-600">
            {isGym 
              ? 'En GymWeb, al seleccionar tu país en el apartado de Configuración, el sistema muestra en automático el símbolo real de tu moneda local y la LADA telefónica que le corresponde para tickets de WhatsApp.'
              : `Elige tu país de origen para previsualizar el tipo de moneda oficial y LADA configurada en ${systemName}.`}
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
              <span className="text-xs text-blue-600 font-mono">({selected.symbol} {selected.currency})</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Menú Desplegable con todos los países */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 text-white border border-slate-700 rounded-2xl shadow-2xl z-30 max-h-80 overflow-y-auto p-1.5 space-y-1 divide-y divide-slate-800 animate-in fade-in duration-150">
              {supportedCountries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setSelected(c);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    c.code === selected.code
                      ? 'bg-blue-600 text-white font-bold'
                      : 'hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase">{c.code.toLowerCase()}</span>
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-300">({c.symbol} {c.currency})</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">{c.lada}</span>
                    {c.code === selected.code && <Check className="w-4 h-4 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alerta explicativa de autoselección en el sistema */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{selected.flag}</span>
          <div>
            <div className="font-bold text-slate-900">
              País Seleccionado: <span className="text-blue-700">{selected.country}</span> ({selected.code})
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              En el apartado de <strong className="text-slate-800">Configuración</strong> del sistema, se activa en automático el símbolo <strong className="text-blue-700 font-mono text-sm">{selected.symbol} ({selected.currency})</strong> y la LADA <strong className="text-emerald-700 font-mono text-sm">{selected.lada}</strong> para WhatsApp.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 bg-white rounded-lg border border-blue-200 text-xs font-mono font-bold text-slate-800 shadow-sm">
            Símbolo: {selected.symbol}
          </span>
          <span className="px-3 py-1 bg-white rounded-lg border border-blue-200 text-xs font-mono font-bold text-emerald-700 shadow-sm">
            LADA: {selected.lada}
          </span>
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
              <div className={`text-[11px] font-mono flex items-center justify-between ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                <span>{c.symbol} {c.currency}</span>
                <span className={isSelected ? 'text-emerald-200 font-bold' : 'text-emerald-600 font-semibold'}>{c.lada}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
