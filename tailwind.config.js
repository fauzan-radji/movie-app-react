import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#0c0114",
        background: "#f3e1fe",
        primary: "#e80f0c",
        secondary: "#e2cde4",
        accent: "#4e0942",
      },

      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
