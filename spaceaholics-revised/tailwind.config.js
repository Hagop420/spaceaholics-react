/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Pacifico"', 'cursive'] // Replace "Comic Sans MS" with the desired cursive font
      }
    },
  },
  plugins: [],
}
