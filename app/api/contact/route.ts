import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string; // honeypot
};

function sanitize(value: unknown, max = 5000): string {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Guarda el mensaje en data/messages.json como respaldo si no hay SMTP configurado. */
async function storeLocally(entry: Record<string, unknown>) {
  const file = path.join(process.cwd(), "data", "messages.json");
  let list: unknown[] = [];
  try {
    const raw = await fs.readFile(file, "utf8");
    list = JSON.parse(raw);
    if (!Array.isArray(list)) list = [];
  } catch {
    // archivo inexistente o vacío: empezamos de cero
  }
  list.push(entry);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la petición inválido." }, { status: 400 });
  }

  // Honeypot: si viene relleno, es un bot. Fingimos éxito sin hacer nada.
  if (sanitize(body.website)) {
    return NextResponse.json({ ok: true, message: "Mensaje recibido." });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 180);
  const company = sanitize(body.company, 160);
  const message = sanitize(body.message, 5000);

  // Validación en servidor (independiente de la del cliente).
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Nombre inválido.";
  if (!EMAIL_RE.test(email)) errors.email = "Email inválido.";
  if (message.length < 10) errors.message = "Mensaje demasiado corto.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Revisa los campos del formulario.", fields: errors },
      { status: 422 }
    );
  }

  const entry = {
    name,
    email,
    company: company || "—",
    message,
    receivedAt: new Date().toISOString(),
  };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const to = process.env.CONTACT_EMAIL || siteConfig.contact.email;

  // Si no hay SMTP configurado, usamos el respaldo en archivo JSON local.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    try {
      await storeLocally(entry);
      return NextResponse.json({
        ok: true,
        message:
          "Mensaje guardado correctamente. (SMTP no configurado: se almacenó localmente.)",
      });
    } catch (err) {
      console.error("[contact] fallo al guardar localmente:", err);
      return NextResponse.json(
        { error: "No se pudo procesar el mensaje en este momento." },
        { status: 500 }
      );
    }
  }

  // Envío por correo con Nodemailer (SMTP autónomo).
  try {
    const port = Number(SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, // SSL directo en 465; STARTTLS en 587
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#0a0a0b;color:#e5e7eb;padding:24px;border-radius:12px">
        <h2 style="color:#f5a623;margin:0 0 16px">Nuevo mensaje de contacto</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#9ca3af">Nombre</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af">Email</td><td style="padding:6px 0">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 0;color:#9ca3af">Empresa</td><td style="padding:6px 0">${escapeHtml(company || "—")}</td></tr>
        </table>
        <p style="color:#9ca3af;margin:16px 0 6px">Mensaje</p>
        <div style="white-space:pre-wrap;background:#16161a;padding:16px;border-radius:8px;border:1px solid #26262d">${escapeHtml(message)}</div>
        <p style="color:#6b7280;font-size:12px;margin-top:20px">Enviado desde ${escapeHtml(siteConfig.name)} · ${entry.receivedAt}</p>
      </div>`;

    await transporter.sendMail({
      from: `"${siteConfig.name} Web" <${SMTP_USER}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Nuevo contacto: ${name}${company ? ` (${company})` : ""}`,
      text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || "—"}\n\n${message}`,
      html,
    });

    return NextResponse.json({
      ok: true,
      message: "Gracias por contactarnos. Te responderemos en menos de 24 horas.",
    });
  } catch (err) {
    console.error("[contact] fallo al enviar el correo:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el correo. Inténtalo más tarde o escríbenos directamente." },
      { status: 502 }
    );
  }
}
