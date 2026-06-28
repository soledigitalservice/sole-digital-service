import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Edge runtime: evita un bug de @vercel/og al cargar la fuente por defecto en
// Windows durante el prerender (fileURLToPath / Invalid URL).
export const runtime = "edge";

export const alt = `${siteConfig.name} — Desarrollo de software para pequeños negocios`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen social (Open Graph / Twitter) generada dinámicamente, sin assets externos.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #101013 0%, #0a0a0b 60%)",
          padding: 80,
          fontFamily: "sans-serif",
          color: "#fff",
        }}
      >
        {/* halo dorado superior (sintaxis soportada por Satori) */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 600,
            height: 600,
            borderRadius: 600,
            background:
              "radial-gradient(circle, rgba(245,166,35,0.30) 0%, rgba(245,166,35,0) 70%)",
          }}
        />
        {/* línea superior */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="84" height="84" viewBox="0 0 120 120">
            <g
              fill="none"
              stroke="#f5a623"
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M84 30 L48 30 C34 30 28 36 28 48 C28 58 34 64 48 64 L60 64" />
              <path d="M36 90 L72 90 C86 90 92 84 92 72 C92 62 86 56 72 56 L60 56" />
            </g>
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
            <span>Sole</span>
            <span style={{ color: "#f5a623", marginLeft: 10, marginRight: 10 }}>
              Digital
            </span>
            <span>Service</span>
          </div>
        </div>

        {/* título */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            Software a medida para
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: "#f5a623",
            }}
          >
            pequeños negocios.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#aeb5c4" }}>
            Webs · Apps · E-commerce · Automatización
          </div>
        </div>

        {/* pie */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#828ca2",
          }}
        >
          <span>Florida, USA · Disponibilidad global</span>
          <span style={{ color: "#f5a623" }}>soledigitalservice.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
