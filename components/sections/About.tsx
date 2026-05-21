"use client";

import { Target, Eye, Heart, type LucideIcon } from "lucide-react";
import { useI18n } from "../i18n/LanguageProvider";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { team, processSteps } from "@/lib/data";

const pillarIcons: LucideIcon[] = [Target, Eye, Heart];

export function About() {
  const { t } = useI18n();

  return (
    <section id="nosotros" className="relative scroll-mt-20 bg-ink-950 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.about.eyebrow}
          title={
            <>
              {t.about.titleBefore}{" "}
              <span className="text-gold-gradient">{t.about.titleHighlight}</span>
            </>
          }
          subtitle={t.about.subtitle}
        />

        {/* Misión / Visión / Valores */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.about.pillars.map((p, i) => {
            const PillarIcon = pillarIcons[i] ?? Target;
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="card-metal h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gold-400">
                    <PillarIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-300">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Proceso */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              {t.about.processTitle}
            </h3>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => {
              const copy = t.about.steps[i];
              return (
                <Reveal key={step.number} delay={i * 0.06}>
                  <div className="relative h-full rounded-2xl border border-white/[0.06] bg-ink-800/60 p-6">
                    <span className="font-display text-4xl font-bold text-white/[0.08]">
                      {step.number}
                    </span>
                    <div className="-mt-6 flex h-10 w-10 items-center justify-center rounded-lg border border-gold-400/20 bg-gold-400/[0.08] text-gold-400">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 font-display font-semibold text-white">
                      {copy.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-steel-400">
                      {copy.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Equipo */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              {t.about.teamTitle}
            </h3>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.06}>
                <div className="group card-metal overflow-hidden p-6 text-center">
                  <div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl font-display text-2xl font-bold text-ink-900 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(140deg, ${member.accent}, ${member.accent}aa)`,
                    }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                  <h4 className="mt-4 font-display font-semibold text-white">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-sm text-steel-400">{t.about.roles[i]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
