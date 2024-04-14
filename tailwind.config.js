/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBalck: '#0B0E11',
        mainWhite: '#EAECEF',
        main: '#FCD535',
      }
    },
  },
  plugins: [],
}

