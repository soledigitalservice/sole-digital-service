"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/lib/data";
import { useI18n } from "../i18n/LanguageProvider";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

/** Vista compacta del equipo para la home; enlaza a /team. */
export function TeamPreview() {
  const { t } = useI18n();

  return (
    <section className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t.nav.team} title={t.about.teamTitle} />

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="card-metal group flex items-center gap-4 p-6">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-bold text-ink-900 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(140deg, ${member.accent}, ${member.accent}aa)`,
                  }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-steel-400">{t.about.roles[i]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link href="/team" className="btn-ghost group">
            {t.about.teamCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
