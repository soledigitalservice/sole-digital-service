import "server-only";
import nodemailer from "nodemailer";
import { siteConfig } from "./site";

/**
 * Helper compartido para envío SMTP (formulario de contacto e invitaciones
 * de reseña). Devuelve `null` si SMTP no está configurado.
 */
export function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export const mailFrom = `"${siteConfig.name}" <${process.env.SMTP_USER ?? ""}>`;
