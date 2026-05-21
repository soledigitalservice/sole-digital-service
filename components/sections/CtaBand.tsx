"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import { useI18n } from "../i18n/LanguageProvider";
import { Reveal } from "../ui/Reveal";
import { CircuitLines } from "../ui/Decor";

export function CtaBand() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-gold-400/20 bg-gradient-to-br from-ink-700 to-ink-900 px-6 py-14 text-center shadow-card sm:px-12 sm:py-16">
            <CircuitLines className="opacity-40" />
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-400/20 blur-[110px]" />

            <span className="eyebrow mx-auto">
              <MessageSquare className="h-3.5 w-3.5" />
              {t.cta.eyebrow}
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl text-balance">
              {t.cta.titleBefore}{" "}
              <span className="text-gold-gradient">{t.cta.titleHighlight}</span>
              {t.cta.titleAfter}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-steel-300 sm:text-lg">
              {t.cta.subtitle}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#contacto" className="btn-primary group w-full sm:w-auto">
                {t.cta.primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#portafolio" className="btn-ghost w-full sm:w-auto">
                {t.cta.secondary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
