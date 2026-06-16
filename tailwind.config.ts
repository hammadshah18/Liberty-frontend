import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        liberty: {
          navy: "#0f2747",
          blue: "#1f5aa6",
          teal: "#0f766e",
          mist: "#eef4fb"
        }
      },
      boxShadow: {
        widget: "0 24px 80px rgba(15, 39, 71, 0.18)"
      },
      backgroundImage: {
        "brand-radial":
          "radial-gradient(circle at top left, rgba(31, 90, 166, 0.14), transparent 34%), radial-gradient(circle at top right, rgba(15, 118, 110, 0.12), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,249,255,0.96))"
      }
    }
  },
  plugins: []
};

export default config;
