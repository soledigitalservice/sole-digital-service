import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trustpilot } from "@/components/sections/Trustpilot";
import { ReviewsList } from "@/components/sections/ReviewsList";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Reseñas",
  description:
    "Reseñas verificadas de clientes reales de Sole Digital Service y opiniones públicas en Trustpilot.",
  alternates: { canonical: "/resenas" },
};

export const dynamic = "force-dynamic";

export default function ResenasPage() {
  const hasTrustpilot =
    !!process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID &&
    !!process.env.NEXT_PUBLIC_TRUSTPILOT_DOMAIN;

  return (
    <div className="pt-14">
      <section className="relative py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Reseñas"
            title={
              <>
                Lo que dicen{" "}
                <span className="text-gold-gradient">nuestros clientes</span>
              </>
            }
            subtitle="Reseñas verificadas firmadas por clientes reales, y opiniones públicas en Trustpilot."
          />

          {hasTrustpilot && (
            <div className="mx-auto mt-12 max-w-4xl">
              <Trustpilot />
            </div>
          )}

          <div className="mt-16">
            <ReviewsList />
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
