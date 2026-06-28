/** Tipos compartidos del sistema de reseñas verificadas. */

export type Invitation = {
  /** ID único (también es la clave del token HMAC). */
  id: string;
  clientName: string;
  company: string;
  /** Opcional: si se proporciona y hay SMTP, se puede enviar el enlace por email. */
  email?: string;
  /** ISO timestamp. */
  createdAt: string;
  /** ISO timestamp. Null si todavía no se ha usado. */
  usedAt: string | null;
};

export type Review = {
  id: string;
  /** ID de la invitación que la generó. */
  invitationId: string;
  clientName: string;
  company: string;
  /** 1..5 estrellas. */
  rating: number;
  comment: string;
  /** ISO timestamp. */
  createdAt: string;
};
