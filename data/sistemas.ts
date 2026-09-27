export interface FAQItem {
  pregunta: string;
  respuesta: string;
}

export interface Sistema {
  slug: string;
  nombre: string;
  precio: string;
  precioAnterior?: string;
  descripcionCorta: string;
  videoYoutubeId: string;
  canalYoutubeUrl?: string;
  downloadUrl?: string;
  problemaQueResuelve: string;
  funciones: string[];
  requisitos: string[];
  faq: FAQItem[];
  esGratis?: boolean;
  proximamente?: boolean;
}

export const sistemas: Sistema[] = [
  {
    slug: "sistema-gestion-tecnicos",
    nombre: "Sistema Taller v1.0 — Gestión Técnica, POS & Red LAN",
    precio: "$2,000.00 MXN",
    precioAnterior: "$3,500.00 MXN",
    descripcionCorta: "Plataforma profesional 100% Offline y sin mensualidades para recepción de equipos en 2 min, firma digital, fotos de evidencia, WhatsApp Web embebido, etiquetas con código de barras y Punto de Venta (POS).",
    videoYoutubeId: "dQw4w9WgXcQ",
    canalYoutubeUrl: "https://www.youtube.com/@Soluci%C3%B3nDigital360",
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
        respuesta: "Es un pago único de Licencia Vitalicia. Eliminación total de límites de órdenes, clientes y productos sin cobros mensuales ni rentas recurrentes. Incluye 6 Meses de Soporte Técnico Gratis y Actualizaciones."
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
    esGratis: false,
    proximamente: true
  },
  {
    slug: "sistema-gestion-gimnasios",
    nombre: "GymWeb — Sistema de Control y Gestión de Gimnasios",
    precio: "$2,000.00 MXN",
    precioAnterior: "$3,500.00 MXN",
    descripcionCorta: "Software empresarial 100% Offline para gestión de membresías, control de asistencias, POS estilo e-commerce, notificaciones por WhatsApp en 1 clic y 6 temas visuales personalizables. Licencia vitalicia, sin mensualidades.",
    videoYoutubeId: "Y6p5-qLb_24",
    canalYoutubeUrl: "https://www.youtube.com/@Soluci%C3%B3nDigital360",
    downloadUrl: "https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/v2.1/Instalador_GymWeb_Windows_v2.1.zip",
    problemaQueResuelve: "Los gimnasios pierden ingresos por tres razones críticas: socios morosos que siguen entrando sin pagar, caos en recepción al registrar asistencias manualmente, y caja desordenada porque las ventas de suplementos se mezclan con los cobros de membresías. A diferencia de plataformas SaaS que cobran mensualidades y quedan inservibles sin internet, GymWeb opera 100% de forma local y autónoma: lleva el registro de asistencias al instante, controla qué membresías están vigentes y unifica en un solo sistema la recepción, la cobranza y la tienda POS para que nunca vuelvas a perder ni un peso.",
    funciones: [
      "Módulo 1 — Gestión de Socios y Expediente Digital: Alta de socios en menos de 1 minuto con foto tomada en vivo desde la webcam. Ficha 360° con historial completo de asistencias, pagos y compras en tienda. Buscador reactivo por nombre, folio o teléfono.",
      "Módulo 2 — Control de Asistencias y Visitas de Día: Registro rápido de entrada de socios por búsqueda o código de barras. Historial de visitas con fechas y horas. Botón express para cobrar e ingresar pases de día a clientes esporádicos sumando automáticamente el monto en la caja.",
      "Módulo 3 — Planes y Membresías Flexibles: Configura planes por día, semana, quincena, mes, trimestre, semestre o año. Planes para estudiantes, parejas, horario matutino o pases VIP. Renovación inteligente que suma vigencias sin robarle días al socio. Activa o desactiva paquetes con un solo interruptor.",
      "Módulo 4 — Cobranza y Notificaciones: Cobra membresías en efectivo, tarjeta o transferencia SPEI. Impresión de tickets en miniprinter térmica 58mm/80mm con logo del gimnasio. Exportación de movimientos a CSV/Excel.",
      "Módulo 5 — Tienda POS e-Commerce (v2.2): Catálogo visual con tarjetas estilizadas, badges automáticos (Más vendido, Stock bajo, Agotado) y buscador con atajo Ctrl+K. Categorías: Bebidas, Suplementos, Ropa Deportiva y Accesorios. Carrito reactivo con descuentos y checkout con calculadora de cambio por denominaciones.",
      "Módulo 6 — Arqueo de Caja y Reportes Financieros: Dashboard en tiempo real (socios activos, ingresos del día, visitas). Corte diario (Arqueo X/Z) unificando membresías + tienda + visitas de día, desglosado por método de pago. Exportación completa a CSV/Excel.",
      "Módulo 7 — Marca Propia, Seguridad y Modo Autónomo: 6 temas de color corporativos (Cian, Esmeralda, Naranja, Púrpura, Rojo y Oro). Sube tu logo, nombre comercial y leyendas para tickets. Perfiles de acceso (Recepcionista vs. Administrador) con contraseñas encriptadas BCrypt. Respaldo completo en 1 clic para USB, Google Drive u OneDrive."
    ],
    requisitos: [
      "Sistema Operativo: Windows 10 / Windows 11 (64 bits) — Procesador Intel Core i3 / AMD Ryzen 3 o superior.",
      "Memoria RAM: Mínimo 4 GB (Recomendado 8 GB para mayor fluidez con POS e inventario simultáneos).",
      "Almacenamiento: 500 MB de espacio disponible en disco (SSD recomendado para mayor velocidad).",
      "Impresoras de Tickets: Miniprinters térmicas de 58mm o 80mm (USB, Bluetooth o Red) para comprobantes de pago y membresía (opcional).",
      "Operación: 100% Offline — No requiere internet para operar. Compatible con escáner de código de barras USB/QR y cualquier cámara web USB o integrada de 720p/1080p."
    ],
    faq: [
      {
        pregunta: "¿El pago de la licencia es único o tendré que pagar mensualidades?",
        respuesta: "Es un pago único definitivo (Licencia Vitalicia). No cobramos anualidades, mensualidades ni comisiones por transacción. El software funciona de manera permanente en tu equipo sin depender de servidores externos ni conexión a internet."
      },
      {
        pregunta: "¿Puedo descargar y probar el sistema antes de pagar?",
        respuesta: "Sí, totalmente gratis. Descarga el instalador directamente desde esta página y obtén una versión de prueba funcional durante 7 días con todas las características activas: registra tus primeros socios, gestiona membresías, realiza ventas en la tienda y controla asistencias para comprobar que se adapta 100% a tu gimnasio."
      },
      {
        pregunta: "¿Funciona sin internet? ¿Qué pasa si se va la señal?",
        respuesta: "El sistema funciona 100% de manera local y offline. Tus socios pueden registrar su asistencia, comprar productos en la tienda y pagar su membresía sin depender de internet en ningún momento. Solo se requiere conexión al instante de enviar notificaciones por WhatsApp Web."
      },
      {
        pregunta: "¿Cómo se respalda la información de mis socios y cobros?",
        respuesta: "El sistema incluye un módulo de Respaldo en 1 Clic que genera una copia íntegra de socios, fotos, cobros e inventario (archivo único de base de datos) que puedes guardar en una memoria USB o subir a Google Drive / OneDrive. Tus datos siempre están protegidos y son portables."
      }
    ],
    esGratis: false
  },
  {
    slug: "generador-cotizaciones-pdf",
    nombre: "Generador de Cotizaciones e Impresión PDF",
    precio: "Próximamente",
    descripcionCorta: "Herramienta online para redactar y descargar presupuestos profesionales en formato PDF con el logo y datos de tu empresa.",
    videoYoutubeId: "dQw4w9WgXcQ",
    problemaQueResuelve: "Enviar cotizaciones por chat de texto o en notas manuscritas da un aspecto informal a tus servicios. Con esta herramienta podrás generar cotizaciones formales, limpias e impecables en PDF para impresionar a tus prospectos y cerrar más ventas.",
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
        pregunta: "¿Cuándo estará disponible esta herramienta?",
        respuesta: "El generador de cotizaciones PDF se encuentra actualmente en fase final de optimización y estará disponible muy pronto."
      }
    ],
    proximamente: true
  },
  {
    slug: "sistema-gestion-citas",
    nombre: "Sistema de Gestión de Citas y Agendamiento Online",
    precio: "$1,500.00 MXN",
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
    esGratis: false,
    proximamente: true
  }
];

export function getSistemaBySlug(slug: string): Sistema | undefined {
  return sistemas.find((s) => s.slug === slug);
}
