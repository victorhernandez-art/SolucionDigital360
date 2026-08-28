export interface FAQItem {
  pregunta: string;
  respuesta: string;
}

export interface Sistema {
  slug: string;
  nombre: string;
  precio: string;
  descripcionCorta: string;
  videoYoutubeId: string;
  problemaQueResuelve: string;
  funciones: string[];
  requisitos: string[];
  faq: FAQItem[];
  esGratis: boolean;
}

export const sistemas: Sistema[] = [
  {
    slug: "sistema-gestion-tecnicos",
    nombre: "Sistema Taller v1.0 — Gestión Técnica, POS & Red LAN",
    precio: "$2,000.00 MXN",
    descripcionCorta: "Plataforma profesional 100% Offline y sin mensualidades para recepción de equipos en 2 min, firma digital, fotos de evidencia, WhatsApp Web embebido, etiquetas con código de barras y Punto de Venta (POS).",
    videoYoutubeId: "dQw4w9WgXcQ",
    problemaQueResuelve: "Los centros de servicio técnico sufren pérdidas financieras y desorden en mostrador por tickets de papel extraviados, reclamos por fallas/rayones previos no documentados, falta de control en refacciones y cobros mensuales excesivos de software en la nube. Sistema Taller v1.0 soluciona el caos automatizando la recepción en 4 pasos con patrón de desbloqueo, firma digital táctil, evidencias fotográficas, notificaciones por WhatsApp en 1 clic, impresión de etiquetas térmicas con Código de Barras (Code 128) y un arqueo exacto de caja chica en red local sin depender de internet.",
    funciones: [
      "Recepción ultrarrápida en 2 minutos: Búsqueda predictiva de cliente, tipo de equipo, marca, modelo y número de serie/IMEI.",
      "Seguridad del dispositivo: Patrón de desbloqueo táctil interactivo (3x3) y registro cifrado de contraseña/PIN de pantalla.",
      "Evidencia fotográfica y diagnósticos rápidos: Captura de fotos de rayones/estrelladuras previas con la cámara de la PC, tablet o celular.",
      "Firma Digital Táctil & Cotización: Captura de firma del cliente en pantalla y registro de presupuesto con anticipo en efectivo o transferencia.",
      "Impresión de 3 comprobantes: Ticket térmico (80mm), Hoja Carta con talón desprendible y Etiqueta Adhesiva (40x30mm) con Código de Barras Code 128.",
      "Conexión Multi-Dispositivo en Red Local (LAN): Conecta celulares, tablets o laptops secundarias vía Código QR sin pagar licencias extra.",
      "Tablero Kanban de Gestión de Reparaciones: Seguimiento por estados (Recibido, En Diagnóstico, Esperando Pieza, Listo para Entrega, Entregado).",
      "Notificaciones por WhatsApp Web Embebido: Envíos en 1 clic de avisos '¡Tu equipo está listo!', cotizaciones y estados de avance.",
      "Punto de Venta (POS) e Inventario: Venta de accesorios y refacciones con lector de barras USB y compresión de fotos WebP.",
      "Caja Chica & Arqueo Físico de Efectivo: Libro diario contable, registro de gastos operativos y arqueo desglose de billetes y monedas."
    ],
    requisitos: [
      "Sistema Operativo: Windows 10 / Windows 11 (x64) o macOS Catalina o superior (Intel y Apple Silicon M1/M2/M3/M4).",
      "Memoria RAM: Mínimo 4 GB RAM (Recomendado 8 GB).",
      "Espacio en Disco: 300 MB libres para la aplicación e historial de base de datos SQLite.",
      "Impresoras compatibles: Miniprinter Térmica de 80mm (USB/Red), Impresora Carta (Inyección/Láser) e Impresora de Etiquetas Adhesivas (40x30 mm).",
      "Periféricos recomendados: Lector / Pistola de Códigos de Barras USB (Plug & Play) y Cámara Web / Celular para evidencia fotográfica.",
      "Operación: 100% Offline (No requiere conexión a Internet). Funciona en Red Local (Wi-Fi LAN) para vincular celulares y tablets."
    ],
    faq: [
      {
        pregunta: "¿Puedo usar el sistema si se va la señal de Internet en mi colonia?",
        respuesta: "Sí, 100%. Sistema Taller es una aplicación completamente offline con base de datos nativa SQLite en tu computadora. El sistema seguirá funcionando a la perfección para recibir equipos, imprimir tickets y cobrar en el POS sin internet."
      },
      {
        pregunta: "¿Qué pasa si quiero usar el sistema en varias computadoras o celulares dentro del mismo taller?",
        respuesta: "No necesitas pagar licencias adicionales. La computadora principal (Servidor) genera un Código QR de conexión LAN para enlazar tus celulares (Android/iPhone), tablets o laptops secundarias a través de tu red Wi-Fi local sin costo extra."
      },
      {
        pregunta: "¿El costo de $2,000.00 MXN es un pago único o suscripción mensual?",
        respuesta: "Es un pago único de Licencia Vitalicia. Eliminación total de límites de órdenes, clientes y productos sin cobros mensuales ni rentas recurrentes. Incluye 1 Año Completo de Actualizaciones Gratuitas y Soporte Técnico."
      },
      {
        pregunta: "¿Cómo se imprimen los comprobantes y etiquetas de los equipos?",
        respuesta: "El sistema permite emitir 3 formatos: Ticket Térmico de 80mm para el cliente, Hoja Carta membretada con talón desprendible y Etiqueta Térmica Adhesiva (40x30mm) con el folio y Código de Barras Code 128 para pegarlo en la tapa trasera del equipo."
      },
      {
        pregunta: "¿Se pierde mi información al actualizar el sistema o respaldar?",
        respuesta: "No, el sistema cuenta con respaldos de seguridad en 1 clic (taller.db) y las actualizaciones se aplican preservando el 100% de tus clientes, historial de reparaciones y contabilidad intacta."
      }
    ],
    esGratis: false
  },
  {
    slug: "sistema-inventario-ventas",
    nombre: "Sistema de Control de Inventarios y Punto de Venta (POS)",
    precio: "$149 USD",
    descripcionCorta: "Solución ágil y robusta para controlar inventarios, ventas diarias, caja chica, proveedores y alertas de stock en tiempo real.",
    videoYoutubeId: "dQw4w9WgXcQ",
    problemaQueResuelve: "El descuadre de inventarios, la lentitud en la atención al cliente y la falta de reportes claros de ganancia impiden el crecimiento de tiendas y distribuidores. Nuestra solución POS simplifica la venta rápida y garantiza un conteo preciso de cada producto que entra y sale de tu negocio.",
    funciones: [
      "Punto de Venta (POS) super rápido compatible con lector de código de barras.",
      "Categorización de productos por familias, marcas, modelos y variantes.",
      "Alertas automáticas cuando un producto llega al stock mínimo reordenable.",
      "Gestión de proveedores, registro de compras e ingreso de facturas.",
      "Cierre de caja ciego (arqueo de caja) para evitar robos hormiga y discrepancias.",
      "Generación de reportes exportables a Excel y PDF sobre ventas e inventario valorizado."
    ],
    requisitos: [
      "Cualquier PC o Laptop con Windows, macOS o Linux.",
      "Navegador web actualizado.",
      "Compatible con lectores de código de barras USB/Bluetooth e impresoras de tickets."
    ],
    faq: [
      {
        pregunta: "¿Puedo migrar mi catálogo de productos desde Excel?",
        respuesta: "Sí, proporcionamos una plantilla estandarizada en Excel para que cargues miles de productos en pocos minutos de manera masiva."
      },
      {
        pregunta: "¿Admite múltiples usuarios con diferentes permisos?",
        respuesta: "Sí, puedes crear usuarios con rol de Administrador (acceso total) y Vendedor (solo caja y ventas sin ver costos)."
      },
      {
        pregunta: "¿Requiere instalación de programas complejos?",
        respuesta: "No, es 100% basado en web y accesible de inmediato desde cualquier navegador sin configuraciones difíciles."
      }
    ],
    esGratis: false
  },
  {
    slug: "generador-cotizaciones-pdf",
    nombre: "Generador de Cotizaciones e Impresión PDF",
    precio: "Gratis",
    descripcionCorta: "Herramienta online gratuita para redactar y descargar presupuestos profesionales en formato PDF con el logo de tu empresa.",
    videoYoutubeId: "dQw4w9WgXcQ",
    problemaQueResuelve: "Enviar cotizaciones por chat de texto o en notas manuscritas da un aspecto informal a tus servicios. Con esta herramienta gratuita puedes generar cotizaciones formales, limpias e impecables en PDF para impresionar a tus prospectos y cerrar más ventas.",
    funciones: [
      "Personalización instantánea con el logotipo y datos fiscales de tu empresa.",
      "Cálculo automático de subtotales, desgloses de impuestos (IVA/IGV) y descuentos.",
      "Campos para términos de pago, tiempo de entrega y validez de la oferta.",
      "Descarga rápida en PDF listo para enviar por correo o WhatsApp.",
      "Privacidad garantizada: no almacenamos los datos de tus clientes en servidores externos."
    ],
    requisitos: [
      "Navegador web en Computadora o Dispositivo Móvil.",
      "Conexión a Internet."
    ],
    faq: [
      {
        pregunta: "¿Es verdaderamente 100% gratuito?",
        respuesta: "Sí, es una herramienta gratuita desarrollada por Solución Digital 360 para apoyar a emprendedores y técnicos a formalizar su presencia comercial."
      },
      {
        pregunta: "¿Tiene límite de cotizaciones creadas?",
        respuesta: "Ninguno. Puedes emitir cuantas cotizaciones necesites sin restricción ni marcas de agua."
      }
    ],
    esGratis: true
  },
  {
    slug: "sistema-gestion-citas",
    nombre: "Sistema de Gestión de Citas y Agendamiento Online",
    precio: "$119 USD",
    descripcionCorta: "Plataforma para reservas de citas en línea, control de agenda técnica y recordatorios automáticos por WhatsApp.",
    videoYoutubeId: "dQw4w9WgXcQ",
    problemaQueResuelve: "Las ausencias sin aviso y el desorden al agendar por mensajes provocan huecos en la agenda y pérdida de tiempo. Este sistema permite a tus clientes reservar su turno en línea 24/7 de forma rápida y sencilla.",
    funciones: [
      "Calendario de disponibilidad interactivo en tiempo real.",
      "Reserva de citas 24/7 sin intervención manual.",
      "Recordatorios automáticos antes de la cita para reducir ausencias.",
      "Panel de administración para múltiples especialistas o técnicos."
    ],
    requisitos: [
      "Funciona en cualquier navegador web moderno.",
      "Conexión a Internet."
    ],
    faq: [
      {
        pregunta: "¿Mis clientes deben registrarse para pedir cita?",
        respuesta: "No, pueden reservar ingresando sus datos básicos en menos de 1 minuto."
      }
    ],
    esGratis: false
  }
];

export function getSistemaBySlug(slug: string): Sistema | undefined {
  return sistemas.find((s) => s.slug === slug);
}
