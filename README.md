# 🚀 Solución Digital 360 — Plataforma Web SaaS & Catálogo Estático (SSG)

Bienvenido al repositorio oficial de **Solución Digital 360**, un sitio web dinámico, rápido y optimizado para SEO desarrollado con **Next.js 14+ (App Router)**, **TypeScript** y **Tailwind CSS**, diseñado para desplegarse de manera 100% estática (SSG) en **Vercel**.

---

## 🛠️ Tecnologías Principales

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript (Tipado estricto)
- **Estilos:** Tailwind CSS (Vanilla CSS & tokens optimizados)
- **Iconografía:** `lucide-react`
- **Base de Datos & Persistencia:** Supabase (PostgreSQL con Row Level Security) para contadores de descargas en vivo
- **Generación de Contenido:** SSG (Static Site Generation mediante `generateStaticParams`)
- **Imágenes & Assets:** Componentes de imagen nativos con preservación de escala nativa 1:1

---

## 📁 Estructura del Proyecto

```text
Solucion Digital 360/
├── app/
│   ├── layout.tsx                  # Layout raíz (HTML5, Fuentes Inter, Metadatos SEO)
│   ├── globals.css                 # CSS global con directivas de Tailwind CSS
│   ├── page.tsx                    # Página principal / Catálogo de Sistemas y Herramientas Gratuitas
│   ├── quienes-somos/page.tsx      # Página institucional "Quiénes Somos"
│   ├── contacto/page.tsx           # Página de canales de contacto directo y WhatsApp
│   ├── privacidad/page.tsx         # Aviso de privacidad y seguridad de datos locales
│   ├── terminos/page.tsx           # Términos y condiciones, licencias y periodos de prueba
│   ├── api/
│   │   ├── downloads/route.ts      # API Route para registro y persistencia de descargas (Supabase + Local)
│   │   └── keepalive/route.ts      # Ping de liveness 24/7 para prevenir suspensión de Supabase
│   ├── herramientas/
│   │   ├── nitro-pdf/page.tsx      # Tutorial HD nativo y descarga de Nitro PDF Pro
│   │   ├── office-2019/page.tsx    # Guía oficial y descarga de Microsoft Office 2019 Profesional
│   │   ├── filmora/page.tsx        # Suite completa de edición y descarga de Wondershare Filmora
│   │   └── yt-downloader/page.tsx  # Descarga y especificaciones de YT Downloader v2.0
│   └── sistemas/
│       └── [slug]/
│           └── page.tsx            # Página dinámica SSG de producto (generateStaticParams, notFound)
├── .agents/
│   └── rules/
│       └── despliegue.md           # Regla operativa para despliegues a producción con confirmación
├── AGENTS.md                       # Directivas y protocolo estandarizado para agentes de IA
├── components/
│   ├── Navbar.tsx                  # Barra de navegación superior con menú responsivo
│   ├── Footer.tsx                  # Pie de página unificado con enlaces institucionales y legales
│   ├── HerramientasGratuitas.tsx   # Grid interactivo con física magnética (Nitro, Office, Filmora, YT Downloader)
│   ├── NitroDownloadBox.tsx        # Descarga, contador dinámico y modal de Nitro PDF Pro
│   ├── OfficeDownloadBox.tsx       # Descarga, contador dinámico y modal de Office 2019
│   ├── FilmoraDownloadBox.tsx      # Descarga, contador dinámico y modal de Wondershare Filmora
│   ├── YTDownloaderDownloadBox.tsx # Descarga, contador dinámico y modal de YT Downloader
│   ├── DownloadCtaCard.tsx         # Tarjeta CTA con botones de acción y marcador dinámico
│   ├── ScreenshotShowcase.tsx      # Galería interactiva auto-play de capturas HD con modal Lightbox 1:1
│   ├── SupportedCategories.tsx     # Módulo multirrubro (Celulares, Tablets, PC, Smart TV, etc.)
│   ├── LanAndRolesSection.tsx      # Sección clara de Conexión LAN por QR, PWA y Roles RBAC
│   ├── CurrencySelector.tsx        # Selector interactivo para 20 países y tipos de moneda
│   ├── FaqAccordion.tsx            # Acordeón interactivo de preguntas frecuentes
│   └── YoutubeEmbed.tsx            # Tarjeta de enlace al Canal Oficial @SoluciónDigital360
├── data/
│   ├── sistemas.ts                 # Fuente de verdad estática: Interfaz TypeScript y array de sistemas
│   └── downloads.json              # Persistencia de contadores de descargas (Taller, Gym, Nitro, Office, Filmora, YT)
├── public/
│   ├── logo.png                    # Logotipo oficial de Solución Digital 360
│   ├── diseno.png                  # Imagen ilustrativa limpia del Hero Section
│   ├── nitro-pdf-icon.png          # Imagotipo oficial cuadrado de Nitro PDF Pro
│   ├── nitro-pdf-logo.png          # Logotipo completo transparente de Nitro PDF
│   ├── office-2019-icon.png        # Imagotipo 3D oficial transparente de Microsoft Office
│   ├── office-2019-logo.png        # Logotipo completo oficial de Office 2019
│   ├── office-2019-suite.png       # Suite oficial de aplicaciones Office (Word, Excel, Outlook, PPT)
│   ├── filmora-icon.png            # Imagotipo oficial cuadrado de Wondershare Filmora
│   ├── filmora-logo.png            # Logotipo completo oficial de Filmora
│   ├── yt-downloader-icon.svg      # Imagotipo oficial neón de YT Downloader
│   ├── yt-downloader-preview.png   # Captura oficial en alta resolución de la app YT Downloader
│   └── taller/                     # Capturas de pantalla reales en alta resolución
├── package.json                    # Scripts y dependencias del proyecto
├── tailwind.config.js              # Configuración de temas y colores Tailwind
├── tsconfig.json                   # Configuración de TypeScript con alias @/*
├── HISTORIAL.md                    # Registro cronológico detallado de versiones y cambios
└── README.md                       # Guía de arquitectura y mantenimiento del sistema
```

