# 📜 Historial de Cambios y Registro de Versiones (Changelog)
## Solución Digital 360 — Plataforma Web SaaS

## 📌 Versión 1.5.1 — Octubre 2026: Video Tutorial Oficial de FixPOS Pro & Optimización de Métricas de YouTube
- **🎬 Integración del Video Tutorial Oficial de FixPOS Pro:**
  - Asignación del identificador de video oficial `iXte4oZQQyo` en la ficha técnica de FixPOS Pro (`data/sistemas.ts`).
  - Habilitación del reproductor en la página oficial del sistema (`/sistemas/sistema-gestion-tecnicos`) bajo la sección *Demostraciones y Tutoriales en Video*.
- **📊 Garantía Técnica de Contabilización de Reproducciones (YouTube Analytics):**
  - Refactorización de `components/YoutubeEmbed.tsx` para emplear el reproductor nativo embebido oficial de YouTube (`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`).
  - Eliminación del autoplay forzado que el algoritmo antifraude de YouTube suele descartar o penalizar en las métricas de visualización.
  - El usuario detona la reproducción de forma directa y deliberada sobre el reproductor de YouTube, asegurando que toda visualización de más de 30 segundos sea registrada y sumada al canal `@SoluciónDigital360` y a las estadísticas de YouTube Studio bajo tráfico de fuentes externas.
  - Inclusión de botón de acción complementario para *"Ver directamente en YouTube"* y enlace oficial al canal.

## 📌 Versión 1.5.0 — Octubre 2026: FixPOS Pro — Arquitectura Empresarial de 8 Módulos & Comparativa Estratégica vs SaaS
- **🏛️ Integración de la Arquitectura Oficial de 8 Módulos Ejecutivos:**
  - Actualización integral de la ficha técnica de FixPOS Pro (`data/sistemas.ts`) estructurando los 8 bloques empresariales:
    1. *Módulo 1: Recepción Express & Blindaje Contractual* (Firma digital biométrica en pantalla, patrón gráfico 9 puntos, checklist preventivo certificado y autocompletado predictivo).
    2. *Módulo 2: Inspección Pericial & Cámara Remota por QR* (Escaneo instantáneo con cualquier smartphone, compresión inteligente WebP y auditoría fotográfica histórica antes/durante/después).
    3. *Módulo 3: Mesa de Control Operativo & Trazabilidad Técnica* (Tablero dinámico de estados, detección automática de historial por Serie/IMEI con alertas de garantía y bitácora inmutable).
    4. *Módulo 4: Centro Multiformato de Impresión & Notificaciones Digitales* (Tickets térmicos 80mm/58mm con Code 128 y QR, hojas membretadas carta con talón desprendible, etiquetas adhesivas continuas 80mm y compactas 40x30/50x30mm, y WhatsApp Web en 1 clic).
    5. *Módulo 5: Punto de Venta (POS) & Control de Refacciones e Insumos* (Lectores de código de barras USB, descuento de stock en órdenes de servicio computando el costo exacto de la pieza y semáforo anti-desabasto).
    6. *Módulo 6: Inteligencia Financiera & Principio de Devengo Proporcional (COGS)* (Cálculo de margen neto real sobre mano de obra, devengo contable en anticipos, gestión de cuentas por pagar a proveedores a crédito 7/15/30 días y reportes exportables a Excel/CSV).
    7. *Módulo 7: Control de Turnos, Arqueo Físico de Efectivo & Corte Z* (Apertura auditada con fondo de cambio, auditoría ciega comparando conteo físico contra flujo teórico y emisión de comprobante Corte Z con firmas).
    8. *Módulo 8: Seguridad Basada en Roles (RBAC) & Bóveda Local de Datos* (Rol Administrador vs Rol Técnico y Bóveda Local en el Escritorio inmune a desinstalaciones o formateos).
- **⚖️ Nueva Tabla Comparativa Estratégica: FixPOS Pro vs. Sistemas en la Nube (SaaS):**
  - Creación del componente `FixPosVsSaasComparison.tsx` con análisis detallado de 6 criterios clave (Modelo de Pago, Dependencia de Internet, Privacidad de Datos en Bóveda Local, Evidencia por Cámara QR, Costo Real de Refacciones COGS y Auditoría Ciega con Corte Z).
  - Diseño responsivo con tabla ejecutiva en escritorio y tarjetas estilizadas en móvil y tablet.
- **📺 Reemplazo Temporal de Video por Canal Oficial de YouTube:**
  - Configuración del canal oficial `https://www.youtube.com/@Soluci%C3%B3nDigital360` mediante banner interactivo con botón directo al canal en `YoutubeEmbed.tsx` en lo que se sube el video tutorial oficial.
- **✨ Renderizado Mejorado de Módulos:**
  - Enriquecimiento de la visualización en `app/sistemas/[slug]/page.tsx` para presentar títulos de módulos en negrita seguidos de la descripción técnica y ejecutiva.
- **⏱️ Unificación Oficial de la Prueba de 7 Días para FixPOS Pro:**
  - Actualización de los textos en la página de producto y tarjeta de descarga: *"Prueba FixPOS Pro Gratis por 7 Días con todas sus funciones habilitadas. Sin tarjeta de crédito, sin compromisos y con la posibilidad de conservar todos tus registros al activar tu licencia definitiva."*
- **📥 Botón de Descarga Directa y Marcador Inicial en 30 para FixPOS Pro:**
  - Habilitación del botón oficial *Descargar Instalador* en la tarjeta de conversión de FixPOS Pro (`DownloadCtaCard.tsx` y `data/sistemas.ts`), conectado directamente al ejecutable oficial: `https://github.com/victorhernandez-art/taller/releases/download/v1.4.0/FixPOS-Pro-Setup-1.4.0.exe`.
  - Configuración del marcador inicial persistente en **30 descargas** sincronizado en base de datos PostgreSQL de Supabase, `data/downloads.json` y `app/api/downloads/route.ts`.
  - Mecanismo consecutivo garantizado: cada descarga incrementa en vivo consecutivamente (31, 32, 33...) con actualización inmediata en frontend y base de datos.
