"use client";

import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { useI18n } from "../i18n/LanguageProvider";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { GridGlow } from "../ui/Decor";

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section
      id="testimonios"
      className="relative scroll-mt-20 bg-ink-950 py-24 sm:py-32"
    >
      <GridGlow />
      <div className="container-page">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={
            <>
              {t.testimonials.titleBefore}{" "}
              <span className="text-gold-gradient">
                {t.testimonials.titleHighlight}
              </span>
            </>
          }
          subtitle={t.testimonials.subtitle}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((person, i) => {
            const copy = t.testimonials.items[i];
            return (
              <Reveal key={person.name} delay={i * 0.06}>
                <figure className="card-metal h-full p-7">
                  <div className="flex items-center justify-between">
                    <Quote className="h-8 w-8 text-gold-400/40" />
                    <div className="flex gap-0.5" aria-label={t.a11y.fiveStars}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-steel-200">
                    “{copy.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-sheen font-display text-sm font-bold text-ink-900"
                      aria-hidden="true"
                    >
                      {person.initials}
                    </span>
                    <span>
                      <span className="block font-display font-semibold text-white">
                        {person.name}
                      </span>
                      <span className="block text-sm text-steel-400">
                        {copy.role} · {person.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
