/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      "primary":"#1476ff",
      "primary-light":"#f3f5ff",
      "light" : "#f9faff"
    },
    },
  },
  plugins: [],
}

