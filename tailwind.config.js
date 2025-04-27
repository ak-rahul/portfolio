/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",  // <-- adjust if your project structure is different
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "white-50": "#d9ecff",
          "black-50": "#1c1c21",
          "black-100": "#0e0e10",
          "black-200": "#282732",
          "blue-50": "#839cb5",
          "blue-100": "#2d2d38",
        },
        fontFamily: {
          sans: ["Mona Sans", "sans-serif"],
        },
        animation: {
          marquee: 'marquee 60s linear infinite',
          rotate: 'rotate 5s linear infinite',
          wordSlider: 'wordSlider 21s infinite cubic-bezier(0.9, 0.01, 0.3, 0.99)',
        },
        keyframes: {
          marquee: {
            "0%": { left: "0%" },
            "100%": { left: "-100%" },
          },
          rotate: {
            "0%": { "--start": "0" },
            "100%": { "--start": "360" },
          },
          wordSlider: {
            "0%": { transform: "translateY(0.5%)" },
            "12.5%": { transform: "translateY(-12.5%)" },
            "25%": { transform: "translateY(-25%)" },
            "37.5%": { transform: "translateY(-37.5%)" },
            "50%": { transform: "translateY(-50%)" },
            "62.5%": { transform: "translateY(-62.5%)" },
            "75%": { transform: "translateY(-75%)" },
            "87.5%": { transform: "translateY(-87.5%)" },
          },
        },
      },
    },
    plugins: [],
  }
  