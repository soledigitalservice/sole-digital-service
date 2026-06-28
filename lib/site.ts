/**
 * Configuración central del sitio. Centraliza datos de marca, contacto y SEO
 * para reutilizarlos en metadatos, JSON-LD, footer y formulario de contacto.
 */
export const siteConfig = {
  name: "Sole Digital Service",
  shortName: "SDS",
  // Cámbialo por tu dominio real en producción (también vía NEXT_PUBLIC_SITE_URL).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://soledigitalservice.com",
  tagline: "Software a medida para pequeños negocios que piensan en grande.",
  description:
    "Sole Digital Service diseña y desarrolla software a medida para pequeños negocios: webs, apps móviles, e-commerce y automatización de procesos. Con base en Florida, disponibilidad global.",
  locale: "es_ES",
  contact: {
    email: "hello@soledigitalservice.com",
    phone: "+1 (305) 555-0142",
    phoneHref: "+13055550142",
    address: {
      street: "1200 Brickell Ave, Suite 1950",
      city: "Miami",
      region: "FL",
      postalCode: "33131",
      country: "US",
      full: "1200 Brickell Ave, Suite 1950, Miami, FL 33131, USA",
    },
    // Coordenadas aproximadas (Brickell, Miami) para el mapa estático sin APIs.
    geo: { lat: 25.7617, lng: -80.1918 },
    hours: "Lun–Vie · 9:00–18:00 (EST)",
  },
  social: {
    github: "https://github.com/soledigitalservice",
    linkedin: "https://www.linkedin.com/company/soledigitalservice",
    x: "https://x.com/soledigitalsvc",
    instagram: "https://instagram.com/soledigitalservice",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
] as const;
