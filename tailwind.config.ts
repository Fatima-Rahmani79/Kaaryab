import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        lapis: {
          DEFAULT: "#2E5AAC",
          deep: "#16305C",
        },
        saffron: "#E8A33D",
        pomegranate: "#C1443C",
        ink: "#1A1F2B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        rtl: ["var(--font-rtl)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
