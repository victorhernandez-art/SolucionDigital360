# 📜 Historial de Cambios y Registro de Versiones (Changelog)
## Solución Digital 360 — Plataforma Web SaaS

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
