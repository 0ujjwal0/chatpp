/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backg1: "url('../public/backgroundimg1.jpg')",
        backg2: "url('../public/backgroundimg2.jpg')",
      },
    },
  },
  plugins: [],
};