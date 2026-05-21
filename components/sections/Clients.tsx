"use client";

import { clients } from "@/lib/data";
import { useI18n } from "../i18n/LanguageProvider";

/** Franja "confían en nosotros" con marquee infinito (pausa al hover). */
export function Clients() {
  const { t } = useI18n();
  const row = [...clients, ...clients];
  return (
    <section aria-label={t.clients.title} className="border-y border-white/[0.06] bg-ink-950 py-10">
      <div className="container-page">
        <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-steel-500">
          {t.clients.title}
        </p>
      </div>
      <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-steel-600 transition-colors hover:text-gold-400"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
