/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#3F8633",
        secondaryColor: "#dfe9df",
        footer: "#3a403e",
        text: "#4b8d40",
      },

      fontFamily: {
        outFit: ["Outfit", "serif"],
      },
    },
  },
  plugins: [daisyui],
};
