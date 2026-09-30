# 🚀 Solución Digital 360 — Plataforma Web SaaS & Catálogo Estático (SSG)

Bienvenido al repositorio oficial de **Solución Digital 360**, un sitio web dinámico, rápido y optimizado para SEO desarrollado con **Next.js 14+ (App Router)**, **TypeScript** y **Tailwind CSS**, diseñado para desplegarse de manera 100% estática (SSG) en **Vercel**.

---

## 🛠️ Tecnologías Principales

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript (Tipado estricto)
- **Estilos:** Tailwind CSS (Vanilla CSS & tokens optimizados)
- **Iconografía:** `lucide-react`
- **Generación de Contenido:** SSG (Static Site Generation mediante `generateStaticParams`)
- **Imágenes & Assets:** Componentes de imagen nativos con preservación de escala nativa 1:1

---

## 📁 Estructura del Proyecto

```text
Solucion Digital 360/
├── app/
│   ├── layout.tsx                  # Layout raíz (HTML5, Fuentes Inter, Metadatos SEO)
│   ├── globals.css                 # CSS global con directivas de Tailwind CSS
│   ├── page.tsx                    # Página principal / Catálogo de Sistemas
│   ├── quienes-somos/page.tsx      # Página institucional "Quiénes Somos"
│   ├── contacto/page.tsx           # Página de canales de contacto directo y WhatsApp
│   ├── privacidad/page.tsx         # Aviso de privacidad y seguridad de datos locales
│   ├── terminos/page.tsx           # Términos y condiciones, licencias y periodos de prueba
│   ├── api/
│   │   └── downloads/route.ts      # API Route para registro y persistencia de descargas
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
│   ├── DownloadCtaCard.tsx         # Tarjeta CTA con botones de acción, marcador dinámico y prueba 7 días
│   ├── ScreenshotShowcase.tsx      # Galería interactiva auto-play de capturas HD con modal Lightbox 1:1
│   ├── SupportedCategories.tsx     # Módulo multirrubro (Celulares, Tablets, PC, Smart TV, etc.)
│   ├── LanAndRolesSection.tsx      # Sección clara de Conexión LAN por QR, PWA y Roles RBAC
│   ├── CurrencySelector.tsx        # Selector interactivo para 20 países y tipos de moneda
│   ├── FaqAccordion.tsx            # Acordeón interactivo de preguntas frecuentes
│   └── YoutubeEmbed.tsx            # Tarjeta de enlace al Canal Oficial @SoluciónDigital360
├── data/
│   ├── sistemas.ts                 # Fuente de verdad estática: Interfaz TypeScript y array de sistemas
│   └── downloads.json              # Persistencia del contador de descargas (Taller 526 / GymWeb 364)
├── public/
│   ├── logo.png                    # Logotipo oficial de Solución Digital 360
│   ├── diseno.png                  # Imagen ilustrativa limpia del Hero Section
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

### 📌 Versión 1.2.5 — Septiembre 2026 (Actualización Reciente)
- **🆓 Nueva Sección: Herramientas de Apoyo Gratuitas:**
  - Nuevo componente `components/HerramientasGratuitas.tsx` integrado en la página principal debajo del catálogo.
  - 3 tarjetas gratuitas: Calculadora de Costos de Taller, Plantilla de Control de Asistencia y Generador de Cotizaciones Básico.
  - Diseño diferenciado con borde degradado verde, badges outline y micro-animaciones.

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
  - **Enlace de descarga directa:** Instalador oficial Windows v2.1 alojado en GitHub Releases (`Instalador_GymWeb_Windows_v2.1.zip`).
  - **Prueba Gratuita:** Actualizado periodo de prueba a **7 días** con todas las funciones activas.
  - **Video Demostrativo:** Integración de reproductor de video de YouTube (ID: `Y6p5-qLb_24`) con portada limpia, escala amplia y sin transparencias oscuras.
  - **Optimización de CTA:** Retiro del botón de llamada para maximizar conversiones enfocadas en descarga directa y contacto WhatsApp.
- **Infraestructura de Despliegue Vercel:**
  - Configuración correcta de Framework Preset a `Next.js` en Vercel.
  - Prerrenderizado estático SSG de todas las páginas institucionales y productos activos.
  - URL oficial en producción: **[https://solucion-digital360.vercel.app](https://solucion-digital360.vercel.app)**.

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

