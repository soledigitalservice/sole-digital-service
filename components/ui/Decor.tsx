import { cn } from "@/lib/utils";

/** Rejilla metálica tenue con desvanecido, para fondos de sección. */
export function GridGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
    </div>
  );
}

/** Halo dorado radial suave (estilo reflector industrial). */
export function GoldGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-[480px] w-[480px] rounded-full bg-gold-400/10 blur-[120px]",
        className
      )}
    />
  );
}

/** Líneas de circuito impreso decorativas (SVG ligero). */
export function CircuitLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="circuit"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0)"
        >
          <path
            d="M0 30 H40 M40 30 V70 M40 70 H120 M80 0 V40 M80 40 H120 M0 90 H30 M30 90 V120"
            fill="none"
            stroke="rgba(245,166,35,0.12)"
            strokeWidth="1"
          />
          <circle cx="40" cy="30" r="2.5" fill="rgba(245,166,35,0.35)" />
          <circle cx="40" cy="70" r="2.5" fill="rgba(245,166,35,0.25)" />
          <circle cx="80" cy="40" r="2.5" fill="rgba(245,166,35,0.3)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}
