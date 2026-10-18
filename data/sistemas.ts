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
    nombre: "FixPOS Pro — Gestión Técnica, POS & Red LAN",
    precio: "$2,000.00 MXN",
    precioAnterior: "$3,500.00 MXN",
    descripcionCorta: "Plataforma empresarial 100% Offline y sin mensualidades con 8 módulos ejecutivos: Recepción Express con firma digital biométrica, cámara remota por QR, trazabilidad por IMEI/Serie, multiformato de impresión térmica y etiquetas, Punto de Venta (POS) con deducción de refacciones, inteligencia financiera con devengo proporcional (COGS), auditoría ciega de caja (Corte Z) y Bóveda Local de Datos.",
    videoYoutubeId: "",
    canalYoutubeUrl: "https://www.youtube.com/@Soluci%C3%B3nDigital360",
    problemaQueResuelve: "Los centros de servicio técnico sufren pérdidas financieras por falta de blindaje legal, reclamos de clientes por fallas previas no documentadas, fotos desordenadas en teléfonos personales, dependencia de internet en programas SaaS con costosas mensualidades en dólares, y falta de precisión contable al no deducir el costo real de las refacciones (COGS) en los anticipos. FixPOS Pro elimina estos problemas con 8 módulos empresariales: recepción express con firma biométrica y patrón gráfico de 9 puntos, cámara pericial remota instantánea por QR sin cables, bitácora inmutable por Serie/IMEI, impresión multiformato (térmico 80/58mm, carta y etiquetas adhesivas con código de barras), punto de venta con control anti-desabasto, inteligencia financiera con principio de devengo proporcional, arqueo físico con Corte Z y Bóveda Local de Datos en el Escritorio inmune a desinstalaciones.",
    funciones: [
      "Módulo 1 — Recepción Express & Blindaje Contractual: Captura de firma digital biométrica en pantalla (mouse o táctil) vinculada de forma inmutable al contrato y póliza de recepción; patrón gráfico de 9 puntos y claves de seguridad; checklist preventivo certificado de condiciones físicas y funcionales; y autocompletado predictivo de clientes en milisegundos.",
      "Módulo 2 — Inspección Pericial & Cámara Remota por QR: Escaneo de código QR desde cualquier smartphone para transmitir fotografías de evidencia (golpes, fisuras, número de serie) directamente a la orden en la PC en tiempo real sin cables ni aplicaciones extras; compresión inteligente integrada WebP; y auditoría fotográfica histórica antes, durante y después de la reparación.",
      "Módulo 3 — Mesa de Control Operativo & Trazabilidad Técnica: Tablero dinámico de estados en tiempo real (Recibido, En Diagnóstico, Esperando Refacción, En Reparación, Terminado, Entregado); detección automática de historial por Serie/IMEI con alertas de servicios pasados y garantías; y bitácora inmutable de intervenciones técnicas y tiempos de ciclo.",
      "Módulo 4 — Centro Multiformato de Impresión & Notificaciones Digitales: Tickets térmicos de alta definición de 80mm y 58mm con logotipo, firma digital y código de barras Code 128 (Subset B) + QR; hojas membretadas tamaño carta con talón desprendible de custodia interna; rotulación de etiquetas adhesivas para rollo continuo de 80mm y compactas (40x30 / 50x30mm); e integración con WhatsApp Web en 1 clic para despacho de notificaciones y comprobantes en PDF.",
      "Módulo 5 — Punto de Venta (POS) & Control de Refacciones e Insumos: Operación con lectores de código de barras USB Plug & Play; descuento automático de stock de piezas en órdenes de servicio computando el costo exacto de la refacción; registro ágil de clientes sobre la marcha desde el carrito de venta; y semáforo visual anti-desabasto (Disponible, Stock Bajo, Agotado).",
      "Módulo 6 — Inteligencia Financiera & Principio de Devengo Proporcional (COGS): Deducción automática del costo de adquisición de refacciones (COGS) sobre los ingresos de mano de obra; devengo contable proporcional en anticipos para evitar distorsiones en el flujo diario; gestión de cuentas por pagar a proveedores a crédito (7, 15, 30 días) descontando caja únicamente con abonos reales; y reportes exportables a Excel/CSV.",
      "Módulo 7 — Control de Turnos, Arqueo Físico de Efectivo & Corte Z: Apertura formal auditada con fondo de cambio inicial; auditoría ciega de efectivo comparando el conteo físico de billetes/monedas contra el flujo teórico del sistema; y emisión de comprobante de Corte Z consolidado por método de pago (Efectivo, Tarjeta, Transferencia), gastos y firmas de responsabilidad.",
      "Módulo 8 — Seguridad Basada en Roles (RBAC) & Bóveda Local de Datos: Rol Administrador (Dirección) con control total de márgenes, costos directos y cierres de caja; Rol Técnico (Operativo) restringido a diagnóstico, recepción y cobros sin acceso a finanzas globales; y Bóveda Local de Datos que reside en una carpeta visible en el Escritorio del usuario, inmune a desinstalaciones de software o formateos accidentales."
    ],
    requisitos: [
      "Sistema Operativo: Windows 10 / Windows 11 (x64) o macOS Catalina o superior (Intel y Apple Silicon M1/M2/M3/M4).",
      "Memoria RAM: Mínimo 4 GB RAM (Recomendado 8 GB).",
      "Espacio en Disco: 300 MB libres para la aplicación e historial de base de datos SQLite.",
      "Impresoras compatibles: Miniprinter Térmica de 80mm y 58mm (USB/Red), Impresora Carta (Inyección/Láser) e Impresora de Etiquetas Adhesivas (40x30 / 50x30 mm o rollo continuo 80mm).",
      "Periféricos recomendados: Lector / Pistola de Códigos de Barras USB (Plug & Play) y cualquier Smartphone con cámara para transmitir fotos por QR.",
      "Operación: 100% Offline (No requiere conexión a Internet). Servidor web integrado para vincular celulares y tablets en Red Local (Wi-Fi LAN)."
    ],
    faq: [
      {
        pregunta: "¿Cómo funciona la Cámara Remota por QR sin instalar apps en el celular?",
        respuesta: "Desde la pantalla de recepción en tu PC, el sistema muestra un Código QR dinámico. El técnico o recepcionista lo escanea con la cámara de su teléfono móvil (Android o iPhone) conectado al Wi-Fi del taller y se abre instantáneamente la interfaz de captura. Al tomar las fotos de evidencias (golpes, número de serie, rayones), estas se comprimen en WebP y se transfieren a la orden en la PC en tiempo real sin cables, sin Bluetooth y sin instalar nada."
      },
      {
        pregunta: "¿Qué es el Principio de Devengo Proporcional (COGS) en las reparaciones?",
        respuesta: "En otros sistemas, si cobras un anticipo por una reparación que requiere una pantalla costosa, el reporte financiero muestra una ganancia ficticia en el día. FixPOS Pro aplica el principio de devengo contable proporcional: reconoce el Costo de Bienes Vendidos (COGS) de forma balanceada con el anticipo y deduce la refacción del almacén, mostrando la rentabilidad neta real de mano de obra y evitando falsas expectativas en el flujo de caja."
      },
      {
        pregunta: "¿Dónde se guardan mis datos y por qué es una Bóveda Local protegida?",
        respuesta: "Tus datos nunca se suben a nubes de terceros que puedan suspenderte el acceso por impago. La base de datos reside en una Bóveda Local en una carpeta visible directamente en el Escritorio de tu PC. Es completamente inmune a desinstalaciones del sistema o actualizaciones, y puedes copiarla a una memoria USB en 1 clic para respaldo total."
      },
      {
        pregunta: "¿Qué impresoras y formatos de comprobante soporta el sistema?",
        respuesta: "FixPOS Pro incluye centro multiformato: tickets térmicos estándar de 80mm y 58mm con logotipo y código de barras Code 128 (Subset B) + QR, hojas membretadas tamaño carta con talón desprendible para custodia interna, y rotulación de etiquetas adhesivas (40x30mm, 50x30mm y rollo continuo de 80mm) legibles por cualquier pistola de códigos de barras."
      },
      {
        pregunta: "¿El costo de $2,000.00 MXN es un pago único o suscripción mensual?",
        respuesta: "Es un pago único de Licencia Vitalicia. Cero mensualidades, sin costos ocultos y sin límites de órdenes, clientes ni inventario. Incluye 6 Meses de Soporte Técnico Especializado y Actualizaciones."
      },
      {
        pregunta: "¿Puedo vincular varias computadoras y celulares dentro del taller?",
        respuesta: "Sí. FixPOS Pro incluye su propio servidor web LAN integrado. Con un solo clic se genera el código de enlace para conectar tablets, celulares y laptops secundarias conectadas al Wi-Fi de tu taller sin pagar licencias adicionales por cada dispositivo."
      }
    ],
    esGratis: false,
    proximamente: false
  },
  {
    slug: "sistema-gestion-gimnasios",
    nombre: "GymWeb — Sistema de Control y Gestión de Gimnasios",
    precio: "$2,000.00 MXN",
    precioAnterior: "$3,500.00 MXN",
    descripcionCorta: "Software empresarial 100% Offline para gestión de membresías, control de asistencias, POS estilo e-commerce, envío de tickets por WhatsApp, ventas a crédito con reporte individual por socio y configuración multi-país automática (20 países con moneda local y LADA). Licencia vitalicia, sin mensualidades.",
    videoYoutubeId: "bkRAztASgNY",
    canalYoutubeUrl: "https://www.youtube.com/@Soluci%C3%B3nDigital360",
    downloadUrl: "https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/v2.6.1/Instalador_GymWeb_Windows_v2.6.zip",
    problemaQueResuelve: "Los gimnasios pierden ingresos por socios morosos, caos en recepción y falta de control en las ventas a crédito o compras en tienda. A diferencia de plataformas SaaS que cobran mensualidades y quedan inservibles sin internet, GymWeb opera 100% offline: automatiza el registro de asistencias, envía tickets de comprobante de pago o venta directamente por WhatsApp, permite dar a crédito productos o membresías generando reportes de la cuenta individual por cada socio, y se adapta en automático a 20 países asignando el símbolo real de la moneda local y su LADA telefónica oficial.",
    funciones: [
      "Módulo 1 — Gestión de Socios y Expediente Digital: Alta de socios en menos de 1 minuto con foto tomada en vivo desde la webcam. Ficha 360° con historial completo de asistencias, pagos y compras en tienda. Buscador reactivo por nombre, folio o teléfono.",
      "Módulo 2 — Control de Asistencias y Visitas de Día: Registro rápido de entrada de socios por búsqueda o código de barras. Historial de visitas con fechas y horas. Botón express para cobrar e ingresar pases de día a clientes esporádicos sumando automáticamente el monto en la caja.",
      "Módulo 3 — Planes y Membresías Flexibles: Configura planes por día, semana, quincena, mes, trimestre, semestre o año. Planes para estudiantes, parejas, horario matutino o pases VIP. Renovación inteligente que suma vigencias sin robarle días al socio. Activa o desactiva paquetes con un solo interruptor.",
      "Módulo 4 — Cobranza, Tickets por WhatsApp y Ventas a Crédito: Cobra membresías en efectivo, tarjeta o transferencia SPEI. Envío de ticket digital de comprobante de pago de membresía o de venta de producto directamente por WhatsApp al socio con 1 clic. Opción de dar a crédito productos de la tienda o membresías, llevando el saldo pendiente y generando un reporte detallado de la cuenta individual por cada socio (estado de cuenta individual y lista de socios deudores). Impresión de tickets en miniprinter térmica 58mm/80mm con logo del gimnasio.",
      "Módulo 5 — Tienda POS e-Commerce (v2.2): Catálogo visual con tarjetas estilizadas, badges automáticos (Más vendido, Stock bajo, Agotado) y buscador con atajo Ctrl+K. Categorías: Bebidas, Suplementos, Ropa Deportiva y Accesorios. Carrito reactivo con descuentos, soporte de ventas de contado o a crédito asignadas a la cuenta del socio, y checkout con calculadora de cambio por denominaciones.",
      "Módulo 6 — Arqueo de Caja y Reportes Financieros: Dashboard en tiempo real (socios activos, ingresos del día, visitas, cuentas por cobrar). Corte diario (Arqueo X/Z) unificando membresías + tienda + visitas de día, desglosado por método de pago y créditos otorgados. Exportación completa a CSV/Excel.",
      "Módulo 7 — Configuración Multi-País y Multimoneda Automática (20 Países): Compatible con 20 países (México, Argentina, Colombia, Chile, Perú, Ecuador, Guatemala, Costa Rica, Panamá, Honduras, El Salvador, Nicaragua, República Dominicana, Bolivia, Paraguay, Uruguay, Venezuela, Puerto Rico, España y Estados Unidos). Al seleccionar tu país en el apartado de Configuración, el sistema muestra de forma automática el símbolo real de tu moneda local ($ MXN, $ ARS, $ COP, $ CLP, S/ PEN, $ USD, Q GTQ, ₡ CRC, B/. PAB, L HNL, C$ NIO, RD$ DOP, Bs BOB, ₲ PYG, $U UYU, Bs. VES, € EUR) y la LADA telefónica internacional correspondiente para los envíos de tickets por WhatsApp.",
      "Módulo 8 — Marca Propia, Seguridad y Modo Autónomo: 6 temas de color corporativos (Cian, Esmeralda, Naranja, Púrpura, Rojo y Oro). Sube tu logo, nombre comercial y leyendas para tickets. Perfiles de acceso (Recepcionista vs. Administrador) con contraseñas encriptadas BCrypt. Respaldo completo en 1 clic para USB, Google Drive u OneDrive.",
      "Módulo 9 — Red Local (LAN) y Sincronización en Tiempo Real: Conecta otros dispositivos (celulares, tablets u otras computadoras) a la misma red Wi-Fi escaneando un código QR o abriendo la dirección de acceso de tu red desde el apartado Configuración → Red LAN (Móvil). Desde cualquier dispositivo conectado puedes realizar cambios, registrar visitas, consultar reportes o realizar cobros, y todo lo que hagan se guarda en tiempo real en la página principal del sistema (PC principal), sin necesidad de internet. Instálalo como aplicación en la pantalla de inicio de Android (Chrome) o iPhone/iPad (Safari)."
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
        pregunta: "¿Cómo funciona la configuración de país, moneda y LADA para WhatsApp?",
        respuesta: "En el apartado de Configuración de GymWeb, seleccionas tu país (soporta 20 países de Latinoamérica, EE.UU. y España) y en automático el sistema configura el símbolo real de tu moneda local en todos los módulos y la LADA telefónica correspondiente para enviar comprobantes de pago por WhatsApp en 1 solo clic."
      },
      {
        pregunta: "¿Puedo dar membresías y productos a crédito?",
        respuesta: "Sí. El sistema permite otorgar créditos tanto en mensualidades/membresías como en productos de la tienda asignándolos a la ficha del socio. Puedes registrar abonos parciales y generar en cualquier momento el reporte de la cuenta individual por socio con el desglose exacto de su saldo deudor."
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
    nombre: "Cotizador — Emisión de Cotizaciones, Clientes y Catálogo",
    precio: "Gratis",
    descripcionCorta: "Software profesional para Windows 100% Offline y sin costo. Emisión de cotizaciones en PDF con logotipo corporativo, buscador en vivo, duplicación ágil, exportación ejecutiva a Excel (.xlsx), cartera de clientes, catálogo mixto y soporte multi-dispositivo por Wi-Fi.",
    videoYoutubeId: "sMU1aGfVEs8",
    canalYoutubeUrl: "https://www.youtube.com/@SoluciónDigital360",
    downloadUrl: "https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/v1.0/Instalador_Cotizador.exe",
    problemaQueResuelve: "Enviar cotizaciones por chat de texto, notas en papel o formatos informales de Word genera desconfianza y hace perder ventas ante la competencia. Además, las plataformas en la nube exigen rentas mensuales obligatorias y fallan cuando se cae el internet. Cotizador soluciona esto de raíz: es un software de escritorio autónomo y gratuito que genera presupuestos impecables con membrete, logotipo y datos fiscales en PDF listos para imprimir o enviar por WhatsApp, calcula impuestos automáticamente, incluye exportación ejecutiva a Excel con fórmulas dinámicas de suma, y permite cotizar desde cualquier teléfono celular en red local mediante código QR.",
    funciones: [
      "Módulo 1 — Emisión Ágil de Cotizaciones y Buscador Inteligente: Generación de presupuestos con folio, fechas de emisión y vigencia, y buscador interactivo en vivo por nombre, código interno (SKU) o precio.",
      "Módulo 2 — Cálculo Automático de Impuestos e IVA por País: Desglose inmediato de tasas habituales (16%, 8%, 0%) o porcentaje personalizado con cálculo en tiempo real de subtotal, IVA y total general.",
      "Módulo 3 — Duplicación y Clonación en 1 Clic: Clona cualquier cotización previa con todas sus partidas y precios con un solo botón para generar variantes o nuevos presupuestos sin recapturar.",
      "Módulo 4 — Documentos en PDF con Membrete Corporativo: Emisión de cotizaciones formales en PDF con logotipo de tu empresa, datos fiscales, teléfono, dirección física y firma oficial automática del vendedor (ATENTAMENTE).",
      "Módulo 5 — Reportes Analíticos y Exportación a Excel (.xlsx): Filtro por rango de fechas, presentación ejecutiva con membrete, logotipo, estados de venta en colores y fórmulas dinámicas de suma automática (=SUM).",
      "Módulo 6 — Cartera de Clientes y Condiciones de Crédito: Control de clientes con RFC/NIT, plazos de crédito (Normal, 15 días, 30 días), teléfono y dirección para cotizar en segundos.",
      "Módulo 7 — Catálogo Mixto de Productos y Servicios: Registro detallado de productos físicos con SKU y servicios técnicos con mano de obra y horas, categorías rápidas e importación masiva desde Excel/CSV.",
      "Módulo 8 — Conexión Multi-Dispositivo en Red Local (Wi-Fi): Código QR interactivo para conectar celulares Android o iPhone/iPad en la misma red Wi-Fi y cotizar en tiempo real sin cables ni internet.",
      "Módulo 9 — Motor PHP 8 Portable y Base de Datos SQLite: 100% autónomo y portable. No requiere instalar XAMPP, MySQL ni configuraciones de servidor; incluye instalador nativo para Windows.",
      "Módulo 10 — Actualizaciones Automáticas en 1 Clic: Conectado a GitHub Releases para recibir mejoras con un solo clic protegiendo siempre tu base de datos y archivos comerciales."
    ],
    requisitos: [
      "Sistema Operativo: Windows 10 / Windows 11 (64 bits).",
      "Memoria RAM: Mínimo 2 GB de RAM (Recomendado 4 GB).",
      "Almacenamiento: 100 MB de espacio disponible en disco.",
      "Operación: 100% Offline — No requiere internet para operar localmente. Soporta conexión móvil por Wi-Fi mediante Código QR."
    ],
    faq: [
      {
        pregunta: "¿El sistema Cotizador es totalmente gratis o tendré que pagar mensualidades?",
        respuesta: "Es 100% gratuito. Es un obsequio exclusivo de Solución Digital 360 para apoyar el crecimiento de tu negocio o taller. No cobramos mensualidades, anualidades ni comisiones."
      },
      {
        pregunta: "¿Necesito instalar XAMPP, MySQL o configurar un servidor?",
        respuesta: "No. El instalador oficial incluye su propio motor PHP 8 portable y base de datos SQLite integrada. Funciona de manera autónoma y 100% offline sin necesidad de configuraciones técnicas."
      },
      {
        pregunta: "¿Cómo funciona la exportación a Excel y la generación de PDF?",
        respuesta: "Al pulsar 'Descargar PDF' se crea al instante un presupuesto formal con el membrete y logotipo de tu empresa. Además, en el módulo de reportes puedes exportar tus cotizaciones a hojas de cálculo de Excel (.xlsx) con presentación ejecutiva y fórmulas de suma automática."
      },
      {
        pregunta: "¿Puedo usarlo desde mi teléfono celular o tablet?",
        respuesta: "Sí. Desde la computadora principal pulsa el botón 'Conectar Móvil / Wi-Fi', escanea el código QR desde tu teléfono o tablet conectado a la misma red Wi-Fi y podrás emitir cotizaciones directamente desde tu dispositivo móvil."
      },
      {
        pregunta: "¿Cómo descargo e instalo el programa?",
        respuesta: "Haz clic en el botón 'Descargar Cotizador Gratis' para obtener Instalador_Cotizador.exe, ejecútalo en tu equipo con Windows y en pocos segundos el asistente dejará el acceso directo listo en tu Escritorio para comenzar a trabajar."
      }
    ],
    esGratis: true,
    proximamente: false
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
