/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        anton: ['Anton', 'sans-serif'],
      },
      colors: {
        primary: "#085027",
      }
    },
  },
  plugins: [],
};
