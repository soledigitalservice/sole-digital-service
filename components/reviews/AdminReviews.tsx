"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  Loader2,
  Lock,
  LogOut,
  Copy,
  Check,
  Mail,
  Star,
  AlertCircle,
} from "lucide-react";
import type { Invitation, Review } from "@/lib/reviews/types";
import { cn } from "@/lib/utils";

type Authed = "checking" | "anon" | "in";

export function AdminReviews() {
  const [authed, setAuthed] = useState<Authed>("checking");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/admin/session", { cache: "no-store" });
        const j = await r.json();
        setAuthed(j.authenticated ? "in" : "anon");
      } catch {
        setAuthed("anon");
      }
    })();
  }, []);

  if (authed === "checking") {
    return (
      <div className="flex items-center justify-center py-16 text-steel-400">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (authed === "anon") return <LoginForm onSuccess={() => setAuthed("in")} />;
  return <Dashboard onLogout={() => setAuthed("anon")} />;
}

// ─── Login ───────────────────────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const r = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error || "No se pudo iniciar sesión.");
      onSuccess();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-metal mx-auto max-w-sm space-y-5 p-7">
      <div className="text-center">
        <Lock className="mx-auto h-9 w-9 text-gold-400" />
        <h1 className="mt-3 font-display text-xl font-semibold text-white">
          Panel de reseñas
        </h1>
        <p className="mt-1 text-sm text-steel-400">Introduce la contraseña.</p>
      </div>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-steel-500 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400/60"
      />
      {error && (
        <p className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Entrando…
          </>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [inv, rev] = await Promise.all([
        fetch("/api/admin/invitations", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/reviews", { cache: "no-store" }).then((r) => r.json()),
      ]);
      setInvitations(inv.items ?? []);
      setReviews(rev.items ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    onLogout();
  }

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Panel de reseñas
        </h1>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-steel-300 hover:border-gold-400/40 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Salir
        </button>
      </header>

      <NewInvitationForm onCreated={refresh} />

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-white">
          Invitaciones ({invitations.length})
        </h2>
        {loading ? (
          <p className="text-sm text-steel-500">Cargando…</p>
        ) : invitations.length === 0 ? (
          <p className="text-sm text-steel-500">No hay invitaciones todavía.</p>
        ) : (
          <ul className="space-y-3">
            {invitations.map((inv) => (
              <InvitationRow key={inv.id} inv={inv} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-white">
          Reseñas publicadas ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-steel-500">Aún no hay reseñas.</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.id} className="card-metal p-5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < r.rating ? "fill-gold-400 text-gold-400" : "text-steel-600"
                      )}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-steel-200">“{r.comment}”</p>
                <p className="mt-3 text-xs text-steel-500">
                  {r.clientName} · {r.company} ·{" "}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// ─── Crear invitación ────────────────────────────────────────────────────────
function NewInvitationForm({ onCreated }: { onCreated: () => void }) {
  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [result, setResult] = useState<{
    url: string;
    emailSent: { ok: boolean; error?: string } | null;
  } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setResult(null);
    setCopied(false);
    try {
      const r = await fetch("/api/admin/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, company, email, sendEmail }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error || "No se pudo crear.");
      setResult({ url: j.url, emailSent: j.emailSent });
      setClientName("");
      setCompany("");
      setEmail("");
      setSendEmail(false);
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error.");
    } finally {
      setStatus("idle");
    }
  }

  async function copy() {
    if (!result?.url) return;
    await navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <form onSubmit={onSubmit} className="card-metal space-y-5 p-6">
      <h2 className="font-display text-lg font-semibold text-white">
        Nueva invitación
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre del cliente" value={clientName} onChange={setClientName} required />
        <Field label="Empresa" value={company} onChange={setCompany} required />
      </div>
      <Field label="Email (opcional)" type="email" value={email} onChange={setEmail} />
      <label className="flex items-center gap-2 text-sm text-steel-300">
        <input
          type="checkbox"
          checked={sendEmail}
          onChange={(e) => setSendEmail(e.target.checked)}
          disabled={!email}
          className="h-4 w-4 rounded border-white/20 bg-ink-900 text-gold-400 focus:ring-gold-400/60"
        />
        Enviar el enlace por email automáticamente (requiere SMTP)
      </label>

      {error && (
        <p className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Generando…
          </>
        ) : (
          "Generar enlace"
        )}
      </button>

      {result && (
        <div className="space-y-3 rounded-xl border border-gold-400/30 bg-gold-400/[0.06] p-4">
          <p className="text-sm font-medium text-gold-300">¡Enlace listo!</p>
          <div className="flex items-stretch gap-2">
            <input
              readOnly
              value={result.url}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-ink-900 px-3 py-2 text-xs text-steel-200"
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white hover:border-gold-400/40"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          {result.emailSent && (
            <p
              className={cn(
                "flex items-center gap-2 text-xs",
                result.emailSent.ok ? "text-emerald-300" : "text-rose-300"
              )}
            >
              <Mail className="h-3.5 w-3.5" />
              {result.emailSent.ok
                ? "Email enviado al cliente."
                : `No se pudo enviar email: ${result.emailSent.error}`}
            </p>
          )}
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-steel-200">
        {label}
        {required && <span className="text-gold-400"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-steel-500 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400/60"
      />
    </label>
  );
}

function InvitationRow({ inv }: { inv: Invitation }) {
  const used = !!inv.usedAt;
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-ink-800/60 p-4">
      <div className="min-w-0">
        <p className="truncate font-medium text-white">
          {inv.clientName}{" "}
          <span className="text-steel-500">· {inv.company}</span>
        </p>
        <p className="truncate text-xs text-steel-500">
          {new Date(inv.createdAt).toLocaleString()}
          {inv.email && ` · ${inv.email}`}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
          used
            ? "bg-emerald-500/15 text-emerald-300"
            : "bg-gold-400/15 text-gold-300"
        )}
      >
        {used ? "Usada" : "Pendiente"}
      </span>
    </li>
  );
}
