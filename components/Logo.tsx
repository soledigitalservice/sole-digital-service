import { cn } from "@/lib/utils";

/**
 * Marca SDS reconstruida como SVG monoline (vectorial, nítida a cualquier tamaño)
 * a partir del logo original (assets/wallpaper-dark.png): monograma dorado de
 * trazo continuo con terminaciones redondeadas sobre fondo oscuro.
 */
export function LogoMark({
  className,
  title = "Sole Digital Service",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
      className={cn("h-9 w-9", className)}
    >
      <title>{title}</title>
      <g
        fill="none"
        stroke="url(#sds-gold)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M84 30 L48 30 C34 30 28 36 28 48 C28 58 34 64 48 64 L60 64" />
        <path d="M36 90 L72 90 C86 90 92 84 92 72 C92 62 86 56 72 56 L60 56" />
      </g>
      <defs>
        <linearGradient id="sds-gold" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f4c75a" />
          <stop offset="0.55" stopColor="#f5a623" />
          <stop offset="1" stopColor="#bd720d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
  wordmarkClassName,
}: {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showWordmark && (
        <span
          className={cn(
            "font-display text-base font-semibold leading-none tracking-tight text-white",
            wordmarkClassName
          )}
        >
          Sole<span className="text-gold-400"> Digital</span> Service
        </span>
      )}
    </span>
  );
}
