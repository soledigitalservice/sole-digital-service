"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/data";
import { useI18n } from "../i18n/LanguageProvider";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { GridGlow } from "../ui/Decor";

export function Services() {
  const { t } = useI18n();

  return (
    <section id="servicios" className="relative scroll-mt-20 py-24 sm:py-32">
      <GridGlow />
      <div className="container-page">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={
            <>
              {t.services.titleBefore}{" "}
              <span className="text-gold-gradient">{t.services.titleHighlight}</span>
            </>
          }
          subtitle={t.services.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const copy = t.services.items[i];
            return (
              <Reveal key={service.slug} delay={i * 0.06}>
                <article className="card-metal group h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/30">
                  {/* Brillo metálico al hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold-400/10 via-transparent to-transparent" />
                  </div>

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/[0.08] text-gold-400 transition-colors group-hover:bg-gold-400/15">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </div>

                  <h3 className="relative mt-5 font-display text-xl font-semibold text-white">
                    {copy.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-steel-300">
                    {copy.description}
                  </p>

                  <ul className="relative mt-5 space-y-2">
                    {copy.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-steel-400">
                        <Check className="h-4 w-4 shrink-0 text-gold-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-gold-400 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    {t.services.ctaCard}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