- **🏷️ Corrección de Clasificación (Eliminación de Etiqueta SaaS en FixPOS Pro):**
  - Se eliminó el badge `Sistema SaaS Profesional` en la cabecera de FixPOS Pro (`app/sistemas/[slug]/page.tsx`), conservando exclusivamente las etiquetas oficiales que reflejan su naturaleza real: `100% Offline`, `Red LAN & QR` y `Licencia Vitalicia`.
- **📝 Depuración de Textos Comerciales:**
  - Se eliminó la mención a *"plantillas de diagnóstico"* en el encabezado de categorías multirrubro (`components/SupportedCategories.tsx`).
- **🃏 Galería Dinámica 3D Interactiva para FixPOS Pro (`components/ScreenshotShowcase.tsx`):**
  - Reemplazo de la demostración estática / automática de 2 columnas por una galería interactiva en formato baraja de cartas 3D con perspectiva CSS (`perspective: 1400px`), idéntica al diseño dinámico de GymWeb.
  - Actualización de las 5 capturas oficiales de FixPOS Pro v1.4.0 en alta definición: Recepción en 4 pasos, Punto de Venta con carrito, Contabilidad y Flujo de Caja COGS, Servidor LAN & QR y Login.
  - **100% Nitidez sin capas oscuras:** Eliminación de cualquier gradiente o capa superpuesta oscurecedora para garantizar máxima legibilidad y nitidez de todos los datos en pantalla. Detalle explicativo posicionado elegantemente debajo del escenario 3D.
- **🔓 Flujo Sub2Unlock en Modal de Descarga de Office 2019 (`components/OfficeDownloadBox.tsx`):**
  - Implementación de desbloqueo por suscripción en 2 pasos: se elimina la descarga automática inicial.
  - **Paso 1:** Botón de suscripción a YouTube (`sub_confirmation=1`) que detona la verificación.
  - **Paso 2:** Botón de descarga con cuenta regresiva de 10 segundos (*"Verificando suscripción... 10s"*) que cambia a estado activo verde al finalizar (*"✅ ¡Enlace desbloqueado! Descargar Office 2019"*).
  - **Persistencia en navegador:** Guardado del estado en `localStorage` (`office_download_unlocked: true`) para no obligar al usuario a repetir la espera en la misma sesión o recargas.
  - Preservación total del banner de metas Office 2021 y la tarjeta oscura de Soluciones Empresariales.
- **🏋️ Eliminación de Capa Oscura en Galería 3D de GymWeb (`components/Gym3DFeatureCards.tsx`):**
  - Se eliminó por completo el degradado oscurecedor superpuesto (`bg-gradient-to-t`) que tapaba la parte baja de las capturas de pantalla de gimnasio.
  - Reubicación de los datos informativos (tag, badge, título y descripción) en un bloque limpio y legible debajo del escenario 3D, con botones de paso rápido (`<` y `>`) en cabecera.
  - Capturas de pantalla 100% nítidas y despejadas para Login Glassmorphism, Socios con saldos deudores y Servidor LAN con código QR.
- **🎨 Optimización Cromática en YT Downloader (`app/herramientas/yt-downloader/page.tsx` & `components/YTDownloaderDownloadBox.tsx`):**
  - Sustitución de todos los textos, badges, bordes y viñetas en color rojo/rosa (`rose-600`, `rose-100`, etc.) por una paleta agradable y profesional en tonos índigo (`indigo-600`, `indigo-50`), violeta y esmeralda (`emerald-600`), eliminando la sensación visual de estado de error o advertencia para el usuario.
  - Se reservó el color rojo exclusivamente para la identidad oficial de YouTube: ícono de la marca (`#FF0000`) y botón de suscripción al canal oficial en el modal (`bg-red-600`).

---

## 📌 Versión 1.4.9 — Octubre 2026: Activación de FixPOS Pro (Gestión Técnica, POS & Red LAN)
- **🚀 Activación en Catálogo Principal (`app/page.tsx`):**
  - Cambio de estado a disponible (`proximamente: false`), habilitando el badge **`Premium`**, el precio de oferta vitalicia `$2,000.00 MXN` (con `$3,500.00 MXN` tachado) y el botón activo **`Ver Detalle del Sistema`**.
  - Renombrado oficial del software de servicio técnico a **`FixPOS Pro — Gestión Técnica, POS & Red LAN`**.
- **🌐 Generación y Despliegue de la Página de Detalle (`/sistemas/sistema-gestion-tecnicos`):**
  - Habilitación de la ruta estática oficial SSG en producción.
  - Sincronización del nombre FixPOS Pro en las secciones de comparativa, demostración interactiva (`ScreenshotShowcase`), categorías soportadas (`SupportedCategories`), conexión LAN (`LanAndRolesSection`) y selector de monedas (`CurrencySelector`).

---

## 📌 Versión 1.4.8 — Octubre 2026: GymWeb — Eliminación Definitiva del Showcase de la Tarjeta de Catálogo
- **🧹 Tarjeta Limpia y Homogénea en Catálogo:**
  - Se eliminó de forma definitiva el componente 3D de la tarjeta de catálogo en [app/page.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/app/page.tsx), dejando la tarjeta con su formato simétrico, precio y descripción ejecutiva.
- **🌟 Showcase 3D en Página de Detalle:**
  - El escaparate de cartas 3D a gran escala permanece activo y visible exclusivamente en la página de producto ([app/sistemas/[slug]/page.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/app/sistemas/%5Bslug%5D/page.tsx)).

---

## 📌 Versión 1.4.7 — Octubre 2026: GymWeb — Gran Formato y Escalado de Cartas 3D
- **📐 Aumento Significativo de Dimensiones Visuales:**
  - Se incrementó la escala del componente [components/Gym3DFeatureCards.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/Gym3DFeatureCards.tsx) aumentando el contenedor hasta `max-w-5xl`, la altura del escenario 3D hasta `580px` en pantallas de escritorio, y la carta frontal hasta `820px` de ancho máximo.
  - La separación angular y profundidad Z de las cartas laterales se amplió proporcionalmente (`translate-x-36`), permitiendo que el contenido de las capturas sea completamente legible sin necesidad de zoom.
  - Ajuste de tipografía a gran formato (`text-2xl` para títulos, badges destacados y puntos de navegación expandidos).

