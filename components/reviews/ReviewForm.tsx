"use client";

import { useState, type FormEvent } from "react";
import { Star, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function ReviewForm({
  token,
  clientName,
  company,
}: {
  token: string;
  clientName: string;
  company: string;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (rating < 1) {
      setError("Selecciona una puntuación de 1 a 5 estrellas.");
      return;
    }
    if (comment.trim().length < 10) {
      setError("Escribe un comentario un poco más largo (mín. 10 caracteres).");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, rating, comment }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "No se pudo enviar.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  if (status === "success") {
    return (
      <div className="card-metal p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
        <h2 className="mt-4 font-display text-xl font-semibold text-white">
          ¡Gracias por tu reseña!
        </h2>
        <p className="mt-2 text-sm text-steel-300">
          Tu opinión ya está publicada en nuestra web.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-metal space-y-6 p-7">
      <div>
        <span className="block text-xs uppercase tracking-wider text-steel-500">
          Empresa
        </span>
        <span className="block text-base font-semibold text-white">{company}</span>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-steel-200">
          Puntuación <span className="text-gold-400">*</span>
        </span>
        <div className="flex gap-1" role="radiogroup" aria-label="Puntuación">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n <= (hover || rating);
            return (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
                aria-checked={rating === n}
                role="radio"
                className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60"
              >
                <Star
                  className={cn(
                    "h-10 w-10 transition-colors",
                    active ? "fill-gold-400 text-gold-400" : "text-steel-600"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-steel-200">
          Comentario <span className="text-gold-400">*</span>
        </span>
        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={`Cuéntanos cómo fue trabajar con nosotros, ${clientName.split(" ")[0]}…`}
          className="w-full resize-none rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-400/60"
        />
      </label>

      {error && (
        <p className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
          </>
        ) : (
          <>
            Publicar reseña <Send className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-steel-500">
        Tu nombre y empresa son visibles. No publicaremos tu email.
      </p>
    </form>
  );
}
