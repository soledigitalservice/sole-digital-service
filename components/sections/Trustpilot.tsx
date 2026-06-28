"use client";

import { useEffect } from "react";

/**
 * Widget oficial de Trustpilot. Se renderiza solo si están configuradas las
 * variables NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID y NEXT_PUBLIC_TRUSTPILOT_DOMAIN
 * (la ID de tu cuenta y tu dominio en Trustpilot). Si no, no aparece nada.
 *
 * Para personalizar el template: pasa una `templateId` distinta.
 * Defaults: "Mini Carousel" (gratis).
 */
export function Trustpilot({
  templateId = "539ad60defb9600b94d7df2c", // Mini Carousel
  height = 240,
  theme = "dark",
}: {
  templateId?: string;
  height?: number;
  theme?: "dark" | "light";
}) {
  const businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID;
  const domain = process.env.NEXT_PUBLIC_TRUSTPILOT_DOMAIN;

  useEffect(() => {
    if (!businessUnitId || !domain) return;
    if (typeof window === "undefined") return;
    // Si el script ya está, inicializa los widgets nuevos.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.Trustpilot && typeof w.Trustpilot.loadFromElement === "function") {
      document
        .querySelectorAll(".trustpilot-widget")
        .forEach((el) => w.Trustpilot.loadFromElement(el, true));
      return;
    }
    if (document.getElementById("trustpilot-bootstrap")) return;
    const s = document.createElement("script");
    s.id = "trustpilot-bootstrap";
    s.async = true;
    s.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    document.body.appendChild(s);
  }, [businessUnitId, domain]);

  if (!businessUnitId || !domain) return null;

  return (
    <div
      className="trustpilot-widget"
      data-locale="es-ES"
      data-template-id={templateId}
      data-businessunit-id={businessUnitId}
      data-style-height={`${height}px`}
      data-style-width="100%"
      data-theme={theme}
    >
      <a
        href={`https://www.trustpilot.com/review/${domain}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
}
