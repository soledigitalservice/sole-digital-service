"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, industryKeys, type IndustryFilter } from "@/lib/data";
import { useI18n } from "../i18n/LanguageProvider";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectMockup } from "../ui/ProjectMockup";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<IndustryFilter>("all");

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.industryKey === filter);

  return (
    <section id="portafolio" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.portfolio.eyebrow}
          title={
            <>
              {t.portfolio.titleBefore}{" "}
              <span className="text-gold-gradient">{t.portfolio.titleHighlight}</span>
            </>
          }
          subtitle={t.portfolio.subtitle}
        />

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {industryKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === key
                  ? "border-gold-400/60 bg-gold-400/10 text-gold-300"
                  : "border-white/10 text-steel-400 hover:border-white/25 hover:text-white"
              )}
              aria-pressed={filter === key}
            >
              {t.portfolio.industries[key]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => {
              const index = projects.indexOf(project);
              const copy = t.portfolio.items[index];
              return (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group card-metal overflow-hidden"
                >
                  {/* "Captura" del proyecto: mockup SVG vectorial temático */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                    <ProjectMockup
                      kind={project.kind}
                      accent={project.accent}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink-900/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {t.portfolio.industries[project.industryKey]}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-white">
                          {copy.title}
                        </h3>
                        <p className="text-sm text-steel-500">{project.client}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-steel-500 transition-colors group-hover:text-gold-400" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-steel-300">
                      {copy.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-steel-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
