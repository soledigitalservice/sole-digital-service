import { NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  addReview,
  getInvitation,
  listReviews,
  markInvitationUsed,
} from "@/lib/reviews/storage";
import { verifyToken } from "@/lib/reviews/tokens";
import type { Review } from "@/lib/reviews/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET público: lista de reseñas publicadas. */
export async function GET() {
  const items = await listReviews();
  return NextResponse.json({ items });
}

/** POST: el cliente envía su reseña (requiere token válido). */
export async function POST(req: Request) {
  let body: { token?: string; rating?: number; comment?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const token = String(body.token ?? "");
  const rating = Math.round(Number(body.rating ?? 0));
  const comment = String(body.comment ?? "").trim().slice(0, 1500);

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Puntuación inválida (debe ser de 1 a 5)." },
      { status: 422 }
    );
  }
  if (comment.length < 10) {
    return NextResponse.json(
      { error: "Comentario demasiado corto (mín. 10 caracteres)." },
      { status: 422 }
    );
  }

  const verified = verifyToken(token);
  if (!verified) {
    return NextResponse.json({ error: "Enlace inválido o caducado." }, { status: 401 });
  }

  const invitation = await getInvitation(verified.invitationId);
  if (!invitation) {
    return NextResponse.json({ error: "Invitación no encontrada." }, { status: 404 });
  }
  if (invitation.usedAt) {
    return NextResponse.json(
      { error: "Este enlace ya se utilizó." },
      { status: 409 }
    );
  }

  const review: Review = {
    id: crypto.randomUUID(),
    invitationId: invitation.id,
    clientName: invitation.clientName,
    company: invitation.company,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  await addReview(review);
  await markInvitationUsed(invitation.id);

  return NextResponse.json({ ok: true, review });
}
