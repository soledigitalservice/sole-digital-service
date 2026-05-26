import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos tu idea y te enviaremos una propuesta a medida en menos de 24 horas. Florida, USA · disponibilidad global.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="pt-14">
      <Contact />
    </div>
  );
}
