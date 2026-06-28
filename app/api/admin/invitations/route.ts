import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { isAdminAuthenticated } from "@/lib/reviews/auth";
import { addInvitation, listInvitations } from "@/lib/reviews/storage";
import { createToken } from "@/lib/reviews/tokens";
import { createTransporter, mailFrom } from "@/lib/mailer";
import { siteConfig } from "@/lib/site";
import type { Invitation } from "@/lib/reviews/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
}

/** GET: lista de invitaciones para el panel admin. */
export async function GET() {
  if (!isAdminAuthenticated()) return unauthorized();
  const items = await listInvitations();
  // Devolvemos las más recientes primero.
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ items });
}

/** POST: crea una invitación nueva y, opcionalmente, la envía por email. */
export async function POST(req: Request) {
  if (!isAdminAuthenticated()) return unauthorized();

  let body: {
    clientName?: string;
    company?: string;
    email?: string;
    sendEmail?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const clientName = String(body.clientName ?? "").trim().slice(0, 120);
  const company = String(body.company ?? "").trim().slice(0, 160);
  const email = String(body.email ?? "").trim().slice(0, 180);
  if (clientName.length < 2 || company.length < 2) {
    return NextResponse.json(
      { error: "Nombre y empresa son obligatorios." },
      { status: 422 }
    );
  }

  const id = crypto.randomUUID();
  let token: string;
  try {
    token = createToken(id);
  } catch (err) {
    console.error("[invitations] sign error:", err);
    return NextResponse.json(
      { error: "REVIEW_TOKEN_SECRET no está configurado en el servidor." },
      { status: 500 }
    );
  }

  const invitation: Invitation = {
    id,
    clientName,
    company,
    email: email || undefined,
    createdAt: new Date().toISOString(),
    usedAt: null,
  };
  await addInvitation(invitation);

  const url = `${siteUrl()}/review/${token}`;

  // Envío por email opcional.
  let emailSent: { ok: boolean; error?: string } | null = null;
  if (body.sendEmail) {
    if (!email) {
      emailSent = { ok: false, error: "Falta el email del cliente." };
    } else {
      const transporter = createTransporter();
      if (!transporter) {
        emailSent = { ok: false, error: "SMTP no configurado." };
      } else {
        try {
          await transporter.sendMail({
            from: mailFrom,
            to: email,
            subject: `${siteConfig.name} — Nos encantaría tu reseña`,
            text: `Hola ${clientName},\n\nGracias por trabajar con nosotros. ¿Nos dejarías una reseña? Solo te llevará un minuto:\n\n${url}\n\nUn abrazo,\nEl equipo de ${siteConfig.name}.`,
            html: `
              <div style="font-family:Inter,Arial,sans-serif;background:#0a0a0b;color:#e5e7eb;padding:24px;border-radius:12px;max-width:560px">
                <h2 style="color:#f5a623;margin:0 0 12px">Tu opinión nos importa</h2>
                <p>Hola ${escapeHtml(clientName)},</p>
                <p>Gracias por confiar en ${escapeHtml(siteConfig.name)}. Nos encantaría que dejaras una reseña — solo te llevará un minuto.</p>
                <p style="margin:24px 0">
                  <a href="${url}" style="background:#f5a623;color:#0a0a0b;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">Dejar mi reseña</a>
                </p>
                <p style="color:#9ca3af;font-size:12px">Si el botón no funciona, copia y pega este enlace:<br/>${url}</p>
              </div>`,
          });
          emailSent = { ok: true };
        } catch (err) {
          console.error("[invitations] mail error:", err);
          emailSent = {
            ok: false,
            error: err instanceof Error ? err.message : "Error de envío.",
          };
        }
      }
    }
  }

  return NextResponse.json({ invitation, url, emailSent });
}
