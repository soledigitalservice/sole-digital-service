import "server-only";
import crypto from "node:crypto";

/**
 * Tokens HMAC firmados para enlaces de reseña.
 * Formato: `<invitationId>.<timestamp>.<signature>` (todo base64url).
 *
 * - `invitationId`: ID de la invitación (también clave de almacenamiento).
 * - `timestamp`: cuándo se firmó (para caducidad opcional).
 * - `signature`: HMAC-SHA256 sobre `invitationId.timestamp` con `REVIEW_TOKEN_SECRET`.
 *
 * Stateless: no requiere DB para verificar la firma. La unicidad/uso de la
 * invitación sí se gestiona en storage (marcamos como "usado" tras enviar).
 */

const SECRET = process.env.REVIEW_TOKEN_SECRET || "";

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payload: string): string {
  if (!SECRET) throw new Error("REVIEW_TOKEN_SECRET no configurado.");
  return b64url(crypto.createHmac("sha256", SECRET).update(payload).digest());
}

export function createToken(invitationId: string): string {
  const ts = Date.now().toString();
  const payload = `${invitationId}.${ts}`;
  return `${payload}.${sign(payload)}`;
}

export type VerifiedToken = {
  invitationId: string;
  issuedAt: number;
};

export function verifyToken(token: string): VerifiedToken | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [invitationId, ts, sig] = parts;
  if (!invitationId || !ts || !sig) return null;

  let expected: string;
  try {
    expected = sign(`${invitationId}.${ts}`);
  } catch {
    return null;
  }

  // Comparación en tiempo constante.
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  return { invitationId, issuedAt: Number(ts) };
}
