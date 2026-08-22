import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "Segoe UI", "Helvetica", "sans-serif"],
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
};

export default config;
