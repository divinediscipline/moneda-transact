/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CC5501', // Default primary color
          50: '#FFF5F0',
          100: '#FFE6D9',
          200: '#FFCCB3',
          300: '#FFB38D',
          400: '#FF9966',
          500: '#FF8040',
          600: '#CC5501', // Primary color
          700: '#B34A00',
          800: '#993F00',
          900: '#803400',
        },
        brown: {
          800: '#5D4037',
          900: '#3E2723',
        },
      },
    },
  },
  plugins: [],
}