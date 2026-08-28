import { 
  Wifi, 
  QrCode, 
  SmartphoneNfc, 
  ShieldCheck, 
  Crown, 
  Wrench, 
  Lock,
  CheckCircle2
} from 'lucide-react';

export default function LanAndRolesSection() {
  return (
    <section className="space-y-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
      {/* Encabezado Principal de la Sección */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
          <Wifi className="w-4 h-4 text-indigo-600" /> Servidor Web Integrado & Seguridad RBAC
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Conexión Multi-Dispositivo LAN y Control de Usuarios
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Conecta los celulares, tablets y computadoras secundarias de tu taller a través de tu red Wi-Fi local sin pagar licencias adicionales y protegiendo tus ganancias.
        </p>
      </div>

      {/* BLOQUE 1: CONEXIÓN MULTI-DISPOSITIVO EN RED LOCAL (LAN) Y QR (FONDO CLARO) */}
      <div className="bg-slate-50/90 text-slate-900 rounded-2xl p-6 sm:p-8 space-y-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 font-mono">
              Sección 2.1 — Servidor LAN Integrado
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <QrCode className="w-6 h-6 text-indigo-600" />
              Pasos para Conectar Celulares, Tablets y PCs por Código QR / IP
            </h3>
          </div>
          <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            0 Programas Extras Necesarios
          </span>
        </div>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          <strong className="text-slate-900 font-bold">Sistema Taller v1.0</strong> incluye un servidor web integrado que permite a técnicos y recepcionistas utilizar sus teléfonos inteligentes (Android / iPhone), tablets o computadoras secundarias (PC / Laptops) dentro del taller sin instalar programas adicionales.
        </p>

        {/* Pasos Numerados de Conexión LAN en Tarjetas Blancas Limpias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
              1
            </span>
            <h4 className="font-bold text-sm text-slate-900">Misma Red Wi-Fi / LAN</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Asegúrate de que la PC Servidor principal, laptops, PCs secundarias y dispositivos móviles estén conectados a la misma red local del taller.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
              2
            </span>
            <h4 className="font-bold text-sm text-slate-900">Menú Conexión LAN</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Abre el sistema en la PC principal e ingresa al menú <strong className="text-slate-900 font-semibold">Configuración ➔ Conexión LAN</strong>.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
              3
            </span>
            <h4 className="font-bold text-sm text-slate-900">Código QR e IP Local</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verás un Código QR único junto con la IP local para PCs secundarias (Ejemplo: <code className="text-indigo-700 bg-indigo-50 font-mono px-1.5 py-0.5 rounded border border-indigo-100">http://192.168.1.94:3000</code>).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
              4
            </span>
            <h4 className="font-bold text-sm text-slate-900">Escanear o Ingresar IP</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Desde la cámara de tu celular/tablet escanea el QR, o ingresa la IP local desde el navegador de cualquier PC secundaria para empezar a trabajar.
            </p>
          </div>
        </div>

        {/* BLOQUE 1.2: INSTALACIÓN COMO APLICACIÓN NATIVA (PWA FONDO CLARO) */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
            <SmartphoneNfc className="w-5 h-5 shrink-0 text-indigo-600" />
            <span>Sección 2.2 — Instalación como Aplicación Nativa (PWA en Móviles)</span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm">
            En tu dispositivo móvil (Android / iPhone), puedes instalar el sistema para que se abra a pantalla completa sin barras de navegador, comportándose igual que un software nativo:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-indigo-900 block">📱 En Chrome (Android):</span>
              <p className="text-xs text-slate-600">
                Toca el menú de tres puntos (<code className="text-slate-800 bg-slate-200 px-1 py-0.5 rounded">⋮</code>) y selecciona <strong className="text-slate-900">"Agregar a la pantalla principal"</strong> o <strong className="text-slate-900">"Instalar aplicación"</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-indigo-900 block">🍎 En Safari (iPhone / iPad):</span>
              <p className="text-xs text-slate-600">
                Toca el botón Compartir (<code className="text-slate-800 bg-slate-200 px-1 py-0.5 rounded">⎋</code>) y selecciona <strong className="text-slate-900">"Agregar a inicio"</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE 2: ROLES Y PERMISOS DE USUARIOS (RBAC) */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
              Sección 2.3 — Seguridad del Negocio
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Roles y Permisos de Usuarios (RBAC)
            </h3>
          </div>
        </div>

        <p className="text-slate-600 text-sm">
          El sistema cuenta con <strong className="text-slate-900 font-semibold">2 niveles de acceso diferenciados</strong> para mantener la privacidad total de la contabilidad y la seguridad operativa de tu taller:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ROL 1: ADMINISTRADOR / DUEÑO */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md shadow-amber-500/20">
                  <Crown className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Administrador (Dueño)
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-200 text-amber-900 border border-amber-300">
                Acceso 100% Total
              </span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Control absoluto y confidencial de todos los módulos del software:
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Recepción de Equipos & Gestión de Taller</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Punto de Venta (POS) & Control de Inventarios</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Contabilidad completa, Caja Chica & Arqueos</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Configuración de Negocio, Creación de Usuarios y Licencias</span>
              </li>
            </ul>
          </div>

          {/* ROL 2: TÉCNICO / EMPLEADO */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/20">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Técnico / Empleado
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                Acceso Operativo
              </span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Permisos enfocados únicamente en la atención al cliente y reparación:
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Recepción de Equipos & Creación de Órdenes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gestión del Tablero de Taller (Avances y Diagnóstico)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Operación del Punto de Venta (POS)</span>
              </li>
              <li className="flex items-center gap-2 text-rose-700 font-bold pt-1 border-t border-indigo-200/80">
                <Lock className="w-4 h-4 text-rose-600 shrink-0" />
                <span>BLOQUEADO: No puede ver contabilidad ni ganancias del dueño</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
