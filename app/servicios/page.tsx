import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Desarrollo web a medida, apps móviles, e-commerce y automatización de procesos para pequeños negocios.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <div className="pt-14">
      <Services />
      <CtaBand />
    </div>
  );
}