---

## 📌 Versión 1.4.6 — Octubre 2026: GymWeb — Rediseño Limpio y Ampliado de Cartas 3D (Sin Marco de Fondo)
- **✨ Eliminación del Marco de Fondo y Aumento de Escala:**
  - Se eliminó por completo el contenedor oscuro exterior, bordes pesados y cajas de texto redundantes en [components/Gym3DFeatureCards.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/Gym3DFeatureCards.tsx).
  - El escenario se centra 100% en la baraja de cartas 3D a mayor tamaño (`w-[88%]`, `aspect-[16/10]`), permitiendo apreciar las capturas nítidas y espaciosas directamente dentro de la tarjeta de GymWeb ([app/page.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/app/page.tsx)) y en su página de detalle.
- **🃏 Mecanismo Interactivo de Pase con Clic:**
  - Al hacer clic en la carta frontal, pasa fluidamente a la siguiente; al hacer clic en las cartas laterales, la seleccionada avanza al frente con su animación tridimensional y resplandor cian.
  - Se conserva el botón de lupa/zoom para ampliar en lightbox de pantalla completa y los indicadores minimalistas tipo píldora.

---

## 📌 Versión 1.4.5 — Octubre 2026: GymWeb — Restauración de Tarjeta Limpia en Catálogo y Centralización del Showcase 3D
- **🧹 Limpieza y Homogeneidad en Catálogo Principal (`app/page.tsx`):**
  - Se removió el bloque interactivo de la tarjeta de catálogo para mantener la cuadrícula simétrica, limpia y compacta.
  - La tarjeta vuelve a mostrar únicamente el título, precio, descripción resumida y botón de acceso al detalle.
- **🌟 Centralización en Página de Detalle (`/sistemas/sistema-gestion-gimnasios`):**
  - El componente 3D con las 3 cartas interactivas (`Gym3DFeatureCards.tsx`) y modal lightbox se conserva activo en la página de producto de GymWeb con ancho óptimo de visualización.

---

## 📌 Versión 1.4.4 — Octubre 2026: GymWeb — Showcase Interactivo 3D Estilo Cartas (Nuevas Funciones Implementadas)
- **🃏 Nuevas Funciones Implementadas en Formato 3D (Efecto Baraja / Cartas):**
  - Creación del componente especializado [components/Gym3DFeatureCards.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/Gym3DFeatureCards.tsx) integrado directamente en la tarjeta de GymWeb en el catálogo principal ([app/page.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/app/page.tsx)) y en la página de detalle ([app/sistemas/[slug]/page.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/app/sistemas/%5Bslug%5D/page.tsx)).
  - **Organización solicitada de las 3 imágenes oficiales:**
    1. **Carta 1 (Tercera imagen subida, colocada como primera):** `Pantalla de Acceso Glassmorphism` (`/gym/gym-login.png`) — Autenticación corporativa moderna con interfaz dark mode, diseño translúcido y fondo inmersivo.
    2. **Carta 2 (Primera imagen subida):** `Directorio y Control de Socios` (`/gym/gym-socios.png`) — Módulo de socios, filtros rápidos de saldo deudor, difusiones masivas por WhatsApp y exportación a Excel.
    3. **Carta 3 (Segunda imagen subida):** `Servidor de Red Local (LAN) & QR` (`/gym/gym-red-lan.png`) — Conexión multi-dispositivo por red Wi-Fi sin internet mediante código QR y sincronización en tiempo real.
  - **Física 3D y Efectos Visuales:**
    - Perspectiva 3D con elevación Z, rotación angular en abanico (`rotate-0`, `rotate-6`, `-rotate-6`) y sombras volumétricas neón cian.
    - Selector interactivo de cartas (tabs de 1 clic), flechas de navegación y badge animado con ping visual `Nuevas Funciones Implementadas`.
    - Modal Lightbox en pantalla completa para inspeccionar cada captura en resolución nativa con zoom y descripciones ampliadas.

---

