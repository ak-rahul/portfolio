import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      colors: {
        violet: {
          primary: "oklch(0.72 0.19 295)",
        },
        emerald: {
          accent: "oklch(0.78 0.17 162)",
        },
      },
      animation: {
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        "aurora-3": "aurora-3 26s ease-in-out infinite",
        "shooting-star": "shooting-star 2.4s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      backgroundSize: {
        "200%": "200% auto",
        "300%": "300% auto",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
};

export default config;
