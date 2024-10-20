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
          "50": "#fef2f2",
          "100": "#fee5e6",
          "200": "#fccfd4",
          "300": "#f9a8b0",
          "400": "#f57785",
          "500": "#ed465e",
          "600": "#d92547",
          "700": "#b7193b",
          "800": "#991838",
          "900": "#7f1734",
          "950": "#490818",
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
      },
    },
  },
  plugins: [],
};
export default config;
