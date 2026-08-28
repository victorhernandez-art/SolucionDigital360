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
│   ├── page.tsx                    # Página principal / Catálogo de Sistemas y Hero Section
│   └── sistemas/
│       └── [slug]/
│           └── page.tsx            # Página dinámica SSG de producto (generateStaticParams, notFound)
├── components/
│   ├── ScreenshotShowcase.tsx      # Galería interactiva auto-play de capturas HD con modal Lightbox 1:1
│   ├── SupportedCategories.tsx     # Módulo multirrubro (Celulares, Tablets, PC, Smart TV, Consolas, Línea Blanca)
│   ├── LanAndRolesSection.tsx      # Sección clara de Conexión LAN por QR, PWA y Roles RBAC (Admin vs Técnico)
│   ├── DownloadCtaCard.tsx         # Tarjeta CTA final unificada con marcador de descargas realistas e incremento en vivo
│   ├── DemoDownloadButton.tsx      # Módulo de descarga del instalador demo por MEGA y soporte directo
│   ├── CurrencySelector.tsx        # Selector interactivo para 20 países y tipos de moneda (MXN, USD, EUR, etc.)
│   ├── FaqAccordion.tsx            # Acordeón interactivo de preguntas frecuentes (React useState)
│   └── YoutubeEmbed.tsx            # Reproductor responsivo de YouTube (iframe aspect-video)
├── data/
│   └── sistemas.ts                 # Fuente de verdad estática: Interfaz TypeScript y array de sistemas
├── public/
│   ├── logo.png                    # Logotipo oficial de Solución Digital 360
│   ├── diseno.png                  # Imagen ilustrativa limpia del Hero Section
│   └── taller/                     # Capturas de pantalla reales en alta resolución
│       ├── login.png               # Pantalla de Inicio de Sesión & Seguridad RBAC
│       ├── nueva_orden.png         # Módulo de Recepción & Nueva Orden en 2 min
│       ├── ordenes_kanban.png      # Tablero Kanban & WhatsApp Web Embebido
│       ├── contabilidad.png        # Libro Diario, Caja Chica & Arqueo de Efectivo
│       └── punto_de_venta.png      # Punto de Venta (POS) & Control de Inventarios
├── package.json                    # Scripts y dependencias del proyecto
├── tailwind.config.js              # Configuración de temas y colores Tailwind
├── tsconfig.json                   # Configuración de TypeScript con alias @/*
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

5. **Precios y Versión Demo de Prueba:**
   - **Sistema Taller v1.0:** `$2,000.00 MXN` (Pago Único / Licencia Vitalicia).
   - **Marcador de Descargas:** La tarjeta CTA final unificada ([components/DownloadCtaCard.tsx](file:///c:/xampp/htdocs/Solucion%20Digital%20360/components/DownloadCtaCard.tsx)) incluye el contador dinámico de descargas (`+1,480 Descargas del Demo`) y redirige al instalador de Mega.

---

## 🚀 Cómo Agregar un Nuevo Sistema al Catálogo

Cualquier desarrollador o agente que retome el proyecto puede añadir un nuevo software o herramienta al sitio web siguiendo estos simples pasos:

1. Abre el archivo [data/sistemas.ts](file:///c:/xampp/htdocs/Solucion%20Digital%20360/data/sistemas.ts).
2. Agrega un nuevo objeto al array `sistemas` con los atributos requeridos (`slug`, `nombre`, `precio`, `descripcionCorta`, `videoYoutubeId`, `problemaQueResuelve`, `funciones`, `requisitos`, `faq`, `esGratis`).
3. Guarda el archivo. Next.js generará automáticamente la tarjeta en el catálogo principal (`/`) y la página de detalle correspondiente en `/sistemas/[nuevo-slug]`.

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
