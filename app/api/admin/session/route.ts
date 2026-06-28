import { NextResponse } from "next/server";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/reviews/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST: login con contraseña → emite cookie de sesión. */
export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }
  const password = String(body.password ?? "");
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }
  createAdminSession();
  return NextResponse.json({ ok: true });
}

/** DELETE: logout. */
export async function DELETE() {
  destroyAdminSession();
  return NextResponse.json({ ok: true });
}

/** GET: comprueba si la sesión es válida (útil para el cliente). */
export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticated() });
}
