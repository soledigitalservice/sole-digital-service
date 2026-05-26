import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Somos un equipo distribuido con base en Florida. Misión, visión, valores, nuestro proceso de trabajo y el equipo detrás de Sole Digital Service.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <div className="pt-14">
      <About />
      <CtaBand />
    </div>
  );
}