---

## ⚙️ Arquitectura y Mecanismo de Datos (SSG)

### 1. Fuente de Verdad (`data/sistemas.ts`)
Toda la información de los sistemas (precios, descripciones, módulos, requisitos, FAQs y estado) se gestiona desde el archivo `data/sistemas.ts`. 

- **Interfaz `Sistema`**: Define la estructura TypeScript estricta para garantizar que ningún atributo quede indefinido.
- **Función `getSistemaBySlug(slug: string)`**: Permite consultar el objeto de cada producto en tiempo de compilación o ejecución.

```typescript
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
```

### 2. Generación Estática de Rutas (`app/sistemas/[slug]/page.tsx`)
- **`generateStaticParams()`**: Consulta `sistemas` en `data/sistemas.ts` para prerrenderizar automáticamente las páginas dinámicas durante el comando `next build`. Esto garantiza velocidad instantánea y compatibilidad total con los CDN de Vercel.
- **`notFound()`**: Redirige a la página 404 si un usuario intenta ingresar a una URL cuyo slug no existe en la data.

---

## 🎨 Lineamientos de Diseño y Guía de Estilo

Para mantener una experiencia visual profesional de nivel **SaaS**, se deben respetar las siguientes directivas:

1. **Paleta de Colores:**
   - Fondo: `bg-slate-50`
   - Textos: `text-slate-900` (encabezados) y `text-slate-600` (cuerpo)
   - Color Primario Marca: `blue-600`
   - Color Acento Sistema Taller: `indigo-600`
   - Color Acento WhatsApp / CTAs: `emerald-500` (hover `emerald-600`)

2. **Sin Iconos de Estrellas ni Recuadros en Texto:**
   - Queda prohibido el uso de iconos decorativos tipo estrella (`Sparkles`).
   - Los bloques de texto explicativo (como las garantías o notas de evaluación demo) deben presentarse en texto fluido y limpio sin recuadros encerrados.

3. **Imágenes en Nitidez Nativa 1:1:**
   - En las capturas de pantalla de interfaces, evitar el uso de clases que fuercen el estiramiento (`w-full` en contenedores más grandes que la resolución nativa) para evitar la borrosidad o pixelado de textos pequeños.
   - Usar `max-w-full h-auto object-contain` y el atributo `unoptimized` donde aplique para conservar nitidez perfecta.

4. **Contactos Oficiales:**
   - **WhatsApp Directo:** `https://wa.me/529611209361`
   - **Teléfono de Asesoría:** `+52 961 120 9361` (`tel:+529611209361`)

