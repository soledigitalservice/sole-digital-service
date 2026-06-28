"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "./i18n/LanguageProvider";
import { siteConfig } from "@/lib/site";

const socials = [
  { href: siteConfig.social.github, label: "GitHub", Icon: Github },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: Instagram },
];

export function Footer() {
  const { t } = useI18n();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/servicios", label: t.nav.services },
    { href: "/#portafolio", label: t.nav.portfolio },
    { href: "/team", label: t.nav.team },
    { href: "/resenas", label: t.nav.reviews },
    { href: "/contacto", label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-400">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-steel-300 transition-all hover:border-gold-400/60 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-400 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-steel-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{siteConfig.contact.address.full}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-steel-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-gold-400" />
            {t.footer.madeIn}
          </p>
        </div>
      </div>
    </footer>
  );
}
