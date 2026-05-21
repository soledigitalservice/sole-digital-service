import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta extraída del logo: negro profundo + dorado ámbar + acero.
        ink: {
          DEFAULT: "#0a0a0b",
          950: "#060607",
          900: "#0a0a0b",
          800: "#101013",
          700: "#16161a",
          600: "#1d1d22",
          500: "#26262d",
        },
        gold: {
          50: "#fdf7e9",
          100: "#fbedc8",
          200: "#f7da90",
          300: "#f4c75a",
          400: "#f5a623", // color de acento principal del logo
          500: "#e08f12",
          600: "#bd720d",
          700: "#965710",
          800: "#7c4714",
          900: "#693c16",
        },
        steel: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d8e0",
          300: "#aeb5c4",
          400: "#828ca2",
          500: "#636e87",
          600: "#4e576d",
          700: "#404758",
          800: "#373c4a",
          900: "#1f222b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "gold-sheen":
          "linear-gradient(135deg, #f4c75a 0%, #f5a623 45%, #bd720d 100%)",
        "metal":
          "linear-gradient(160deg, #26262d 0%, #16161a 40%, #0a0a0b 100%)",
        "radial-gold":
          "radial-gradient(60% 60% at 50% 0%, rgba(245,166,35,0.18) 0%, rgba(245,166,35,0) 70%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(245,166,35,0.25), 0 12px 40px -12px rgba(245,166,35,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -24px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        scan: "scan 7s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