5. **Precios y Periodo de Prueba:**
   - **Sistema Taller v1.0:** `$2,000.00 MXN` (Oferta con precio anterior `$3,500.00 MXN` tachado / Licencia Vitalicia + 6 Meses de Soporte Técnico Gratis).
   - **Periodo de Prueba:** Prueba completa de 3 días con todas las funciones activas e instalador descargable.
   - **Marcador de Descargas:** La tarjeta CTA final ([components/DownloadCtaCard.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/DownloadCtaCard.tsx)) incluye el contador dinámico persistente (`+526 Descargas del Instalador` gestionado vía API `/api/downloads`).

---

## 🚀 Cómo Agregar un Nuevo Sistema al Catálogo

Cualquier desarrollador o agente que retome el proyecto puede añadir un nuevo software o herramienta al sitio web siguiendo estos simples pasos:

1. Abre el archivo [data/sistemas.ts](file:///c:/xampp/htdocs/Solucion%20Digital%20360/data/sistemas.ts).
2. Agrega un nuevo objeto al array `sistemas` con los atributos requeridos (`slug`, `nombre`, `precio`, `descripcionCorta`, `videoYoutubeId`, `problemaQueResuelve`, `funciones`, `requisitos`, `faq`, `esGratis`).
3. Guarda el archivo. Next.js generará automáticamente la tarjeta en el catálogo principal (`/`) y la página de detalle correspondiente en `/sistemas/[nuevo-slug]`.

---

## 📝 Control de Modificaciones del Sistema (Changelog)

### 📌 Versión 1.3.6 — Octubre 2026 (Actualización Reciente)
- **🎵 Nueva Herramienta Gratuita: YT Downloader v2.0:**
  - Nueva tarjeta interactiva en Herramientas Gratuitas (`#herramientas-gratuitas`) con imagotipo neón musical (`/yt-downloader-icon.svg`), aura rose/fucsia y física magnética.
  - Reorganización responsiva del catálogo de herramientas a 4 columnas simétricas (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
  - Nueva página dedicada (`/herramientas/yt-downloader`) con showcase visual de la interfaz (`/yt-downloader-preview.png`), características de extracción MP3 en alta fidelidad y video MP4, soporte para 3 descargas simultáneas en paralelo, temas dinámicos estilo neón y selección de carpetas locales.
  - Componente de descarga directa (`YTDownloaderDownloadBox.tsx`) conectado al instalador oficial alojado en Google Drive, con contador dinámico en tiempo real y modal de suscripción a YouTube / venta cruzada a SaaS.
  - Persistencia de métricas en backend (`/api/downloads`) con 245 descargas base.

### 📌 Versión 1.3.5 — Octubre 2026
- **🎬 Módulo Oficial de Wondershare Filmora:**
  - Nueva tarjeta interactiva en Herramientas Gratuitas (`#herramientas-gratuitas`) con imagotipo oficial (`/filmora-icon.png`), aura teal y física magnética.
  - Nueva página dedicada (`/herramientas/filmora`) con cobertura de herramientas de edición tradicional, animación con keyframes, chroma key, tracking, curvas de velocidad, LUTs 3D y grabador de pantalla integrado.
  - Componente de descarga directa con release oficial `Filmora.rar` y modal de suscripción a YouTube.
  - Soporte de métricas en backend (`/api/downloads`) con 195 descargas base.

### 📌 Versión 1.3.4 — Octubre 2026
- **🎨 Identidad Visual Oficial de Nitro PDF Pro & Microsoft Office 2019:**
  - Ajuste y optimización del logotipo de Nitro PDF (`/nitro-pdf-icon.png` y `/nitro-pdf-logo.png`).
  - Extracción y renderizado transparente del imagotipo oficial 3D de Microsoft Office (`/office-2019-icon.png`, `/office-2019-logo.png` y `/office-2019-suite.png`).
  - Integración en las tarjetas de Herramientas Gratuitas (`#herramientas-gratuitas`) con física magnética, animación continua de levitación y auras luminosas acordes a cada identidad de marca.
  - Actualización de las páginas tutoriales oficiales correspondientes.

### 📌 Versión 1.3.3 — Octubre 2026
- **🗄️ Persistencia de Descargas con Supabase & Sistema Anti-Pausa 24/7:**
  - Base de datos en la nube (PostgreSQL + RLS) y cron de GitHub Actions cada 3 días para mantener la instancia activa.

### 📌 Versión 1.3.2 — Octubre 2026
- **🧹 Limpieza Visual en Módulo Office 2019:**
  - Retiro del banner inferior en la tarjeta principal para evitar duplicidad y mantener el mensaje de suscripción enfocado exclusivamente dentro del modal de descarga.

### 📌 Versión 1.3.1 — Octubre 2026
- **📢 Optimización de Redacción en Llamado a la Acción (Office 2019):**
  - Ajuste del mensaje persuasivo tanto en el modal como en la tarjeta de descarga para incentivar la suscripción y avisar de futuros programas y de la meta de Office 2021.

### 📌 Versión 1.3.0 — Octubre 2026
- **✨ Iconos Animados e Interactivos en Tarjetas Gratuitas:**
  - Lógica interactiva en JavaScript (`components/HerramientasGratuitas.tsx`) con efecto magnético en hover, cálculo dinámico de posición y rotación 3D.
  - Levitación continua suave (`.animate-icon-float`) y aura de pulso luminoso en reposo.
  - Iconografía corporativa y profesional (`FileCheck2`, `LayoutGrid`, `Calculator`), sin estrellas ficticias para preservar la seriedad y prestigio de la marca.

### 📌 Versión 1.2.9 — Octubre 2026
- **🚀 Incentivo de Crecimiento & Suscripción en Módulo Office 2019:**
  - Banner promocional de comunidad en la tarjeta de descarga: llamado a compartir y suscribirse al canal con la promesa de publicar *Office 2021 totalmente gratis con Licencia original*.
  - Llamado destacado en el modal de agradecimiento directamente sobre el botón de suscripción a YouTube (`@SoluciónDigital360`) para potenciar la viralidad y captación de suscriptores.

### 📌 Versión 1.2.8 — Octubre 2026
- **💻 Módulo Office 2019 Profesional — Video Tutorial YouTube & Descarga:**
  - Nueva ruta `/herramientas/office-2019` con reproductor oficial de YouTube (ID `L1HGFcqHDsI`).
  - Tarjeta en catálogo actualizada a Office 2019 Profesional.
  - Componente de descarga interactiva `components/OfficeDownloadBox.tsx` con modal de agradecimiento, suscripción al canal y venta cruzada (`/#sistemas`).
  - Descargo de responsabilidad oficial orientado a licencias legítimas.

### 📌 Versión 1.2.7 — Septiembre 2026
- **🎁 Modal Interactivo de Descarga & Venta Cruzada:**
  - Lógica de doble acción en "Descargar Gratis": abre el instalador y despliega el modal en la pestaña actual.
  - Botón de suscripción directa a YouTube y tarjeta de venta cruzada hacia los sistemas comerciales (`/#sistemas`).
  - Módulo con 4 categorías completas de capacidades en Nitro PDF Pro.

### 📌 Versión 1.2.6 — Septiembre 2026
- **📄 Módulo Nitro PDF Pro — Video Tutorial, Descarga & Analítica:**
  - Nueva ruta `/herramientas/nitro-pdf` con reproductor nativo HTML5 conectado a video oficial en GitHub Releases (`Nitro.PDF.mp4`).
  - Marcador de descargas dinámico en tiempo real (`components/NitroDownloadBox.tsx`) con persistencia e incremento al hacer clic.
  - Tarjeta de descargo de responsabilidad oficial para Solución Digital 360.
  - Enlace de descarga oficial al instalador Enterprise x64 (`Nitro.PDF.Pro.14.41.0.15.x64.Enterprise.rar`).

### 📌 Versión 1.2.5 — Septiembre 2026
- **🆓 Nueva Sección: Herramientas de Apoyo Gratuitas:**
  - Nuevo componente `components/HerramientasGratuitas.tsx` integrado en la página principal debajo del catálogo.
  - 3 tarjetas gratuitas: Calculadora de Costos de Taller, Plantilla de Control de Asistencia y Generador de Cotizaciones Básico.
  - Diseño diferenciado con borde degradado verde, badges outline y micro-animaciones.
  - Enlace directo a 'Herramientas Gratis' incorporado en Navbar (desktop y móvil) y Footer.

### 📌 Versión 1.2.4 — Septiembre 2026
- **⚡ Corrección y Persistencia del Contador de Descargas:**
  - **Persistencia en Navegador (localStorage):** Implementación de guardado local inmediato (`sd360_downloads_gym` / `sd360_downloads_taller`) para que el contador visual nunca descienda o se reinicie a 364 al recargar la página.
  - **Debounce de 1.5s:** Se permite registrar descargas consecutivas sin bloquear permanentemente el botón tras la primera acción.
  - **Soporte Híbrido Supabase en API (`/api/downloads`):** Integración con `@/lib/supabase` para persistencia en base de datos PostgreSQL en la nube, con tolerancia a la naturaleza de solo lectura de Vercel Serverless.

### 📌 Versión 1.2.3 — Septiembre 2026
- **🏋️ GymWeb (Sistema de Gimnasios):**
  - **Contador Dinámico de Descargas Rediseñado:** Posicionado estratégicamente al lado del botón *Descargar Instalador* con diseño premium oscuro, indicador luminoso verde de actividad en tiempo real y contador visible **`+364 Descargas del Instalador`** para maximizar la prueba social.
  - **Simplificación del Bloque de Precio:** Se retiró el texto secundario de aclaración de moneda para ofrecer una presentación más limpia, directa y enfocada en la propuesta de valor.
  - **Persistencia y API:** Endpoint `app/api/downloads/route.ts` y almacenamiento `data/downloads.json` actualizados para gestionar contadores independientes por sistema (`gimnasio_downloads` y `taller_demo_downloads`), incrementando de manera real cada vez que un usuario hace clic en *Descargar Instalador*.
  - **Mensajería WhatsApp Contextual:** Mensaje predeterminado de solicitud de clave adaptado a `"mi gimnasio"` de forma automática.

### 📌 Versión 1.2.2 — Septiembre 2026
- **Sistema de Gestión de Citas y Agendamiento Online:**
  - **Precio oficial:** Configurado en **`$1,500.00 MXN`** bajo esquema de *Único pago*.
  - **Estado desactivado (`proximamente: true`):** Muestra badge `Próximamente`, precio visible y botón deshabilitado `Próximamente Disponible`. La ruta `/sistemas/sistema-gestion-citas` se mantiene inactiva (404 controlado) mientras concluye su desarrollo.
- **GymWeb (Sistema de Gimnasios v2.1):**
  - **Enlace de descarga directa:** Instalador oficial Windows v2.1 alojado en GitHub Releases (`Instalador_GymWeb_Windows_v2.5.zip`).
  - **Prueba Gratuita:** Actualizado periodo de prueba a **7 días** con todas las funciones activas.
  - **Video Demostrativo:** Integración de reproductor de video de YouTube (ID: `bkRAztASgNY`) con portada limpia, escala amplia y sin transparencias oscuras.
  - **Optimización de CTA:** Retiro del botón de llamada para maximizar conversiones enfocadas en descarga directa y contacto WhatsApp.
- **Infraestructura de Despliegue Vercel:**
  - Configuración correcta de Framework Preset a `Next.js` en Vercel.
  - Prerrenderizado estático SSG de todas las páginas institucionales y productos activos.
  - URL oficial en producción: **[https://solucion-digital360.vercel.app](https://solucion-digital360.vercel.app)**.

---

## 🗄️ Persistencia de Descargas con Supabase & Sistema Anti-Pausa

El sistema cuenta con un motor de conteo de descargas centralizado en la nube:

1. **Base de Datos en Supabase (PostgreSQL):**
   - Tabla `downloads` con registros para cada herramienta y sistema (`nitro_pdf_downloads`, `office_2019_downloads`, `gimnasio_downloads`, `taller_demo_downloads`).
   - Políticas RLS (Row Level Security) que permiten lectura e incremento público legítimo vía Anon Key.
   - Conexión configurada en `lib/supabase.ts` y gestionada a través de la ruta `/api/downloads`.
2. **Protección Anti-Pausa 24/7 (Keep-Alive):**
   - Flujo automático en `.github/workflows/keepalive.yml` que ejecuta un ping REST a Supabase cada 3 días.
   - Previene la suspensión automática por inactividad de 7 días del plan gratuito de Supabase, manteniendo el servicio activo permanentemente sin costos.

---

## 💻 Comandos del Proyecto

### Iniciar Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Compilar para Producción (Vercel Build)
```bash
npm run build
```

### Probar la Compilación de Producción Localmente
```bash
npm start
```

---

## 📄 Licencia y Propiedad
Desarrollado para **Solución Digital 360**. Todos los derechos reservados.

