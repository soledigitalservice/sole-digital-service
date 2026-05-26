"use client";

import type { ReactNode } from "react";
import { LanguageProvider, useI18n } from "./i18n/LanguageProvider";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress, BackToTop } from "./ui/ScrollUtils";

function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-ink-900"
    >
      {t.a11y.skip}
    </a>
  );
}

/** Capa común a todas las páginas: idioma, navbar, footer y utilidades. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <BackToTop />
    </LanguageProvider>
  );
}
