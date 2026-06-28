import { ShieldCheck, Star, Quote } from "lucide-react";
import { listReviews } from "@/lib/reviews/storage";
import { cn } from "@/lib/utils";

/**
 * Lista pública de reseñas verificadas (server component).
 * Se renderiza en server, leyendo el almacenamiento; sin JS de cliente.
 */
export async function ReviewsList() {
  const reviews = await listReviews();

  if (reviews.length === 0) {
    return (
      <div className="card-metal mx-auto max-w-xl p-8 text-center">
        <Quote className="mx-auto h-10 w-10 text-gold-400/40" />
        <p className="mt-4 text-sm text-steel-300">
          Aún no hay reseñas verificadas publicadas. ¡Pronto las habrá!
        </p>
      </div>
    );
  }

  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div>
      <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.round(avg) ? "fill-gold-400 text-gold-400" : "text-steel-600"
              )}
            />
          ))}
          <span className="ml-2 font-display text-2xl font-bold text-white">
            {avg.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-steel-400">
          {reviews.length} reseña{reviews.length === 1 ? "" : "s"} verificada
          {reviews.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.id}>
            <figure className="card-metal h-full p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-400/[0.06] px-2.5 py-1 text-xs font-medium text-gold-300">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verificada
                </span>
                <div className="flex gap-0.5">
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
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-steel-200">
                “{r.comment}”
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                <span>
                  <span className="block font-display font-semibold text-white">
                    {r.clientName}
                  </span>
                  <span className="block text-sm text-steel-400">{r.company}</span>
                </span>
                <span className="text-xs text-steel-500">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
