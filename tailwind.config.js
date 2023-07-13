import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: "#ffffff",
        complimentary: "#fcd7a5",
        complimentaryDark: "#8A6432",
        accent: "#eb4f47",
        neutralContrast: "#111133",
        complimentaryContrast: "#111133",
        accentContrast: "#ffffff",

        // dark
        // neutral: "#111133",
        // complimentary: "#fcd7a5",
        // complimentaryDark: "#8A6432",
        // accent: "#eb4f47",
        // neutralContrast: "#ffffff",
        // complimentaryContrast: "#111133",
        // accentContrast: "#ffffff",

        white: "#ffffff",
        black: "#111133",
        danger: colors.red,
        warning: colors.orange,
        success: colors.green,
        info: colors.blue,
      },

      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
