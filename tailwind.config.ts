import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "50": "#eef9ff",
          "100": "#daf0ff",
          "200": "#bde7ff",
          "300": "#90d8ff",
          "400": "#5bc1ff",
          "500": "#35a4fc",
          "600": "#1f86f1",
          "700": "#1669d4",
          "800": "#1959b4",
          "900": "#1b4c8d",
          "950": "#152f56",
        },
        grey: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#141414",
        },
        secondary: {
          "50": "#fef2f2",
          "100": "#fee5e8",
          "200": "#fccfd5",
          "300": "#faa7b4",
          "400": "#f6768d",
          "500": "#ed4668",
          "600": "#d92551",
          "700": "#b71943",
          "800": "#a31943",
          "900": "#83183c",
          "950": "#49081c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
