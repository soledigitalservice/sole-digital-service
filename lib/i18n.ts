/**
 * Internacionalización (ES / EN) sin dependencias externas.
 * Todo el texto traducible del sitio vive aquí. Los datos estructurales
 * (iconos, colores, tecnologías) están en lib/data.ts y se combinan por índice.
 */
import type { IndustryKey } from "./data";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export type Dictionary = {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    team: string;
    testimonials: string;
    reviews: string;
    contact: string;
    quote: string;
  };
  a11y: {
    skip: string;
    home: string;
    openMenu: string;
    closeMenu: string;
    backToTop: string;
    switchLang: string;
    openMaps: string;
    fiveStars: string;
  };
  hero: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    consoleTitle: string;
    consoleComment: string;
    deployed: string;
    stats: string[]; // paralelo a data.stats
  };
  clients: { title: string };
  services: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    ctaCard: string;
    viewAll: string;
    items: { title: string; description: string; features: string[] }[]; // paralelo a data.services
  };
  portfolio: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    industries: Record<"all" | IndustryKey, string>;
    items: { title: string; summary: string }[]; // paralelo a data.projects
  };
  about: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    pillars: { title: string; text: string }[]; // 3: misión, visión, valores
    processTitle: string;
    steps: { title: string; description: string }[]; // paralelo a data.processSteps
    teamTitle: string;
    teamCta: string; // botón "ver equipo" en la home
    roles: string[]; // paralelo a data.team
  };
  testimonials: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    items: { quote: string; role: string }[]; // paralelo a data.testimonials
  };
  cta: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  contact: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    labels: { address: string; phone: string; email: string; hours: string };
    mapCta: string;
    form: {
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      company: string;
      companyPh: string;
      message: string;
      messagePh: string;
      submit: string;
      sending: string;
      another: string;
      consent: string;
    };
    success: { title: string; text: string };
    errorFallback: string;
    validation: { name: string; email: string; message: string };
  };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    rights: string;
    madeIn: string;
  };
};

