"use client";

import { Globe } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { cn } from "@/lib/utils";

/** Conmutador compacto ES / EN. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-0.5",
        className
      )}
      role="group"
      aria-label={t.a11y.switchLang}
    >
      <Globe className="ml-1.5 h-3.5 w-3.5 text-steel-500" aria-hidden="true" />
      {(["es", "en"] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLocale(lng)}
          aria-pressed={locale === lng}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
            locale === lng
              ? "bg-gold-sheen text-ink-900"
              : "text-steel-400 hover:text-white"
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
