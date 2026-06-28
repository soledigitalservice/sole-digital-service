import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Invitation, Review } from "./types";

/**
 * Capa de almacenamiento del sistema de reseñas.
 *
 * Doble backend:
 *  - **Netlify Blobs** en producción (detectado por variables de entorno).
 *    Es nativo de Netlify, gratis y sin DB externa.
 *  - **Archivos JSON locales** en `data/` cuando se ejecuta fuera de Netlify
 *    (p. ej. `npm run dev`). No persistente en Vercel/contenedores, sí en VPS.
 */

const INVITATIONS_KEY = "invitations.json";
const REVIEWS_KEY = "reviews.json";

const isNetlify =
  !!process.env.NETLIFY ||
  !!process.env.NETLIFY_BLOBS_CONTEXT ||
  !!process.env.NETLIFY_LOCAL;

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("reviews");
}

// ─── Backend de archivo local (fallback dev) ─────────────────────────────────
async function readLocal<T>(key: string): Promise<T[]> {
  const file = path.join(process.cwd(), "data", key);
  try {
    const raw = await fs.readFile(file, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeLocal<T>(key: string, data: T[]): Promise<void> {
  const file = path.join(process.cwd(), "data", key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

// ─── Lectura/escritura agnóstica ─────────────────────────────────────────────
async function readAll<T>(key: string): Promise<T[]> {
  if (isNetlify) {
    try {
      const store = await getBlobStore();
      const data = await store.get(key, { type: "json" });
      return Array.isArray(data) ? (data as T[]) : [];
    } catch (err) {
      console.error("[reviews] blob read failed, falling back to local:", err);
      return readLocal<T>(key);
    }
  }
  return readLocal<T>(key);
}

async function writeAll<T>(key: string, data: T[]): Promise<void> {
  if (isNetlify) {
    try {
      const store = await getBlobStore();
      await store.setJSON(key, data);
      return;
    } catch (err) {
      console.error("[reviews] blob write failed, falling back to local:", err);
    }
  }
  await writeLocal<T>(key, data);
}

// ─── Invitaciones ────────────────────────────────────────────────────────────
export async function listInvitations(): Promise<Invitation[]> {
  return readAll<Invitation>(INVITATIONS_KEY);
}

export async function getInvitation(id: string): Promise<Invitation | null> {
  const list = await listInvitations();
  return list.find((x) => x.id === id) ?? null;
}

export async function addInvitation(inv: Invitation): Promise<void> {
  const list = await listInvitations();
  list.push(inv);
  await writeAll(INVITATIONS_KEY, list);
}

export async function markInvitationUsed(id: string): Promise<void> {
  const list = await listInvitations();
  const idx = list.findIndex((x) => x.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], usedAt: new Date().toISOString() };
  await writeAll(INVITATIONS_KEY, list);
}

// ─── Reseñas ─────────────────────────────────────────────────────────────────
export async function listReviews(): Promise<Review[]> {
  const list = await readAll<Review>(REVIEWS_KEY);
  // Más recientes primero.
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addReview(review: Review): Promise<void> {
  const list = await readAll<Review>(REVIEWS_KEY);
  list.push(review);
  await writeAll(REVIEWS_KEY, list);
}
