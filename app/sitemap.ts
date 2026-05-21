import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#portafolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#nosotros`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/#testimonios`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/#contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
}
