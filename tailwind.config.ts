import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Base surfaces — layered near-black, not pure black
        ink: {
          950: "#07090A",
          900: "#0C0F10",
          850: "#111516",
          800: "#161B1C",
          700: "#1F2626",
        },
        // Gold — the "earned" accent (success, premium, certificates)
        gold: {
          400: "#E8C766",
          500: "#D4AF37",
          600: "#B3901F",
          700: "#8C6F17",
        },
        // Green — the "growth" accent (progress, money, momentum)
        grow: {
          400: "#3FCE8E",
          500: "#1FA971",
          600: "#157A52",
          700: "#0F5B3E",
        },
        bone: "#F3F0E7",
        smoke: "#9AA3A0",
      },
      fontFamily: {
        display: ["var(--font-sora)"],
        body: ["var(--font-inter)"],
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,55,0.25), 0 8px 30px -8px rgba(212,175,55,0.35)",
        grow: "0 0 0 1px rgba(31,169,113,0.25), 0 8px 30px -8px rgba(31,169,113,0.35)",
      },
      backgroundImage: {
        "gold-green": "linear-gradient(135deg, #D4AF37 0%, #1FA971 100%)",
        "ring-conic": "conic-gradient(from -90deg, #1FA971 var(--pct), #1F2626 0)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(31,169,113,0.35)" },
          "50%": { boxShadow: "0 0 0 8px rgba(31,169,113,0)" },
        },
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
        pulseRing: "pulseRing 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
