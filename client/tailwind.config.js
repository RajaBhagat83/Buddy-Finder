/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1476ff",
        "primary-light": "#f3f5ff",
        light: "#f9faff",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    fontSize: {
      "10xl": "10rem",
      "11xl": "12rem",
      "12xl": "14rem",
    },
  },
  plugins: [],
};
