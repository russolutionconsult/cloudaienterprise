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
        bg: {
          DEFAULT: "#0a0c12",
          card: "#111420",
          "card-hover": "#161a28",
          surface: "#0d0f17",
        },
        accent: {
          DEFAULT: "#3b6bff",
          hover: "#5580ff",
          muted: "rgba(59, 107, 255, 0.12)",
        },
        text: {
          primary: "#f0f2f5",
          secondary: "#9ca3b0",
          muted: "#7d8594",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.07)",
          hover: "rgba(255, 255, 255, 0.14)",
        },
        success: "#22c55e",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      maxWidth: {
        content: "1160px",
      },
      animation: {
        "ticker": "ticker 30s linear infinite",
        "score-ring": "score-ring 1.5s ease-out forwards",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "score-ring": {
          "0%": { strokeDashoffset: "var(--circumference)" },
          "100%": { strokeDashoffset: "var(--target-offset)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
