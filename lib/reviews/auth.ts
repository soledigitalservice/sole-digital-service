import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Autenticación admin sencilla basada en cookie firmada.
 * No es un sistema de usuarios: solo verifica la contraseña ADMIN_PASSWORD
 * y emite una cookie HMAC válida hasta su caducidad.
 *
 * Suficiente para una empresa pequeña con un único administrador.
 */

const COOKIE_NAME = "sds_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 horas

function getSecret(): string {
  // Se reutiliza REVIEW_TOKEN_SECRET para firmar también la cookie de admin;
  // así basta con una sola variable secreta.
  const s = process.env.REVIEW_TOKEN_SECRET;
  if (!s) throw new Error("REVIEW_TOKEN_SECRET no configurado.");
  return s;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

/** Comprueba la contraseña en texto plano contra ADMIN_PASSWORD. */
export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Emite la cookie de sesión admin. */
export function createAdminSession() {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin.${exp}`;
  const value = `${payload}.${sign(payload)}`;
  // No marcamos `secure: true` porque rompería el panel cuando se accede por
  // HTTP local (next start). En producción Netlify fuerza HTTPS, y la cookie
  // sigue siendo httpOnly + sameSite=lax, suficiente protección para este caso.
  cookies().set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

/** Borra la cookie de sesión admin. */
export function destroyAdminSession() {
  cookies().delete(COOKIE_NAME);
}

/** Verifica si la petición actual tiene sesión admin válida. */
export function isAdminAuthenticated(): boolean {
  const cookie = cookies().get(COOKIE_NAME);
  if (!cookie?.value) return false;
  const parts = cookie.value.split(".");
  if (parts.length !== 3) return false;
  const [role, expStr, sig] = parts;
  if (role !== "admin" || !expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  let expected: string;
  try {
    expected = sign(`${role}.${expStr}`);
  } catch {
    return false;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
