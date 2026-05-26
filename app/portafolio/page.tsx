import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Proyectos de software que hemos diseñado y construido: e-commerce, apps de salud, gestión de flota, ERP de restaurantes, e-learning y delivery.",
  alternates: { canonical: "/portafolio" },
};

export default function PortafolioPage() {
  return (
    <div className="pt-14">
      <Portfolio />
      <CtaBand />
    </div>
  );
}
