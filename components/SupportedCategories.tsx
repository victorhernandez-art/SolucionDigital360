import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Tv, 
  Gamepad2, 
  WashingMachine, 
  Headphones,
  CheckCircle2,
  Wrench
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  badge: string;
  icon: any;
  description: string;
  examples: string[];
}

const categories: CategoryItem[] = [
  {
    id: 'celulares',
    name: 'Celulares & Smartphones',
    badge: 'Multimarca',
    icon: Smartphone,
    description: 'Gestión de reparaciones para todas las marcas (Apple iPhone, Samsung, Xiaomi, Motorola, Huawei, OPPO, ZTE, etc.).',
    examples: ['Cambio de pantalla / display', 'Centro de carga / puerto USB-C', 'Baterías y tapa trasera', 'Rebalanceo de software']
  },
  {
    id: 'tablets',
    name: 'Tablets & iPads',
    badge: 'iOS / Android',
    icon: Tablet,
    description: 'Control de órdenes de servicio para iPads, Samsung Galaxy Tab, Lenovo, Amazon Kindle y tablets chinas.',
    examples: ['Digitalizadores táctiles', 'Fallas de carga y batería', 'Diagnóstico de placa base', 'Pin de desbloqueo']
  },
  {
    id: 'laptops',
    name: 'Laptops, PC & Mac',
    badge: 'Windows / macOS',
    icon: Laptop,
    description: 'Administración de servicio técnico para Laptops gamer, PC de escritorio, All-in-One, MacBooks e iMacs.',
    examples: ['Mantenimiento preventivo', 'Rebaling / Chip de video', 'Formateo y limpieza', 'Reparación de bisagras']
  },
  {
    id: 'smart_tv',
    name: 'Smart TVs & Pantallas',
    badge: 'LED / OLED / QLED',
    icon: Tv,
    description: 'Módulo listo para talleres de reparación de televisiones LED, OLED, Smart TV LG, Samsung, Sony, TCL, Hisense.',
    examples: ['Reemplazo de tiras LED', 'Tarjetas Main / Fuente', 'Fallas de audio o encendido', 'Tarjetas T-Con']
  },
  {
    id: 'consolas',
    name: 'Consolas de Videojuegos',
    badge: 'Gaming',
    icon: Gamepad2,
    description: 'Recepción de consolas PlayStation 4/5, Xbox One/Series, Nintendo Switch y mandos/controles.',
    examples: ['Puerto HDMI roto', 'Drift en joysticks / palancas', 'Limpieza y pasta térmica', 'Fallas de disco duro/SSD']
  },
  {
    id: 'linea_blanca',
    name: 'Línea Blanca & Electrodomésticos',
    badge: 'Hogar & Comercio',
    icon: WashingMachine,
    description: 'Adaptado para centros de servicio técnico de electrodomésticos, tarjetas electrónicas de potencia y equipos del hogar.',
    examples: ['Lavadoras y secadoras', 'Refrigeradores inverter', 'Microondas y hornos', 'Tarjetas de control electrónico']
  },
  {
    id: 'audio_personalizados',
    name: 'Audio & Equipos Personalizados',
    badge: 'Electrónica General',
    icon: Headphones,
    description: 'Soporte para recepción de amplificadores, bocinas amplificadas, audífonos profesionales y proyectos electrónicos.',
    examples: ['Bocinas Bluetooth', 'Amplificadores de potencia', 'Mezcladoras de audio', 'Equipos a la medida']
  }
];

export default function SupportedCategories() {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
          <Wrench className="w-4 h-4 text-indigo-600" /> Sistema Multirrubro Adaptable
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Diseñado para Todo Tipo de Talleres de Reparación
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Ya sea que repares smartphones, computadoras, consolas o línea blanca, <strong className="text-slate-900 font-semibold">Sistema Taller v1.0</strong> incluye las categorías y plantillas de diagnóstico para tu negocio.
        </p>
      </div>

      {/* Grid de Categorías de Equipos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-white text-indigo-600 shadow-sm border border-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  {cat.badge}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Lista de Servicios / Ejemplos */}
              <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Servicios y Reparaciones Frecuentes:
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {cat.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
