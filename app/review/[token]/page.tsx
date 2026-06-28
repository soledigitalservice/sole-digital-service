import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { verifyToken } from "@/lib/reviews/tokens";
import { getInvitation } from "@/lib/reviews/storage";
import { ReviewForm } from "@/components/reviews/ReviewForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Deja tu reseña",
  robots: { index: false, follow: false },
};

export default async function ReviewPage({
  params,
}: {
  params: { token: string };
}) {
  const verified = verifyToken(params.token);
  if (!verified) {
    return (
      <div className="container-page py-32">
        <div className="card-metal mx-auto max-w-md p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-rose-400" />
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            Enlace inválido
          </h1>
          <p className="mt-2 text-sm text-steel-300">
            El enlace no es válido o ha caducado. Pídenos uno nuevo.
          </p>
          <Link href="/" className="btn-ghost mt-6 inline-flex">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const invitation = await getInvitation(verified.invitationId);
  if (!invitation) return notFound();

  if (invitation.usedAt) {
    return (
      <div className="container-page py-32">
        <div className="card-metal mx-auto max-w-md p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            Reseña ya enviada
          </h1>
          <p className="mt-2 text-sm text-steel-300">
            Este enlace ya se utilizó. ¡Gracias por tu opinión!
          </p>
          <Link href="/" className="btn-ghost mt-6 inline-flex">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-24 sm:py-32">
      <div className="mx-auto max-w-lg text-center">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          Reseña verificada
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Hola <span className="text-gold-gradient">{invitation.clientName}</span>
        </h1>
        <p className="mt-3 text-base text-steel-300">
          Tu opinión nos importa muchísimo. Solo te llevará un minuto.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-lg">
        <ReviewForm
          token={params.token}
          clientName={invitation.clientName}
          company={invitation.company}
        />
      </div>
    </div>
  );
}
