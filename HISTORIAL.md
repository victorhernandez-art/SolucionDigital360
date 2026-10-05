# 📜 Historial de Cambios y Registro de Versiones (Changelog)
## Solución Digital 360 — Plataforma Web SaaS

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
  - **Enlace de descarga directo:** Configurado con la URL oficial de GitHub Releases (`Instalador_GymWeb_Windows_v2.1.zip`).
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