## 📌 Versión 1.4.3 — Octubre 2026: Cotizador — Actualización del Enlace Oficial del Instalador
- **📥 Nuevo Enlace del Instalador Autónomo (.exe):**
  - El botón *Descargar Cotizador Gratis* en la página del sistema ([data/sistemas.ts](file:///c:/xampp/htdocs/Solucion%20Digital%20360/data/sistemas.ts)) ahora apunta al nuevo ejecutable publicado en GitHub Releases: `https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/v1.0/Instalador_Cotizador.exe`.
  - Se sincronizó la respuesta en la sección de Preguntas Frecuentes (FAQ) para referenciar el nuevo nombre del instalador `Instalador_Cotizador.exe`.

---

## 📌 Versión 1.4.2 — Octubre 2026: GymWeb — Módulo 9 Red Local (LAN) y Sincronización en Tiempo Real
- **📶 Nuevo Módulo en Funciones Incluidas:**
  - Se agregó el Módulo 9 en [data/sistemas.ts](file:///c:/xampp/htdocs/Solucion%20Digital%20360/data/sistemas.ts): otros dispositivos se conectan por red local (QR o dirección de acceso) para realizar cambios, y lo realizado se guarda en tiempo real en la página principal del sistema, sin internet.

---

## 📌 Versión 1.4.1 — Octubre 2026: GymWeb — Actualización del Instalador a v2.6
- **🏋️ Nuevo Enlace de Descarga:**
  - El botón *Descargar Instalador* de GymWeb ([data/sistemas.ts](file:///c:/xampp/htdocs/Solucion%20Digital%20360/data/sistemas.ts)) ahora apunta a `https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/v2.6.1/Instalador_GymWeb_Windows_v2.6.zip` (antes v2.5).

---

## 📌 Versión 1.4.0 — Octubre 2026: Corrección de Enlace de Descarga Office 2019 a Release Original (.RAR)
- **📥 Actualización de Enlace y Paquete de Descarga Oficial:**
  - Se corrigió la URL del botón de descarga en la página de Office 2019 ([app/herramientas/office-2019/page.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/app/herramientas/office-2019/page.tsx)), apuntando directamente al release oficial de GitHub: `https://github.com/victorhernandez-art/sistema-gimnasio/releases/download/Office2019/OfficeLicenciaOriginal2019.rar`.
- **🏷️ Coherencia de Interfaz y Guía de Instalación:**
  - Actualización del botón en [components/OfficeDownloadBox.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/OfficeDownloadBox.tsx) de `Descargar Gratis (.ZIP)` a `Descargar Gratis (.RAR)`.
  - Actualización de los pasos de instalación en la página tutorial para indicar la descompresión del archivo `.rar` con WinRAR o 7-Zip.

---

## 📌 Versión 1.3.9 — Octubre 2026: Corrección Visual a Fondo Gris Claro & Reproducción Directa de Video (YT Downloader)
- **🎨 Homogeneización Visual a Fondo Gris Claro:**
  - Sustitución de los fondos oscuros (`bg-slate-900`, `bg-slate-950`) en la sección de demostración de video ([components/FacebookReelEmbed.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/FacebookReelEmbed.tsx)), en el marco de vista previa de la app y en el marcador de descargas por un gris suave profesional (`bg-slate-100/90` con bordes `border-slate-200` y textos `text-slate-900` / `text-slate-700`).
- **🎬 Solución Definitiva de Reproducción de Video Reel de Facebook:**
  - Diagnóstico: Facebook bloquea la inserción embebida por iframe en videos que contienen canciones protegidas por derechos de autor (arrojando el error *"No disponible: Este video no se puede insertar porque podría incluir contenido que es propiedad de otra persona"*).
  - Solución: Se eliminó el iframe problemático y se integró un reproductor interactivo con portada HD que abre el video de manera directa y oficial en Facebook al pulsar sobre la miniatura o el botón destacado, permitiendo reproducir el video sin ningún bloqueo ni restricciones de copyright.

---

## 📌 Versión 1.3.8 — Octubre 2026: Favicon Oficial e Icono de Pestaña Web (.ico, .png & apple-icon)
- **🎨 Integración del Isotipo Oficial en la Pestaña del Navegador:**
  - **Recorte y Calibración del Isotipo:** Procesamiento de alta definición a partir del logotipo corporativo oficial (`media_1791592071080.png`), aislando el emblema circular tecnológico (engranaje azul y circuito tecnológico verde con micro-conexiones) con fondo transparente y proporción cuadrada perfecta 1:1.
  - **Generación de Formatos Multi-Resolución:**
    - `public/favicon.ico`: Formato estándar ICO con capas optimizadas para navegadores web de escritorio y móviles.
    - `public/icon.png`: Icono PNG de alta fidelidad 512x512 para pantallas Retina y PWA.
    - `public/icon-192.png`: Icono 192x192 para compatibilidad con dispositivos Android.
    - `public/apple-icon.png`: Icono táctil 180x180 para dispositivos Apple iOS y Safari.
  - **Configuración de Metadatos (`app/layout.tsx`):** Registro de `icons` en `metadata` vinculando `icon`, `shortcut` y `apple` para reconocimiento universal en todos los motores de renderizado.

---

## 📌 Versión 1.3.7 — Octubre 2026: GymWeb — Cobertura Multi-País (20 Países), Moneda Local & LADA Automática, Tickets por WhatsApp y Ventas a Crédito
- **🏋️ Módulo de Configuración Multi-País y Multimoneda Automática:**
  - **Soporte Oficial para 20 Países:** Integración de la lista completa e interactiva con los 20 países admitidos: México (`MX`, `$ MXN`, Lada `+52`), Argentina (`AR`, `$ ARS`, Lada `+54`), Colombia (`CO`, `$ COP`, Lada `+57`), Chile (`CL`, `$ CLP`, Lada `+56`), Perú (`PE`, `S/ PEN`, Lada `+51`), Ecuador (`EC`, `$ USD`, Lada `+593`), Guatemala (`GT`, `Q GTQ`, Lada `+502`), Costa Rica (`CR`, `₡ CRC`, Lada `+506`), Panamá (`PA`, `B/. PAB`, Lada `+507`), Honduras (`HN`, `L HNL`, Lada `+504`), El Salvador (`SV`, `$ USD`, Lada `+503`), Nicaragua (`NI`, `C$ NIO`, Lada `+505`), República Dominicana (`DO`, `RD$ DOP`, Lada `+1`), Bolivia (`BO`, `Bs BOB`, Lada `+591`), Paraguay (`PY`, `₲ PYG`, Lada `+595`), Uruguay (`UY`, `$U UYU`, Lada `+598`), Venezuela (`VE`, `Bs. VES`, Lada `+58`), Puerto Rico (`PR`, `$ USD`, Lada `+1`), España (`ES`, `€ EUR`, Lada `+34`) y Estados Unidos (`US`, `$ USD`, Lada `+1`).
  - **Autoselección de Moneda y LADA:** Especificación clara de que al seleccionar el país en el apartado de Configuración de GymWeb, el sistema autoconfigura en tiempo real el símbolo real de la moneda local en todos los precios y la LADA telefónica oficial asignada para envíos.
  - **Componente Visual Dedicado (`components/GymCardCountriesPreview.tsx`):** Selector interactivo integrado directamente dentro de la tarjeta de gimnasio en el catálogo principal (`app/page.tsx`), replicando fielmente la interfaz del módulo de configuración del sistema GymWeb.
- **📱 Tickets de Comprobante de Pago y Venta por WhatsApp:**
  - Incorporación en el Módulo 4 de Cobranza del envío directo vía WhatsApp de tickets de comprobantes de pago de membresías o ventas de productos con 1 solo clic.
- **💳 Ventas a Crédito y Reporte de Cuenta Individual por Socio:**
  - Opción para otorgar membresías y productos de la tienda a crédito, con control de saldos pendientes, registro de abonos y generación del reporte de la cuenta individual por cada socio (socios deudores).
- **🌐 Expansión en la Página de Detalle (`app/sistemas/sistema-gestion-gimnasios`):**
  - Módulo interactivo de países (`components/CurrencySelector.tsx`) habilitado en la vista de detalle con selector en vivo, tabla de banderas y desglose de LADA y símbolo de moneda local.

---

## 📌 Versión 1.3.6 — Octubre 2026: Nueva Herramienta Gratuita YT Downloader (Música y Videos de YouTube Sin Anuncios)
- **🎵 Integración Oficial de YT Downloader v2.0:**
  - **Nueva Tarjeta en Catálogo (`components/HerramientasGratuitas.tsx`):** Incorporación de la tarjeta interactiva *YT Downloader — Música & Videos Sin Anuncios*, con imagotipo neón musical (`yt-downloader-icon.svg`), aura luminosa fucsia/rose (`bg-rose-500`), física magnética reactiva al cursor y levitación continua.
  - **Reorganización a 4 Columnas:** Ajuste del grid a `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` garantizando una presentación simétrica y balanceada de las 4 herramientas disponibles.
  - **Nueva Página Dedicada (`app/herramientas/yt-downloader/page.tsx`):**
    - Showcase visual con mockup en marco oscuro de la captura real de la aplicación (`yt-downloader-preview.png`).
    - **🎬 Video Demostración Oficial (Facebook Reel Embed):** Integración de [`FacebookReelEmbed.tsx`](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/FacebookReelEmbed.tsx) con el reel oficial (`https://www.facebook.com/reel/2226372958286827`), portada nativa en alta definición (`yt-downloader-reel-cover.jpg`), reproductor interactivo 9:16 y botón de acceso directo a Facebook.
    - **⭐ Características Especiales:** Selector de estilo musical en barra superior (Norteño, Rock, Pop, DJ/Urbano o Auto), detección inteligente de duplicados para evitar uso innecesario de almacenamiento, y cola de descargas simultáneas de hasta 3 enlaces en paralelo.
    - **📥 Pasos para Instalar:** Ejecución de `SD360 YT Downloader Setup 2.0.0.exe`, resolución guiada de la pantalla azul de Windows SmartScreen ("Más información" -> "Ejecutar de todas formas"), asistente de selección de carpeta e instalación, y creación automática de accesos directos en Escritorio y Menú Inicio.
    - **🎵 Guía de Uso Rápido:** Flujo claro en 6 etapas: abrir app, configurar carpeta de descarga, pegar enlace de YouTube, buscar miniatura y datos, seleccionar formato (Audio MP3 o Video MP4) y descargar.
    - Tabla de requisitos del sistema recomendados para Windows 10 y 11 (64 bits).
  - **Módulo de Descarga (`components/YTDownloaderDownloadBox.tsx`):**
    - Enlace al instalador oficial ejecutable en Google Drive (`https://drive.google.com/file/d/1dOgcOtdbSb-3u89ZGnc5S8Foom7c_jAA/view?usp=sharing`).
    - Marcador dinámico en tiempo real sincronizado con API y almacenamiento local.
    - Modal de agradecimiento tras descarga invitando a la suscripción en el canal oficial de YouTube `@SoluciónDigital360` y venta cruzada a los SaaS comerciales (Taller y Gimnasios).
    - Botón de asistencia directa por WhatsApp preconfigurado.
  - **Persistencia en Backend (`app/api/downloads/route.ts` & `data/downloads.json`):** Registro de métricas con clave `yt_downloader_downloads` y 245 descargas base.

---

## 📌 Versión 1.3.5 — Octubre 2026: Módulo Oficial de Wondershare Filmora & Catálogo Gratuito Completo
- **🎬 Integración de Wondershare Filmora en Herramientas Gratuitas:**
  - **Nueva Tarjeta en Catálogo (`components/HerramientasGratuitas.tsx`):** Sustitución de la tarjeta previa por *Wondershare Filmora — Edición Profesional*, con imagotipo oficial (`filmora-icon.png`), halo luminoso verde azulado/teal (`bg-teal-400`), levitación continua y respuesta magnética al cursor.
  - **Nueva Página Dedicada (`app/herramientas/filmora/page.tsx`):** Cobertura completa de herramientas de edición tradicional (corte, división y ajuste magnético), animación avanzada (keyframes, curvas de velocidad y rastreo de movimiento), composición visual y sonora (chroma key, máscaras, pantalla dividida, mezcla y sincronización de audio) y corrección de color con LUTs 3D, titulación animada y grabador de pantalla.
  - **Módulo de Descarga (`components/FilmoraDownloadBox.tsx`):** Conectado al release oficial `Filmora.rar` en GitHub Releases, con marcador dinámico de descargas en tiempo real y modal de suscripción/venta cruzada.
  - **Persistencia en API (`app/api/downloads/route.ts` & `data/downloads.json`):** Registro de métricas con clave `filmora_downloads` y 195 descargas base.

---

## 📌 Versión 1.3.4 — Octubre 2026: Identidad Visual Oficial de Nitro PDF Pro y Microsoft Office 2019
- **🎨 Integración de Imagen y Logo Oficial de Nitro PDF:**
  - **Procesamiento y Calibración Gráfica:** Ajuste preciso de la imagen oficial de Nitro PDF, removiendo márgenes excedentes y generando versiones en alta definición con transparencia (`nitro-pdf-icon.png` y `nitro-pdf-logo.png`).
  - **Tarjeta en Herramientas Gratuitas (`components/HerramientasGratuitas.tsx`):** Sustitución del icono genérico por el imagotipo oficial de Nitro PDF con halo luminoso anaranjado, levitación continua y física magnética interactiva con JavaScript.
  - **Encabezado en Página Tutorial (`app/herramientas/nitro-pdf/page.tsx`):** Incorporación del logotipo corporativo y badge oficial junto al título principal para reforzar la presentación profesional de SaaS.
- **💼 Integración de Imagen y Logo Oficial de Microsoft Office 2019:**
  - **Extracción y Optimización de Activos:** Separación y renderizado en transparencia del imagotipo 3D oficial (`office-2019-icon.png`), el logotipo corporativo completo (`office-2019-logo.png`) y la suite de iconos Word, Excel, Outlook y PowerPoint (`office-2019-suite.png`).
  - **Tarjeta en Herramientas Gratuitas (`components/HerramientasGratuitas.tsx`):** Reemplazo del icono genérico de cuadrícula azul por el imagotipo oficial de Office con aura luminosa bermellón/rojo anaranjado (`#EA4125`), levitación suave y animación tridimensional magnética.
  - **Encabezado en Página Tutorial (`app/herramientas/office-2019/page.tsx`):** Badge oficial y logotipo integrado en el título principal.

---

## 📌 Versión 1.3.3 — Octubre 2026: Sincronización Global de Descargas con Supabase y Sistema Anti-Pausa 24/7
- **🗄️ Persistencia en la Nube con Supabase (PostgreSQL):**
  - **Diagnóstico previo:** En Vercel Serverless las funciones son efímeras y el sistema de archivos es de solo lectura; por tanto, los contadores de descargas se mantenían temporalmente en memoria local (`localStorage`), regresando al número base cada vez que un usuario borraba su caché o ingresaba desde otro dispositivo.
  - **Integración Nativa de Supabase (`lib/supabase.ts` y `app/api/downloads/route.ts`):** Conexión directa y tolerante a fallos configurada con URL y Anon Key pública blindada mediante Row Level Security (RLS) en la tabla `downloads`.
  - **Calibración de Marcadores Base:** Actualizados y sincronizados en la base de datos de producción:
    - **Nitro PDF:** 160 descargas base (superando el bloqueo anterior de 142).
    - **Office 2019:** 230 descargas base.
    - **GymWeb:** 375 descargas base.
    - **Taller Técnico:** 540 descargas base.
  - **Conteo Atómico en Tiempo Real:** Al hacer clic en descargar, la API ejecuta un `upsert` inmediato que guarda el incremento en Supabase y actualiza la interfaz de forma síncrona para todos los visitantes del mundo.
- **🛡️ Mecanismo Anti-Pausa 24/7 para Supabase (GitHub Actions):**
  - **Protección contra Inactividad de 7 Días:** Supabase Free Tier suspende proyectos que pasan 7 días continuos sin tráfico.
  - **Endpoint Keep-Alive (`app/api/keepalive/route.ts`):** Endpoint ligero que consulta la tabla `downloads` y confirma estado operativo.
  - **Cron Autónomo en GitHub Actions (`.github/workflows/keepalive.yml`):** Flujo de trabajo programado que envía un ping REST automático a Supabase cada 3 días, garantizando actividad permanente 24/7/365 sin depender de configuraciones complejas ni incurrir en costos.
  - **Estabilidad de Despliegue en Vercel:** Se retiró `vercel.json` para eliminar fallos del constructor de Vercel, permitiendo despliegues automáticos limpios e instantáneos vía Git.

---

## 📌 Versión 1.3.2 — Octubre 2026
- **🧹 Limpieza Visual en Tarjeta de Office 2019:**
  - Se eliminó el banner redundante de la tarjeta de descarga para evitar duplicidad, concentrando el llamado de suscripción y meta de Office 2021 de forma limpia y exclusiva dentro del modal interactivo de descarga.

---

## 📌 Versión 1.3.1 — Octubre 2026
- **📢 Optimización de Redacción en Llamado a la Acción (Office 2019):**
  - **Actualización de Mensaje en Modal y Tarjeta:** Ajustado al copy oficial persuasivo: *"Suscríbete y comparte para que estés enterado de los programas que estaré publicando. Si este canal sube a más suscriptores estaré subiendo Office 2021 totalmente gratis Licencia original."*

---

## 📌 Versión 1.3.0 — Octubre 2026
- **✨ Iconos Animados e Interactivos en Tarjetas Gratuitas (`components/HerramientasGratuitas.tsx`):**
  - **Física e Interactividad con JavaScript:** Subcomponente interactivo que detecta el movimiento del cursor (`onMouseMove`) con respuesta magnética tridimensional (inclinación, traslación suave y escala fluida).
  - **Animación Continua en Reposo:** Keyframe `.animate-icon-float` en `app/globals.css` con levitación orgánica y halo perimetral de pulso luminoso (`glow` temático por herramienta).
  - **Iconografía Profesional y de Prestigio:** Cero estrellas ni destellos ficticios. Se implementan iconos técnicos y sobrios acordes al software: `FileCheck2` (Nitro PDF), `LayoutGrid` (Office 2019) y `Calculator` (Generador de Cotizaciones).

---

## 📌 Versión 1.2.9 — Octubre 2026
- **🚀 Incentivo de Crecimiento & Suscripción en Módulo Office 2019:**
  - **Banner Promocional de Comunidad (Meta Office 2021):** Incorporado en la tarjeta de descarga con llamado a compartir y suscribirse al canal con la promesa de liberar *Office 2021 totalmente gratis con Licencia original*.
  - **Llamado en Modal de Agradecimiento:** Destacado visual arriba del botón de suscripción a YouTube (`@SoluciónDigital360`) para maximizar la conversión de usuarios que descargan el instalador.

---

## 📌 Versión 1.2.8 — Octubre 2026
- **💻 Módulo Office 2019 Profesional — Video Tutorial YouTube, Descarga & Modal:**
  - **Nueva ruta dedicada `/herramientas/office-2019`:** Página de aterrizaje completa con reproductor embebido de YouTube para el tutorial oficial (`L1HGFcqHDsI`).
  - **Módulo de Aplicaciones Incluidas:** Word, Excel, PowerPoint, Outlook y OneNote con iconos y estilos representativos.
  - **Caja de Descarga Interactiva (`components/OfficeDownloadBox.tsx`):** Doble acción que abre la descarga directa del archivo ZIP en GitHub Releases e inicia el modal de suscripción a YouTube y venta cruzada a sistemas (`/#sistemas`).
  - **Marcador Dinámico de Descargas:** Contador en tiempo real sincronizado con API `/api/downloads` y persistencia en `localStorage`.
  - **Descargo de Responsabilidad Legal:** Tarjeta de advertencia orientada al uso de licencias legítimas sin métodos de evasión de licencias.
  - **Tarjeta en Catálogo:** Actualización de la tarjeta 2 en la sección de herramientas gratuitas a *Office 2019 Profesional — Guía & Licencia*.

---

## 📌 Versión 1.2.7 — Septiembre 2026
- **🎁 Modal Interactivo de Descarga & Cross-Selling:**
  - **Doble acción en botón "Descargar Gratis":** Inicia la descarga directa en nueva pestaña y despliega de inmediato un modal centrado con fondo semitransparente.
  - **Suscripción a YouTube:** Botón destacado de YouTube con enlace oficial al canal `@SoluciónDigital360`.
  - **Banner de Venta Cruzada:** Tarjeta corporativa que enlaza a los sistemas administrativos y desarrollo a medida (`/#sistemas`).
  - **Accesibilidad:** Cierre del modal mediante botón X, tecla Escape y clic en el backdrop.
- **📄 Sección Completa de Funcionalidades de Nitro PDF Pro:**
  - Grid de 4 categorías: Trabajar con PDFs, Firmar y llenar documentos, Convertir archivos (con badges interactivos de Office) y Proteger documentos con contraseña.

---

## 📌 Versión 1.2.6 — Septiembre 2026
- **📄 Módulo Nitro PDF Pro — Video Tutorial, Descarga & Analítica:**
  - **Nueva ruta dedicada `/herramientas/nitro-pdf`:** Página de aterrizaje optimizada con reproductor nativo HTML5 con video oficial alojado en GitHub Releases CDN (`Nitro.PDF.mp4`, sin publicidad ni iframes).
  - **Marcador Dinámico de Descargas:** Componente `components/NitroDownloadBox.tsx` con indicador verde de actividad en tiempo real, persistencia local (`localStorage`) e incremento automático en base de datos al descargar.
  - **Descargo de Responsabilidad Oficial:** Tarjeta de advertencia legal con diseño personalizado para Solución Digital 360 (fines educativos/demostrativos).
  - **Enlace de Descarga Directa:** Instalador oficial conectado a GitHub Releases (`Nitro.PDF.Pro.14.41.0.15.x64.Enterprise.rar`).
  - **Actualización de Tarjeta en Catálogo:** Reemplazo de la tarjeta de calculadora por *Nitro PDF Pro — Guía & Descarga* con botón directo a la página.
  - **Guía de Instalación:** Paso a paso visual en 4 etapas, requisitos recomendados y botón de soporte vía WhatsApp.

---

## 📌 Versión 1.2.5 — Septiembre 2026
- **🆓 Nueva Sección: Herramientas de Apoyo Gratuitas:**
  - **Nuevo componente `components/HerramientasGratuitas.tsx`:** Sección visible en la página principal (`/`) debajo del catálogo de sistemas premium.
  - **3 tarjetas gratuitas:** Calculadora de Costos de Taller, Plantilla de Control de Asistencia y Generador de Cotizaciones Básico.
  - **Diseño diferenciado:** Borde superior degradado `emerald → teal → blue`, badges "Gratis" verde, botones outline `border-2 border-emerald-500` para no competir visualmente con los CTAs de pago.
  - **Micro-animaciones:** Punto pulsante `animate-ping` en el badge de sección, destello de fondo en hover de tarjeta e ícono con `scale-110` al pasar el cursor.
  - **Navegación unificada (Navbar y Footer):** Enlace directo a 'Herramientas Gratis' (`/#herramientas-gratuitas`) añadido en la barra superior (escritorio y móvil) y en el pie de página.
  - **Accesibilidad:** `aria-labelledby`, `aria-label` en cada botón e IDs únicos por herramienta.

---

## 📌 Versión 1.2.4 — Septiembre 2026
- **⚡ Corrección y Persistencia del Contador de Descargas:**
  - **Persistencia en Navegador (localStorage):** Implementación de almacenamiento local inmediato (`sd360_downloads_gym` / `sd360_downloads_taller`) para evitar que el contador se reinicie o descienda a 364 al recargar la página o volver a visitarla.
  - **Eliminación de Bloqueo Permanente:** Se sustituyó el flag estático de descarga única por un debounce de 1.5s, permitiendo registrar descargas sucesivas de prueba.
  - **Soporte Híbrido Supabase en API (`/api/downloads`):** Creación del módulo `@/lib/supabase` para persistencia en base de datos PostgreSQL en la nube, con tolerancia a entornos serverless de solo lectura (Vercel) y sincronización con el mayor valor registrado.

---

## 📌 Versión 1.2.3 — Septiembre 2026
- **🏋️ GymWeb (Sistema de Gimnasios):**
  - **Contador Dinámico de Descargas Rediseñado:** Posicionado directamente al lado del botón *Descargar Instalador* con estética oscura moderna, icono de comunidad, punto verde parpadeante de actividad en tiempo real y contador visible **`+364 Descargas del Instalador`**.
  - **Simplificación del Bloque de Precio:** Se retiró el texto secundario de aclaración de moneda para ofrecer una presentación más limpia, directa y enfocada en la propuesta de valor.
  - **Persistencia y API:** Endpoint `app/api/downloads/route.ts` y almacenamiento `data/downloads.json` actualizados para gestionar contadores independientes por sistema (`gimnasio_downloads` y `taller_demo_downloads`), incrementando de manera real cada vez que un usuario hace clic en *Descargar Instalador*.
  - **Mensajería WhatsApp Contextual:** Mensaje predeterminado de solicitud de clave adaptado a `"mi gimnasio"` de forma automática.

---

## 📌 Versión 1.2.2 — Septiembre 2026
- **📅 Sistema de Gestión de Citas y Agendamiento Online:**
  - **Precio actualizado:** Asignado a **`$1,500.00 MXN`** (*Único pago*).
  - **Desactivación temporal (`proximamente: true`):** El sistema permanece visible con su precio y badge *Próximamente*, pero con el botón *Próximamente Disponible* deshabilitado y su ruta `/sistemas/sistema-gestion-citas` protegida con 404 mientras se completa el desarrollo.
- **🏋️ GymWeb — Sistema de Control de Gimnasios (v2.1):**
  - **Enlace de descarga directo:** Configurado con la URL oficial de GitHub Releases (`Instalador_GymWeb_Windows_v2.5.zip`).
  - **Periodo de Prueba:** Actualizado a **7 días de prueba completa** sin restricciones de módulos.
  - **Video Demostrativo:** Integración con ID de YouTube `bkRAztASgNY`, tamaño optimizado amplio y preservación de portada original sin transparencias opacas.
  - **CTA:** Eliminado el botón secundario de llamada para concentrar la acción en descarga y prueba.
- **🚀 Infraestructura y Producción en Vercel:**
  - Ajuste de Framework Preset en Vercel a `Next.js`.
  - Despliegue en producción con éxito en **https://solucion-digital360.vercel.app**.

---

## 📌 Versión 1.2.1 — Septiembre 2026

### 🏋️ 1. Habilitación del Sistema de Control y Gestión de Gimnasios
- **Activación en el Catálogo:**
  - Se eliminó el estado *Próximamente* y se habilitó la tarjeta con el badge **`Premium`**.
  - Precio configurado en **`$2,000.00 MXN`** (oferta con precio anterior de `$3,500.00 MXN` tachado) bajo esquema de **Único Pago — Licencia Vitalicia**.
  - Botón habilitado: **`Ver Detalle del Sistema`** apuntando a `/sistemas/sistema-gestion-gimnasios`.
- **Página de Detalle SSG:**
  - Habilitación de la ruta estática `/sistemas/sistema-gestion-gimnasios` con descripción detallada de funciones (control de membresías, asistencias, POS suplementos, recordatorios WhatsApp), requisitos técnicos y preguntas frecuentes (FAQs).
  - Adaptación de la tarjeta final `DownloadCtaCard.tsx` y llamadas a la acción para solicitud de prueba de 3 días o compra personalizada por WhatsApp.

### 🔧 2. Sistema Taller v1.0 en Modo Desarrollo
- **Desactivación de la Card:**
  - Se configuró con `proximamente: true`.
  - Muestra la insignia **`Próximamente`**, indicador **`EN DESARROLLO`** y el botón deshabilitado **`Próximamente Disponible`**.

---

## 📌 Versión 1.2.0 — Agosto 2026

### 🎨 1. Navegación Global y Nuevas Secciones Institucionales
- **Componente `Navbar.tsx`:** Barra de navegación fija con efecto backdrop blur, logotipo oficial, menú responsivo para móviles y enlaces directos:
  - 🏠 **Inicio** (`/`)
  - 👥 **Quiénes Somos** (`/quienes-somos`)
  - 📞 **Contacto** (`/contacto`)
  - 🔒 **Aviso de Privacidad** (`/privacidad`)
  - 📄 **Términos y Condiciones** (`/terminos`)
  - 💬 **Botón directo de WhatsApp** (`+52 961 120 9361`).
- **Componente `Footer.tsx`:** Pie de página unificado con enlaces de navegación, redes de soporte, aviso legal y sello de seguridad.

### 💰 2. Estrategia de Precios, Oferta y Soporte Técnico
- **Precio Tachado de Oferta:**
  - Sistema Taller v1.0 ahora muestra su precio original tachado de **`$3,500.00 MXN`** rebajado a **`$2,000.00 MXN`** con la etiqueta visible **`Único Pago`**.
- **Soporte Técnico:** Actualizado en todo el sitio web a **6 Meses de Soporte Técnico Gratis + Licencia Vitalicia**.
- **Precios Internacionales:**
  - Incorporación de referencias claras para los 20 países disponibles (México: `$2,000.00 MXN`, Argentina: cotización en ARS por WhatsApp, Latinoamérica/EE.UU./España: moneda local o USDT).

### 🚀 3. Estrategia de Prueba de 3 Días (Full Features)
- **Sustitución del Demo limitado por Prueba de 3 Días:**
  - El cliente descarga el instalador y solicita una clave de prueba de 3 días con el sistema **100% activo** (sin marcas de agua ni restricciones de registros), lo que elimina la desconfianza antes de realizar el pago único.
- **Botones Homologados:**
  - Se homogeneizó el tamaño, altura (62px) y alineación de los 3 botones principales de conversión:
    1. 📥 **Descargar Instalador**
    2. 💬 **Solicitar Clave de Prueba**
    3. 📞 **Llamada de Asesoría**

### 📊 4. Contador de Descargas en Vivo y Persistencia
- **Punto de partida:** Inicializado en **`+526 Descargas del Instalador`**.
- **API y Persistencia:**
  - Archivo `data/downloads.json` y Endpoint `app/api/downloads/route.ts` (`GET` y `POST`).
  - Cada vez que un usuario hace clic en descargar, el contador se incrementa en vivo y se guarda permanentemente en el servidor para monitoreo del negocio.

### 🏷️ 5. Catálogo de Sistemas y Estado "Próximamente"
- **Sistema para Gimnasios (`sistema-gestion-gimnasios`):**
  - Configurado en el catálogo con badge **`Próximamente`** y botón **`Próximamente Disponible`** deshabilitado.
  - Descripción limpia enfocada en control de membresías, socios, suplementos y asistencias.
- **Generador de Cotizaciones PDF (`generador-cotizaciones-pdf`):**
  - Configurado en modo **`Próximamente`** con URL protegida (404 al intentar acceso directo).

### 📺 6. Canal Oficial de YouTube
- **Componente `YoutubeEmbed.tsx`:**
  - Sustitución de iframe placeholder por tarjeta oficial vinculada directamente al canal **`@SoluciónDigital360`** ([https://www.youtube.com/@SoluciónDigital360](https://www.youtube.com/@SoluciónDigital360)).

### 🌟 7. Rediseño Visual de la Tarjeta Final (`DownloadCtaCard.tsx`)
- **Fondo Claro y Profesional:** Se cambió el fondo oscuro original por un diseño blanco sobrio con bordes suaves, acentos de color y alto contraste tipográfico, optimizado para inspirar confianza y maximizar la tasa de conversión.

---

## 📌 Versión 1.0.0 — Versión Base
- Estructura inicial con Next.js 14 (App Router), TypeScript y Tailwind CSS.
- Módulos interactivos: Galería Lightbox 1:1, Selector de Divisas (20 países), Módulo Multirrubro, Acordeón de FAQs.
- Generación de rutas estáticas SSG (`app/sistemas/[slug]/page.tsx`).
