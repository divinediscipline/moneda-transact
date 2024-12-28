/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          800: '#5D4037',
          900: '#3E2723',
        },
      },
    },
  },
  plugins: [],
}