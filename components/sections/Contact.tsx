"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useI18n } from "../i18n/LanguageProvider";
import type { Dictionary } from "@/lib/i18n";
import { SectionHeading } from "../ui/SectionHeading";
import { CircuitLines } from "../ui/Decor";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Record<string, string>, v: Dictionary["contact"]["validation"]): Errors {
  const e: Errors = {};
  if (!data.name || data.name.trim().length < 2) e.name = v.name;
  if (!data.email || !EMAIL_RE.test(data.email)) e.email = v.email;
  if (!data.message || data.message.trim().length < 10) e.message = v.message;
  return e;
}

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${siteConfig.contact.geo.lat},${siteConfig.contact.geo.lng}`;

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
      // Honeypot anti-spam (campo oculto que debe quedar vacío).
      website: String(fd.get("website") ?? ""),
    };

    const v = validate(data, c.validation);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("loading");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || c.errorFallback);
      setStatus("success");
      setServerMsg(json?.message || "");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerMsg(err instanceof Error ? err.message : c.errorFallback);
    }
  }

  const contactItems = [
    { Icon: MapPin, label: c.labels.address, value: siteConfig.contact.address.full },
    { Icon: Phone, label: c.labels.phone, value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phoneHref}` },
    { Icon: Mail, label: c.labels.email, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { Icon: Clock, label: c.labels.hours, value: siteConfig.contact.hours },
  ];

  return (
    <section id="contacto" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <CircuitLines className="opacity-40" />
      <div className="container-page">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={
            <>
              {c.titleBefore}{" "}
              <span className="text-gold-gradient">{c.titleHighlight}</span>
            </>
          }
          subtitle={c.subtitle}
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-5">
          {/* Datos de contacto + mapa */}
          <div className="space-y-5 lg:col-span-2">
            <ul className="card-metal space-y-5 p-7">
              {contactItems.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold-400/20 bg-gold-400/[0.08] text-gold-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-steel-500">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-steel-200 transition-colors hover:text-gold-400"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-steel-200">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {/* Mapa estático estilizado (SVG, sin APIs externas) */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal group relative block aspect-[16/10] overflow-hidden"
              aria-label={t.a11y.openMaps}
            >
              <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden="true">
                <rect width="400" height="250" fill="#101013" />
                <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="250" />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
                  ))}
                </g>
                {/* "Calles" destacadas */}
                <path d="M0 170 L180 150 L400 180" stroke="rgba(245,166,35,0.18)" strokeWidth="6" fill="none" />
                <path d="M150 0 L170 130 L150 250" stroke="rgba(255,255,255,0.07)" strokeWidth="8" fill="none" />
                <path d="M260 0 L250 250" stroke="rgba(255,255,255,0.07)" strokeWidth="8" fill="none" />
                {/* Bloques */}
                <rect x="40" y="60" width="70" height="50" rx="4" fill="rgba(255,255,255,0.03)" />
                <rect x="300" y="100" width="60" height="70" rx="4" fill="rgba(255,255,255,0.03)" />
                {/* Pin */}
                <g transform="translate(200 110)">
                  <circle r="26" fill="rgba(245,166,35,0.15)" className="animate-pulse-glow" />
                  <path
                    d="M0 -18 C10 -18 18 -10 18 0 C18 12 0 28 0 28 C0 28 -18 12 -18 0 C-18 -10 -10 -18 0 -18 Z"
                    fill="#f5a623"
                  />
                  <circle cy="-2" r="6" fill="#0a0a0b" />
                </g>
              </svg>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-900/80 px-3 py-1.5 text-xs text-steel-200 backdrop-blur transition-colors group-hover:text-gold-400">
                <MapPin className="h-3.5 w-3.5" />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.region}
                <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          </div>

          {/* Formulario */}
          <div className="card-metal p-7 lg:col-span-3">
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-14 w-14 text-emerald-400" />
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  {c.success.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-steel-300">
                  {serverMsg || c.success.text}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-ghost mt-6"
                >
                  {c.form.another}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label={c.form.name}
                    name="name"
                    placeholder={c.form.namePh}
                    error={errors.name}
                    required
                  />
                  <Field
                    label={c.form.email}
                    name="email"
                    type="email"
                    placeholder={c.form.emailPh}
                    error={errors.email}
                    required
                  />
                </div>
                <Field
                  label={c.form.company}
                  name="company"
                  placeholder={c.form.companyPh}
                />
                <Field
                  label={c.form.message}
                  name="message"
                  as="textarea"
                  placeholder={c.form.messagePh}
                  error={errors.message}
                  required
                />

                {/* Honeypot oculto */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {status === "error" && (
                  <p className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {serverMsg || c.errorFallback}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {c.form.sending}
                    </>
                  ) : (
                    <>
                      {c.form.submit} <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-steel-500">{c.form.consent}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required,
  as = "input",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  as?: "input" | "textarea";
}) {
  const base =
    "w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/60";
  const border = error ? "border-rose-500/50" : "border-white/10 focus:border-gold-400/50";

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-steel-200">
        {label}
        {required && <span className="text-gold-400"> *</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={5}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={cn(base, border, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={cn(base, border)}
        />
      )}
      {error && <span className="mt-1.5 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}
