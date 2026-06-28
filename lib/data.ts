/**
 * Datos ESTRUCTURALES del sitio (independientes del idioma): iconos, colores,
 * tecnologías, nombres propios y claves. Los textos traducibles viven en
 * lib/i18n.ts y se combinan con estos arrays por el mismo índice/clave.
 */

export type Service = {
  slug: string;
  icon: string;
};

export const services: Service[] = [
  { slug: "web", icon: "Code2" },
  { slug: "mobile", icon: "Smartphone" },
  { slug: "ecommerce", icon: "ShoppingCart" },
  { slug: "automation", icon: "Workflow" },
];

export type ProjectMockupKind =
  | "ecommerce"
  | "mobile-health"
  | "fleet-map"
  | "erp-dashboard"
  | "elearning"
  | "delivery";

export type IndustryKey =
  | "retail"
  | "health"
  | "logistics"
  | "hospitality"
  | "education";

export type Project = {
  slug: string;
  client: string; // nombre propio (no se traduce)
  industryKey: IndustryKey;
  tech: string[];
  kind: ProjectMockupKind;
  gradient: string;
  accent: string;
};

/** Claves de industria para los filtros ("all" = todos). */
export const industryKeys = [
  "all",
  "retail",
  "health",
  "logistics",
  "hospitality",
  "education",
] as const;
export type IndustryFilter = (typeof industryKeys)[number];

export const projects: Project[] = [
  {
    slug: "lumen-retail",
    client: "Lumen Boutique",
    industryKey: "retail",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    kind: "ecommerce",
    gradient: "from-amber-500/30 via-ink-700 to-ink-900",
    accent: "#f5a623",
  },
  {
    slug: "medi-track",
    client: "Clínica Norte",
    industryKey: "health",
    tech: ["React Native", "Node.js", "FHIR"],
    kind: "mobile-health",
    gradient: "from-cyan-500/25 via-ink-700 to-ink-900",
    accent: "#22d3ee",
  },
  {
    slug: "cargo-flow",
    client: "Andes Logistics",
    industryKey: "logistics",
    tech: ["Next.js", "MapKit", "WebSockets"],
    kind: "fleet-map",
    gradient: "from-orange-500/25 via-ink-700 to-ink-900",
    accent: "#fb923c",
  },
  {
    slug: "savor-os",
    client: "Grupo Savor",
    industryKey: "hospitality",
    tech: ["Next.js", "Prisma", "Tailwind"],
    kind: "erp-dashboard",
    gradient: "from-rose-500/25 via-ink-700 to-ink-900",
    accent: "#fb7185",
  },
  {
    slug: "edupath",
    client: "Instituto Pixel",
    industryKey: "education",
    tech: ["Next.js", "Mux", "PostgreSQL"],
    kind: "elearning",
    gradient: "from-violet-500/25 via-ink-700 to-ink-900",
    accent: "#a78bfa",
  },
  {
    slug: "freshmarket",
    client: "FreshMarket",
    industryKey: "retail",
    tech: ["React Native", "Stripe", "Firebase"],
    kind: "delivery",
    gradient: "from-emerald-500/25 via-ink-700 to-ink-900",
    accent: "#34d399",
  },
];

export type Testimonial = {
  name: string; // nombre propio
  company: string; // nombre propio
  initials: string;
};

export const testimonials: Testimonial[] = [
  { name: "Marta Ríos", company: "Lumen Boutique", initials: "MR" },
  { name: "Dr. Andrés Pérez", company: "Clínica Norte", initials: "AP" },
  { name: "Lucía Fernández", company: "Andes Logistics", initials: "LF" },
  { name: "Carlos Méndez", company: "Grupo Savor", initials: "CM" },
];

export type TeamMember = {
  name: string; // nombre propio
  initials: string;
  accent: string;
};

export const team: TeamMember[] = [
  { name: "Sofía Alanís", initials: "SA", accent: "#f5a623" },
  { name: "Diego Romero", initials: "DR", accent: "#22d3ee" },
];

export type Step = {
  number: string;
  icon: string;
};

export const processSteps: Step[] = [
  { number: "01", icon: "Search" },
  { number: "02", icon: "PenTool" },
  { number: "03", icon: "Code2" },
  { number: "04", icon: "Rocket" },
];

export const stats: { value: number; suffix?: string }[] = [
  { value: 2 },
  { value: 2 },
];

/** Marcas de clientes (ficticias) para la franja de confianza. */
export const clients: string[] = [
  "Lumen",
  "Clínica Norte",
  "Andes Logistics",
  "Grupo Savor",
  "Instituto Pixel",
  "FreshMarket",
  "NovaTech",
  "Brick & Co.",
];
