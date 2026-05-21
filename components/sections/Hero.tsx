"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { LogoMark } from "../Logo";
import { CircuitLines, GoldGlow } from "../ui/Decor";
import { Counter } from "../ui/Counter";
import { useI18n } from "../i18n/LanguageProvider";
import { stats } from "@/lib/data";

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-ink-900 pt-28 sm:pt-36"
    >
      {/* Capas de fondo tech-industrial */}
      <div className="absolute inset-0 -z-20 bg-metal" />
      <div className="absolute inset-0 -z-10 bg-radial-gold" />
      <CircuitLines className="opacity-70 mask-fade-b" />
      <GoldGlow className="left-1/2 top-[-6rem] -translate-x-1/2" />
      {/* Línea de escaneo industrial */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px overflow-hidden">
        <div className="h-px w-full animate-scan bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      </div>

      <div className="container-page pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tightest text-white sm:text-6xl md:text-7xl text-balance"
          >
            {t.hero.titleBefore}{" "}
            <span className="text-gold-gradient">{t.hero.titleHighlight}</span>{" "}
            {t.hero.titleAfter}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a href="#contacto" className="btn-primary group w-full sm:w-auto">
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#servicios" className="btn-ghost w-full sm:w-auto">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Marca flotante + panel de "consola" decorativo */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="card-metal overflow-hidden p-1.5">
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 font-mono text-xs text-steel-500">
                {t.hero.consoleTitle}
              </span>
            </div>
            <div className="relative grid gap-px overflow-hidden rounded-xl bg-white/[0.04] sm:grid-cols-2">
              <div className="flex items-center justify-center bg-ink-800 p-10 sm:p-14">
                <LogoMark className={`h-36 w-36 sm:h-44 sm:w-44 ${reduce ? "" : "animate-float"}`} />
              </div>
              <div className="space-y-3 bg-ink-800 p-6 sm:p-8 font-mono text-xs sm:text-sm">
                <p className="text-steel-500">{t.hero.consoleComment}</p>
                <p className="text-steel-300">
                  <span className="text-gold-400">const</span> sds ={" "}
                  <span className="text-cyan-400">deliver</span>(business);
                </p>
                <p className="text-steel-300">
                  sds.<span className="text-gold-400">web</span>().
                  <span className="text-gold-400">mobile</span>().
                  <span className="text-gold-400">ecommerce</span>();
                </p>
                <p className="text-steel-300">
                  sds.<span className="text-cyan-400">automate</span>(processes);
                </p>
                <p className="text-emerald-400">{t.hero.deployed}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="bg-ink-800 px-4 py-6 text-center"
            >
              <div className="font-display text-2xl font-bold text-gold-gradient sm:text-3xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-steel-400 sm:text-sm">
                {t.hero.stats[i]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
