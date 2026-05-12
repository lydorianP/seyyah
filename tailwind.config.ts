import type { Config } from "tailwindcss"; 

const config: Config = {
  darkMode: ['variant', '[data-theme="dark"] &'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077b6",   // koyu mavi
        accent: "#ffb703",    // sarı‑turuncu
        light: "#e9ecef",     // açık gri
      },
    },
  },
  plugins: [],
};

export default config;