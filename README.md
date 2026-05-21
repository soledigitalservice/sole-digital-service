# Sole Digital Service — Sitio corporativo

Sitio web one-page de **Sole Digital Service**, empresa de desarrollo de software
para pequeños negocios (Florida, USA · disponibilidad global). Diseño
**tech / moderno / industrial** coherente con la identidad de marca: negro
profundo, dorado ámbar (`#f5a623`) y acero, extraídos del logo.

## ✨ Stack

- **[Next.js 14](https://nextjs.org/)** (App Router, React Server Components)
- **[Tailwind CSS](https://tailwindcss.com/)** — diseño y sistema visual
- **[Framer Motion](https://www.framer.com/motion/)** — animaciones sutiles
- **[Lucide](https://lucide.dev/)** — iconografía
- **[Nodemailer](https://nodemailer.com/)** — formulario de contacto vía SMTP
- **Fuentes**: Space Grotesk (display) + Inter (texto), autoalojadas con
  `next/font` (sin descargas externas en tiempo de ejecución).

Todo es **autónomo**: una vez instalado y configurado con variables de entorno,
no depende de ningún CMS ni API externa de pago.

## 🗂️ Estructura

```
.
├── app/
│   ├── layout.tsx          # Metadatos SEO, fuentes, JSON-LD (LocalBusiness)
│   ├── page.tsx            # Composición de la página
│   ├── globals.css         # Estilos base + sistema de utilidades
│   ├── sitemap.ts          # /sitemap.xml automático
│   ├── robots.ts           # /robots.txt automático
│   └── api/contact/route.ts# Endpoint del formulario (Nodemailer + fallback JSON)
├── components/
│   ├── Navbar.tsx · Footer.tsx · Logo.tsx
│   ├── sections/           # Hero, Services, Portfolio, About, Testimonials, Contact
│   └── ui/                 # Reveal, SectionHeading, Decor, Icon
├── lib/
│   ├── site.ts             # Config de marca, contacto y SEO
│   ├── data.ts             # Contenido (servicios, proyectos, testimonios, equipo)
│   └── utils.ts
├── public/
│   ├── logo.png            # Logo (se lee dinámicamente)
│   └── wallpaper-dark.png  # Wallpaper original de marca
├── data/messages.json      # (generado) respaldo de mensajes sin SMTP
├── .env.example
└── ...config
```

## 🚀 Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local   # (en Windows PowerShell: Copy-Item .env.example .env.local)
#    edita .env.local con tus datos

# 3. Desarrollo
npm run dev                  # http://localhost:3000

# 4. Producción
npm run build
npm run start
```

Otros scripts: `npm run lint` · `npm run typecheck`.

## ✉️ Formulario de contacto

El endpoint `POST /api/contact` valida los datos en servidor y:

1. **Si hay SMTP configurado** (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`): envía un
   correo con Nodemailer a `CONTACT_EMAIL`.
2. **Si NO hay SMTP**: guarda el mensaje en `data/messages.json` (modo respaldo
   autónomo) y avisa al usuario en la interfaz.

Incluye protección anti-spam con *honeypot* y validación en cliente y servidor.

> **Gmail**: genera una *App Password* (requiere 2FA) y úsala como `SMTP_PASS`.
> Host `smtp.gmail.com`, puerto `587`.

## 🌐 Idiomas (i18n)

El sitio es bilingüe **Español / Inglés**, sin dependencias externas:

- Todo el texto vive en [lib/i18n.ts](lib/i18n.ts) (diccionarios `es` y `en`).
- Los datos estructurales (iconos, colores, tecnologías) están en
  [lib/data.ts](lib/data.ts) y se combinan con el texto por índice.
- El selector **ES/EN** del navbar cambia el idioma al instante, guarda la
  preferencia en `localStorage` y actualiza `<html lang>`. En la primera visita
  detecta el idioma del navegador. El idioma por defecto (ES) se renderiza en el
  servidor.

Para añadir un idioma: agrega su código a `locales` y un nuevo diccionario en
`lib/i18n.ts`.

## 🎨 Identidad visual

| Token        | Valor       | Uso                          |
| ------------ | ----------- | ---------------------------- |
| `ink-900`    | `#0a0a0b`   | Fondo principal              |
| `gold-400`   | `#f5a623`   | Acento de marca (del logo)   |
| `steel-*`    | grises      | Texto y superficies          |

Para sustituir el logo, reemplaza `public/logo.png`. La marca SVG vectorial vive
en `components/Logo.tsx` (componente `LogoMark`) — edita sus paths si cambias el
isotipo.

## 🔍 SEO & rendimiento

- Metadatos Open Graph / Twitter, `metadataBase`, canonical.
- Datos estructurados schema.org **ProfessionalService** (negocio local).
- `sitemap.xml` y `robots.txt` generados automáticamente.
- Imágenes en AVIF/WebP, fuentes autoalojadas, animaciones respetando
  `prefers-reduced-motion`. Totalmente responsive y accesible (skip-link, focus
  visible, etiquetas ARIA).

## ☁️ Despliegue

### Netlify (recomendado aquí)

El proyecto incluye [netlify.toml](netlify.toml) ya configurado. Dos vías:

**A) Desde tu carpeta local con la CLI (más rápido):**

```powershell
npx netlify-cli login              # abre el navegador para iniciar sesión
npx netlify-cli deploy --build     # crea el sitio y sube un preview
npx netlify-cli deploy --build --prod   # publica en producción
```

**B) Desde Git (mejor para actualizar después):** sube el repo a GitHub y en
Netlify pulsa **Add new site → Import from Git**, selecciona el repo y deja la
configuración por defecto (Netlify detecta Next.js solo).

**Variables de entorno** (Netlify → Site settings → Environment variables):

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | la URL final, p. ej. `https://tu-sitio.netlify.app` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | tu SMTP (para el formulario) |
| `CONTACT_EMAIL` | email que recibe los mensajes |

> El disco de Netlify es de solo lectura: el formulario **necesita SMTP** en
> producción (el respaldo en `data/messages.json` es solo para desarrollo/VPS).
> Sin SMTP el sitio se publica y funciona, pero el formulario dará error al enviar.

### Vercel (alternativa)

`npx vercel` y define las mismas variables. También de solo lectura → usa SMTP.

---

© Sole Digital Service. Hecho con ☕ en Florida.
