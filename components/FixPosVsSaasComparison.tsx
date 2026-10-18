'use client';

import { ShieldCheck, XCircle, CheckCircle2, Scale, Zap, Lock, DollarSign, WifiOff, Camera, Database } from 'lucide-react';

interface ComparisonRow {
  criterio: string;
  icono: any;
  saas: string;
  saasDetalle?: string;
  fixpos: string;
  fixposDetalle?: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    criterio: "Modelo de Pago",
    icono: DollarSign,
    saas: "Renta mensual perpetua ($30 - $80 USD/mes).",
    saasDetalle: "Representa entre $360 y $960 USD al año de por vida. Si dejas de pagar, pierdes el acceso inmediato.",
    fixpos: "Licencia Vitalicia de pago único ($2,000 MXN).",
    fixposDetalle: "Un solo pago definitivo. Sin rentas mensuales, sin cobros recurrentes y con uso ilimitado de por vida."
  },
  {
    criterio: "Dependencia de Internet",
    icono: WifiOff,
    saas: "Inoperable si falla la conexión o el servidor cae.",
    saasDetalle: "Si se corta la fibra o se cae el proveedor, tu mostrador se paraliza y no puedes recibir ni entregar equipos.",
    fixpos: "100% Funcional Offline en todo momento.",
    fixposDetalle: "Base de datos nativa SQLite en tu computadora. Sigue recibiendo equipos, imprimiendo tickets y cobrando sin internet."
  },
  {
    criterio: "Privacidad & Custodia de Datos",
    icono: Lock,
    saas: "Servidores externos de terceros con riesgo de bloqueo.",
    saasDetalle: "Tus clientes, teléfonos e ingresos están en nubes externas sujetas a filtraciones o suspensión por impago.",
    fixpos: "Bóveda Local en tu PC (Inmune a desinstalaciones).",
    fixposDetalle: "Tus datos residen en una carpeta visible en tu Escritorio, físicamente bajo tu custodia y con respaldos en 1 clic."
  },
  {
    criterio: "Evidencia Fotográfica",
    icono: Camera,
    saas: "Carga manual lenta o límites de almacenamiento en la nube.",
    saasDetalle: "Exige pasar fotos por cables, WhatsApp o pagar cuotas extra por almacenamiento de gigabytes.",
    fixpos: "Cámara Móvil Instantánea por Código QR.",
    fixposDetalle: "Escaneas el QR con cualquier smartphone y transmites fotos de golpes y series a la PC en tiempo real sin cables ni apps."
  },
  {
    criterio: "Costo Real de Refacciones (COGS)",
    icono: Zap,
    saas: "Sin deducción automática de costo en la orden.",
    saasDetalle: "No calcula el costo directo de la pieza sobre el anticipo, generando ganancias irreales en los reportes del día.",
    fixpos: "Principio de Devengo Proporcional (COGS).",
    fixposDetalle: "Descuenta inventario en tiempo real, computa el costo exacto de la refacción y calcula la ganancia neta real de mano de obra."
  },
  {
    criterio: "Control de Efectivo & Cierre de Caja",
    icono: ShieldCheck,
    saas: "Reportes genéricos sin auditoría física ciega.",
    saasDetalle: "El cajero ve el total esperado en pantalla, facilitando fugas 'hormiga' y discrepancias no detectadas.",
    fixpos: "Auditoría Ciega de Efectivo & Corte Z con Firmas.",
    fixposDetalle: "Compara el conteo físico de billetes y monedas contra el flujo teórico del sistema, desglosando faltantes y sobrantes."
  }
];

export default function FixPosVsSaasComparison() {
  return (
    <section className="space-y-8 bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <Scale className="w-4 h-4 text-amber-600" />
          <span>Análisis Comparativo Estratégico</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          FixPOS Pro vs. Sistemas Tradicionales en la Nube (SaaS)
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Descubre por qué cientos de técnicos y dueños de talleres abandonan las plataformas de suscripción mensual para migrar a la independencia de FixPOS Pro.
        </p>
      </div>

      {/* Tabla Comparativa en Pantallas Medianas y Grandes */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-900 text-white">
              <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider w-1/4">
                Criterio Estratégico
              </th>
              <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider w-[37.5%] bg-slate-800/90 text-rose-300">
                Sistemas Tradicionales en la Nube (SaaS)
              </th>
              <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider w-[37.5%] bg-indigo-950 text-emerald-400">
                FixPOS Pro (Desktop & Red LAN)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {COMPARISON_DATA.map((item, idx) => {
              const Icon = item.icono;
              return (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  {/* Criterio */}
                  <td className="py-5 px-6 font-bold text-slate-900 align-top">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.criterio}</span>
                    </div>
                  </td>

                  {/* SaaS */}
                  <td className="py-5 px-6 text-slate-700 bg-rose-50/20 border-x border-slate-100 align-top">
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 text-rose-700 font-semibold">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item.saas}</span>
                      </div>
                      {item.saasDetalle && (
                        <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                          {item.saasDetalle}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* FixPOS Pro */}
                  <td className="py-5 px-6 text-slate-900 bg-emerald-50/30 align-top">
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item.fixpos}</span>
                      </div>
                      {item.fixposDetalle && (
                        <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                          {item.fixposDetalle}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Versión Cards para Dispositivos Móviles y Tablets */}
      <div className="lg:hidden space-y-4">
        {COMPARISON_DATA.map((item, idx) => {
          const Icon = item.icono;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{item.criterio}</h3>
              </div>

              {/* Columna SaaS */}
              <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                  SaaS en la Nube
                </span>
                <div className="flex items-start gap-2 text-rose-900 text-xs sm:text-sm font-semibold">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item.saas}</span>
                </div>
                {item.saasDetalle && (
                  <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                    {item.saasDetalle}
                  </p>
                )}
              </div>

              {/* Columna FixPOS Pro */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  FixPOS Pro (Desktop & LAN)
                </span>
                <div className="flex items-start gap-2 text-emerald-950 text-xs sm:text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.fixpos}</span>
                </div>
                {item.fixposDetalle && (
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                    {item.fixposDetalle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nota al pie de valor */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-indigo-950">
              Total Independencia y Soberanía Tecnológica
            </h4>
            <p className="text-xs text-indigo-800/80">
              Con FixPOS Pro tu negocio no depende de una conexión a internet ni de suscripciones mensuales para operar al 100%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
