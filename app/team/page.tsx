import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Somos un equipo distribuido con base en Florida. Conoce las personas detrás de Sole Digital Service.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <div className="pt-14">
      <About />
      <CtaBand />
    </div>
  );
}
