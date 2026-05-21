import type { ProjectMockupKind } from "@/lib/data";

/**
 * "Capturas" de producto generadas como SVG vectorial (sin imágenes externas).
 * Cada `kind` dibuja una mini-UI representativa del proyecto, tematizada con su
 * color de acento. Ligeras, nítidas a cualquier resolución y 100% autónomas.
 */
export function ProjectMockup({
  kind,
  accent,
  className,
}: {
  kind: ProjectMockupKind;
  accent: string;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 400 250",
    className,
    role: "img" as const,
    preserveAspectRatio: "xMidYMid slice",
  };

  const bg = "#0c0c0f";
  const panel = "#15151a";
  const line = "rgba(255,255,255,0.07)";
  const dim = "rgba(255,255,255,0.14)";

  switch (kind) {
    case "ecommerce":
      return (
        <svg {...common} aria-label="Vista de tienda online">
          <rect width="400" height="250" fill={bg} />
          {/* Top bar */}
          <rect x="0" y="0" width="400" height="34" fill={panel} />
          <rect x="16" y="13" width="56" height="8" rx="4" fill={accent} />
          <rect x="250" y="13" width="40" height="8" rx="4" fill={dim} />
          <rect x="300" y="13" width="40" height="8" rx="4" fill={dim} />
          <circle cx="372" cy="17" r="9" fill="rgba(255,255,255,0.06)" />
          <path d="M368 17 h8 M372 13 v8" stroke={accent} strokeWidth="2" />
          {/* Hero banner */}
          <rect x="16" y="46" width="368" height="58" rx="8" fill={`${accent}22`} />
          <rect x="30" y="60" width="120" height="9" rx="4" fill={accent} />
          <rect x="30" y="76" width="90" height="7" rx="3" fill={dim} />
          <rect x="30" y="88" width="56" height="11" rx="5" fill={accent} />
          {/* Product grid */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${16 + i * 94} 116)`}>
              <rect width="84" height="118" rx="8" fill={panel} stroke={line} />
              <rect x="10" y="10" width="64" height="52" rx="6" fill={`${accent}1f`} />
              <circle cx="42" cy="36" r="14" fill={`${accent}55`} />
              <rect x="10" y="72" width="50" height="7" rx="3" fill={dim} />
              <rect x="10" y="84" width="32" height="7" rx="3" fill="rgba(255,255,255,0.08)" />
              <rect x="10" y="98" width="30" height="9" rx="4" fill={accent} />
            </g>
          ))}
        </svg>
      );

    case "mobile-health":
      return (
        <svg {...common} aria-label="App de salud">
          <rect width="400" height="250" fill={bg} />
          <rect width="400" height="250" fill={`${accent}10`} />
          {/* Phone frame */}
          <g transform="translate(150 22)">
            <rect x="0" y="0" width="100" height="206" rx="18" fill={panel} stroke={line} strokeWidth="2" />
            <rect x="38" y="9" width="24" height="5" rx="2.5" fill={dim} />
            {/* Header */}
            <rect x="12" y="26" width="46" height="8" rx="4" fill="#fff" opacity="0.85" />
            <rect x="12" y="40" width="30" height="6" rx="3" fill={dim} />
            <circle cx="80" cy="34" r="9" fill={`${accent}55`} />
            {/* Heart rate card */}
            <rect x="12" y="56" width="76" height="46" rx="10" fill={`${accent}22`} />
            <path d="M20 80 h10 l4 -10 l6 20 l5 -12 h26" fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {/* Appointment rows */}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(12 ${112 + i * 26})`}>
                <rect width="76" height="20" rx="6" fill="rgba(255,255,255,0.04)" />
                <circle cx="13" cy="10" r="6" fill={`${accent}66`} />
                <rect x="26" y="6" width="34" height="4" rx="2" fill={dim} />
                <rect x="26" y="13" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
              </g>
            ))}
            {/* Tab bar */}
            <rect x="12" y="192" width="76" height="2" rx="1" fill={line} />
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={22 + i * 19} cy="200" r="3.5" fill={i === 0 ? accent : dim} />
            ))}
          </g>
        </svg>
      );

    case "fleet-map":
      return (
        <svg {...common} aria-label="Mapa de gestión de flota">
          <rect width="400" height="250" fill={bg} />
          {/* Map grid */}
          <g stroke={line} strokeWidth="1">
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="250" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} />
            ))}
          </g>
          {/* Routes */}
          <path d="M30 210 C120 180 110 90 210 80 S330 60 380 30" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" />
          <path d="M20 60 C90 70 140 150 250 150 S350 200 390 200" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          {/* Vehicle pins */}
          {[
            [30, 210],
            [210, 80],
            [380, 30],
            [250, 150],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="11" fill={`${accent}33`} />
              <circle r="5" fill={accent} stroke="#0c0c0f" strokeWidth="2" />
            </g>
          ))}
          {/* Floating panel */}
          <g transform="translate(16 16)">
            <rect width="132" height="92" rx="10" fill="rgba(12,12,15,0.85)" stroke={line} />
            <rect x="12" y="13" width="60" height="8" rx="4" fill="#fff" opacity="0.85" />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(12 ${30 + i * 18})`}>
                <circle cx="5" cy="5" r="4" fill={i === 0 ? accent : dim} />
                <rect x="16" y="1" width="62" height="4" rx="2" fill={dim} />
                <rect x="16" y="8" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
              </g>
            ))}
          </g>
        </svg>
      );

    case "erp-dashboard":
      return (
        <svg {...common} aria-label="Dashboard de ERP">
          <rect width="400" height="250" fill={bg} />
          {/* Sidebar */}
          <rect x="0" y="0" width="56" height="250" fill={panel} />
          <circle cx="28" cy="24" r="9" fill={accent} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="14" y={50 + i * 24} width="28" height="7" rx="3.5" fill={i === 1 ? accent : dim} />
          ))}
          {/* Stat cards */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${72 + i * 110} 18)`}>
              <rect width="98" height="52" rx="8" fill={panel} stroke={line} />
              <rect x="12" y="12" width="40" height="6" rx="3" fill={dim} />
              <rect x="12" y="26" width="56" height="12" rx="4" fill={i === 0 ? accent : "#fff"} opacity={i === 0 ? 1 : 0.85} />
            </g>
          ))}
          {/* Chart */}
          <g transform="translate(72 84)">
            <rect width="208" height="148" rx="8" fill={panel} stroke={line} />
            <rect x="14" y="14" width="70" height="7" rx="3.5" fill="#fff" opacity="0.8" />
            <polyline points="14,118 44,96 74,104 104,70 134,82 164,44 194,58" fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <polyline points="14,118 44,96 74,104 104,70 134,82 164,44 194,58 194,134 14,134" fill={`${accent}1a`} stroke="none" />
            {[44, 74, 104, 134, 164, 194].map((x, i) => (
              <circle key={i} cx={x} cy={[96, 104, 70, 82, 44, 58][i]} r="2.5" fill={accent} />
            ))}
          </g>
          {/* Side list */}
          <g transform="translate(292 84)">
            <rect width="92" height="148" rx="8" fill={panel} stroke={line} />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(12 ${16 + i * 26})`}>
                <circle cx="6" cy="6" r="5" fill={`${accent}66`} />
                <rect x="18" y="2" width="54" height="4" rx="2" fill={dim} />
                <rect x="18" y="9" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
              </g>
            ))}
          </g>
        </svg>
      );

    case "elearning":
      return (
        <svg {...common} aria-label="Plataforma e-learning">
          <rect width="400" height="250" fill={bg} />
          <rect x="0" y="0" width="400" height="30" fill={panel} />
          <rect x="16" y="11" width="50" height="8" rx="4" fill={accent} />
          {/* Video player */}
          <g transform="translate(16 44)">
            <rect width="248" height="150" rx="10" fill="#000" stroke={line} />
            <rect width="248" height="150" rx="10" fill={`${accent}12`} />
            <circle cx="124" cy="66" r="24" fill="rgba(0,0,0,0.4)" stroke={accent} strokeWidth="2" />
            <path d="M118 56 l16 10 l-16 10 z" fill={accent} />
            {/* progress */}
            <rect x="16" y="126" width="216" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="16" y="126" width="120" height="4" rx="2" fill={accent} />
            <circle cx="136" cy="128" r="5" fill={accent} />
          </g>
          {/* Lesson list */}
          <g transform="translate(276 44)">
            <rect width="108" height="150" rx="10" fill={panel} stroke={line} />
            <rect x="12" y="12" width="56" height="7" rx="3.5" fill="#fff" opacity="0.8" />
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(12 ${30 + i * 28})`}>
                <rect width="84" height="22" rx="6" fill={i === 0 ? `${accent}22` : "rgba(255,255,255,0.04)"} />
                <circle cx="13" cy="11" r="6" fill="none" stroke={i < 2 ? accent : dim} strokeWidth="2" />
                {i < 2 && <path d="M10 11 l2.5 2.5 l4 -5" stroke={accent} strokeWidth="1.6" fill="none" />}
                <rect x="26" y="7" width="46" height="4" rx="2" fill={dim} />
                <rect x="26" y="14" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
              </g>
            ))}
          </g>
          {/* progress badges */}
          <g transform="translate(16 204)">
            {[0, 1, 2].map((i) => (
              <rect key={i} x={i * 84} width="72" height="30" rx="8" fill={panel} stroke={line} />
            ))}
            <rect x="12" y="212" width="40" height="6" rx="3" fill={accent} opacity="0" />
          </g>
        </svg>
      );

    case "delivery":
      return (
        <svg {...common} aria-label="App de delivery">
          <rect width="400" height="250" fill={bg} />
          {/* Map side */}
          <rect x="0" y="0" width="250" height="250" fill="#101015" />
          <g stroke={line} strokeWidth="1">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="250" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 32} x2="250" y2={i * 32} />
            ))}
          </g>
          <path d="M40 40 C90 90 80 150 150 160 S210 200 230 220" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="3 7" strokeLinecap="round" />
          <g transform="translate(40 40)">
            <circle r="8" fill={`${accent}33`} />
            <circle r="4" fill={accent} />
          </g>
          <g transform="translate(150 160)">
            <circle r="10" fill={`${accent}33`} className="animate-pulse-glow" />
            <path d="M0 -7 C5 -7 8 -4 8 0 C8 5 0 11 0 11 C0 11 -8 5 -8 0 C-8 -4 -5 -7 0 -7 Z" fill={accent} />
          </g>
          {/* Order card */}
          <g transform="translate(150 18)">
            <rect width="234" height="214" rx="14" fill={panel} stroke={line} />
            <rect x="16" y="16" width="80" height="9" rx="4.5" fill="#fff" opacity="0.85" />
            <rect x="16" y="32" width="50" height="6" rx="3" fill={accent} />
            {/* ETA pill */}
            <rect x="150" y="14" width="68" height="24" rx="12" fill={`${accent}22`} />
            <rect x="162" y="23" width="44" height="6" rx="3" fill={accent} />
            {/* Items */}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(16 ${52 + i * 36})`}>
                <rect width="202" height="30" rx="8" fill="rgba(255,255,255,0.04)" />
                <rect x="8" y="6" width="18" height="18" rx="5" fill={`${accent}44`} />
                <rect x="36" y="9" width="90" height="5" rx="2.5" fill={dim} />
                <rect x="36" y="18" width="54" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
                <rect x="170" y="11" width="24" height="7" rx="3.5" fill={accent} />
              </g>
            ))}
            {/* Checkout button */}
            <rect x="16" y="168" width="202" height="30" rx="10" fill={accent} />
            <rect x="92" y="180" width="50" height="7" rx="3.5" fill="#0c0c0f" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