const es: Dictionary = {
  nav: {
    home: "Inicio",
    services: "Servicios",
    portfolio: "Portafolio",
    team: "Team",
    testimonials: "Testimonios",
    reviews: "Reseñas",
    contact: "Contacto",
    quote: "Solicitar presupuesto",
  },
  a11y: {
    skip: "Saltar al contenido",
    home: "Sole Digital Service — inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    backToTop: "Volver arriba",
    switchLang: "Cambiar idioma a inglés",
    openMaps: "Abrir ubicación en Google Maps",
    fiveStars: "5 de 5 estrellas",
  },
  hero: {
    badge: "Florida, USA · Disponibilidad global",
    titleBefore: "Software a medida para",
    titleHighlight: "pequeños negocios",
    titleAfter: "que piensan en grande.",
    subtitle:
      "Diseñamos y desarrollamos webs, apps, e-commerce y sistemas a medida con ingeniería de primer nivel. Tecnología robusta, diseño impecable y resultados que se miden.",
    ctaPrimary: "Solicitar presupuesto",
    ctaSecondary: "Ver servicios",
    consoleTitle: "soledigitalservice — build & ship",
    consoleComment: "// stack moderno, autónomo",
    deployed: "✓ desplegado · 0 errores",
    stats: [
      "Proyectos entregados",
      "Industrias servidas",
    ],
  },
  clients: { title: "Negocios que confían en Sole Digital Service" },
  services: {
    eyebrow: "Servicios",
    titleBefore: "Todo lo que tu negocio necesita,",
    titleHighlight: "construido a medida",
    subtitle:
      "Desde la idea hasta el despliegue. Cubrimos cada capa del producto digital con un estándar de ingeniería elevado.",
    ctaCard: "Hablemos de tu proyecto",
    viewAll: "Ver todos los servicios",
    items: [
      {
        title: "Desarrollo web a medida",
        description:
          "Sitios y aplicaciones web ultrarrápidas, accesibles y orientadas a conversión, construidas con tecnologías modernas.",
        features: ["Next.js / React", "SEO técnico", "Core Web Vitals óptimos"],
      },
      {
        title: "Aplicaciones móviles",
        description:
          "Apps nativas y multiplataforma (iOS/Android) que llevan tu negocio al bolsillo de tus clientes.",
        features: ["React Native", "Notificaciones push", "Modo offline"],
      },
      {
        title: "Tiendas online / E-commerce",
        description:
          "Plataformas de venta seguras con pasarelas de pago, gestión de inventario y analítica integrada.",
        features: ["Pagos seguros", "Inventario en tiempo real", "Checkout optimizado"],
      },
      {
        title: "Automatización de procesos",
        description:
          "Eliminamos tareas repetitivas con flujos automatizados que ahorran horas y reducen errores.",
        features: ["Integraciones", "Bots y webhooks", "Reportes automáticos"],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portafolio",
    titleBefore: "Proyectos que",
    titleHighlight: "mueven negocios",
    subtitle:
      "Una selección de productos digitales que hemos diseñado y construido para clientes de distintas industrias.",
    industries: {
      all: "Todos",
      retail: "Retail",
      health: "Salud",
      logistics: "Logística",
      hospitality: "Hostelería",
      education: "Educación",
    },
    items: [
      {
        title: "Lumen — POS & E-commerce",
        summary:
          "Tienda online unificada con punto de venta físico e inventario sincronizado en tiempo real.",
      },
      {
        title: "MediTrack — Portal de pacientes",
        summary:
          "App de citas y seguimiento clínico con recordatorios automáticos y telemedicina.",
      },
      {
        title: "CargoFlow — Gestión de flota",
        summary:
          "Dashboard de seguimiento de envíos en vivo y optimización de rutas para 120 vehículos.",
      },
      {
        title: "SavorOS — ERP de restaurantes",
        summary:
          "Gestión de pedidos, cocina, reservas y finanzas para una cadena de 8 locales.",
      },
      {
        title: "EduPath — Plataforma e-learning",
        summary:
          "Campus virtual con cursos en vídeo, evaluaciones y certificados automatizados.",
      },
      {
        title: "FreshMarket — App de delivery",
        summary:
          "Pedidos a domicilio con seguimiento del repartidor y pagos integrados.",
      },
    ],
  },
  about: {
    eyebrow: "Nosotros",
    titleBefore: "Ingeniería de producto con",
    titleHighlight: "alma artesanal",
    subtitle:
      "Nacimos en Florida en 2019 con una idea simple: el buen software no debería ser un lujo reservado a las grandes corporaciones. Hoy somos un equipo distribuido que entrega productos de los que estamos orgullosos.",
    pillars: [
      {
        title: "Misión",
        text: "Democratizar la tecnología de alto nivel para que cualquier pequeño negocio compita como una gran empresa.",
      },
      {
        title: "Visión",
        text: "Ser el socio tecnológico de referencia para PYMEs en EE. UU. y Latinoamérica.",
      },
      {
        title: "Valores",
        text: "Transparencia, ingeniería rigurosa y obsesión por el resultado del cliente.",
      },
    ],
    processTitle: "Cómo trabajamos",
    steps: [
      {
        title: "Descubrimiento",
        description:
          "Analizamos tu negocio, objetivos y usuarios para definir el alcance con precisión.",
      },
      {
        title: "Diseño",
        description:
          "Prototipamos la experiencia y la interfaz, validando cada decisión contigo.",
      },
      {
        title: "Desarrollo",
        description:
          "Construimos con código limpio, pruebas y entregas iterativas que puedes ver crecer.",
      },
      {
        title: "Lanzamiento & soporte",
        description:
          "Desplegamos, medimos y mejoramos de forma continua. No te dejamos solo.",
      },
    ],
    teamTitle: "El equipo",
    teamCta: "Conocer al equipo",
    roles: [
      "CEO & Estrategia",
      "CTO & Arquitectura",
    ],
  },
  testimonials: {
    eyebrow: "Testimonios",
    titleBefore: "Lo que dicen",
    titleHighlight: "nuestros clientes",
    subtitle:
      "No lo decimos nosotros: lo dicen los negocios que confiaron en Sole Digital Service.",
    items: [
      {
        quote:
          "Sole Digital Service transformó nuestra operación. La nueva tienda online triplicó las ventas en el primer trimestre.",
        role: "Fundadora",
      },
      {
        quote:
          "Profesionales, rápidos y muy claros. Entendieron nuestra clínica mejor que nadie y entregaron una app impecable.",
        role: "Director médico",
      },
      {
        quote:
          "El dashboard de flota nos ahorra horas cada día. Soporte excelente y código de altísima calidad.",
        role: "COO",
      },
      {
        quote:
          "Pasamos de hojas de cálculo a un ERP a medida en semanas. Nuestro equipo por fin trabaja en una sola herramienta.",
        role: "Gerente general",
      },
    ],
  },
  cta: {
    eyebrow: "Hablemos",
    titleBefore: "¿Listo para llevar tu negocio al",
    titleHighlight: "siguiente nivel",
    titleAfter: "?",
    subtitle:
      "Cuéntanos tu idea y te enviaremos una propuesta a medida en menos de 24 horas. Sin compromiso.",
    primary: "Solicitar presupuesto gratis",
    secondary: "Ver más proyectos",
  },
  contact: {
    eyebrow: "Contacto",
    titleBefore: "Cuéntanos tu idea.",
    titleHighlight: "La hacemos realidad.",
    subtitle:
      "Respondemos en menos de 24 horas. Sin compromiso, sin tecnicismos innecesarios.",
    labels: {
      address: "Dirección",
      phone: "Teléfono",
      email: "Email",
      hours: "Horario",
    },
    mapCta: "Cómo llegar",
    form: {
      name: "Nombre",
      namePh: "Tu nombre",
      email: "Email",
      emailPh: "tu@email.com",
      company: "Empresa",
      companyPh: "Nombre de tu negocio (opcional)",
      message: "Mensaje",
      messagePh: "Cuéntanos qué necesitas...",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      another: "Enviar otro mensaje",
      consent: "Al enviar aceptas que te contactemos sobre tu consulta.",
    },
    success: {
      title: "¡Mensaje enviado!",
      text: "Gracias por contactarnos. Te responderemos en menos de 24 horas.",
    },
    errorFallback: "No se pudo enviar. Inténtalo de nuevo.",
    validation: {
      name: "Introduce tu nombre.",
      email: "Introduce un email válido.",
      message: "Cuéntanos un poco más (mín. 10 caracteres).",
    },
  },
  footer: {
    tagline:
      "Software a medida para pequeños negocios que piensan en grande. Con base en Florida, disponibilidad global.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
    madeIn: "Diseñado y desarrollado en Florida, USA.",
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    team: "Team",
    testimonials: "Testimonials",
    reviews: "Reviews",
    contact: "Contact",
    quote: "Request a quote",
  },
  a11y: {
    skip: "Skip to content",
    home: "Sole Digital Service — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
    switchLang: "Switch language to Spanish",
    openMaps: "Open location in Google Maps",
    fiveStars: "5 out of 5 stars",
  },
  hero: {
    badge: "Florida, USA · Available worldwide",
    titleBefore: "Custom software for",
    titleHighlight: "small businesses",
    titleAfter: "that think big.",
    subtitle:
      "We design and build websites, apps, e-commerce and custom systems with top-tier engineering. Robust technology, flawless design, and results you can measure.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "View services",
    consoleTitle: "soledigitalservice — build & ship",
    consoleComment: "// modern, self-contained stack",
    deployed: "✓ deployed · 0 errors",
    stats: [
      "Projects delivered",
      "Industries served",
    ],
  },
  clients: { title: "Businesses that trust Sole Digital Service" },
  services: {
    eyebrow: "Services",
    titleBefore: "Everything your business needs,",
    titleHighlight: "built to measure",
    subtitle:
      "From idea to deployment. We cover every layer of the digital product with a high engineering standard.",
    ctaCard: "Let's talk about your project",
    viewAll: "View all services",
    items: [
      {
        title: "Custom web development",
        description:
          "Lightning-fast, accessible, conversion-focused websites and web apps, built with modern technologies.",
        features: ["Next.js / React", "Technical SEO", "Optimal Core Web Vitals"],
      },
      {
        title: "Mobile applications",
        description:
          "Native and cross-platform apps (iOS/Android) that put your business in your customers' pockets.",
        features: ["React Native", "Push notifications", "Offline mode"],
      },
      {
        title: "Online stores / E-commerce",
        description:
          "Secure sales platforms with payment gateways, inventory management and built-in analytics.",
        features: ["Secure payments", "Real-time inventory", "Optimized checkout"],
      },
      {
        title: "Process automation",
        description:
          "We eliminate repetitive tasks with automated workflows that save hours and reduce errors.",
        features: ["Integrations", "Bots & webhooks", "Automated reports"],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    titleBefore: "Projects that",
    titleHighlight: "move businesses",
    subtitle:
      "A selection of digital products we have designed and built for clients across different industries.",
    industries: {
      all: "All",
      retail: "Retail",
      health: "Healthcare",
      logistics: "Logistics",
      hospitality: "Hospitality",
      education: "Education",
    },
    items: [
      {
        title: "Lumen — POS & E-commerce",
        summary:
          "Unified online store with a physical point of sale and real-time synchronized inventory.",
      },
      {
        title: "MediTrack — Patient portal",
        summary:
          "Appointment and clinical follow-up app with automated reminders and telemedicine.",
      },
      {
        title: "CargoFlow — Fleet management",
        summary:
          "Live shipment tracking dashboard and route optimization for 120 vehicles.",
      },
      {
        title: "SavorOS — Restaurant ERP",
        summary:
          "Order, kitchen, reservation and finance management for a chain of 8 locations.",
      },
      {
        title: "EduPath — E-learning platform",
        summary:
          "Virtual campus with video courses, assessments and automated certificates.",
      },
      {
        title: "FreshMarket — Delivery app",
        summary: "Home delivery with courier tracking and integrated payments.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    titleBefore: "Product engineering with a",
    titleHighlight: "craftsman's soul",
    subtitle:
      "We were born in Florida in 2019 with a simple idea: great software shouldn't be a luxury reserved for big corporations. Today we are a distributed team shipping products we're proud of.",
    pillars: [
      {
        title: "Mission",
        text: "Democratize high-level technology so any small business can compete like a large enterprise.",
      },
      {
        title: "Vision",
        text: "To be the go-to technology partner for SMBs across the U.S. and Latin America.",
      },
      {
        title: "Values",
        text: "Transparency, rigorous engineering, and obsession with the client's outcome.",
      },
    ],
    processTitle: "How we work",
    steps: [
      {
        title: "Discovery",
        description:
          "We analyze your business, goals and users to define the scope precisely.",
      },
      {
        title: "Design",
        description:
          "We prototype the experience and interface, validating every decision with you.",
      },
      {
        title: "Development",
        description:
          "We build with clean code, testing and iterative deliveries you can watch grow.",
      },
      {
        title: "Launch & support",
        description:
          "We deploy, measure and improve continuously. We don't leave you on your own.",
      },
    ],
    teamTitle: "The team",
    teamCta: "Meet the team",
    roles: [
      "CEO & Strategy",
      "CTO & Architecture",
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    titleBefore: "What our",
    titleHighlight: "clients say",
    subtitle:
      "Don't take our word for it: hear it from the businesses that trusted Sole Digital Service.",
    items: [
      {
        quote:
          "Sole Digital Service transformed our operation. The new online store tripled sales in the first quarter.",
        role: "Founder",
      },
      {
        quote:
          "Professional, fast and crystal clear. They understood our clinic better than anyone and delivered a flawless app.",
        role: "Medical Director",
      },
      {
        quote:
          "The fleet dashboard saves us hours every day. Excellent support and top-quality code.",
        role: "COO",
      },
      {
        quote:
          "We went from spreadsheets to a custom ERP in weeks. Our team finally works in a single tool.",
        role: "General Manager",
      },
    ],
  },
  cta: {
    eyebrow: "Let's talk",
    titleBefore: "Ready to take your business to the",
    titleHighlight: "next level",
    titleAfter: "?",
    subtitle:
      "Tell us your idea and we'll send you a tailored proposal in under 24 hours. No strings attached.",
    primary: "Get a free quote",
    secondary: "See more projects",
  },
  contact: {
    eyebrow: "Contact",
    titleBefore: "Tell us your idea.",
    titleHighlight: "We'll make it real.",
    subtitle: "We reply in under 24 hours. No commitment, no unnecessary jargon.",
    labels: {
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
    },
    mapCta: "Get directions",
    form: {
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@email.com",
      company: "Company",
      companyPh: "Your business name (optional)",
      message: "Message",
      messagePh: "Tell us what you need...",
      submit: "Send message",
      sending: "Sending…",
      another: "Send another message",
      consent: "By submitting you agree that we may contact you about your inquiry.",
    },
    success: {
      title: "Message sent!",
      text: "Thanks for reaching out. We'll get back to you in under 24 hours.",
    },
    errorFallback: "Could not send. Please try again.",
    validation: {
      name: "Please enter your name.",
      email: "Please enter a valid email.",
      message: "Tell us a bit more (min. 10 characters).",
    },
  },
  footer: {
    tagline:
      "Custom software for small businesses that think big. Based in Florida, available worldwide.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    madeIn: "Designed and developed in Florida, USA.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
