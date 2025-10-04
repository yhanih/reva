/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          500: '#06b6d4',
        },
        purple: {
          500: '#a855f7',
        },
      },
    },
  },
  plugins: [],
}
