import themes from "daisyui/src/theming/themes"
const mainColor = '#FCD535';
const mainBlack = '#0B0E11';
const mainLightBlack = '#1E2329';
const mainWhite = '#EAECEF';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {
      colors: {
        mainBlack,
        mainLightBlack,
        mainWhite,
        main: mainColor,
      },
      fontFamily: {
        poppins: [  '"Poppins", sans-serif'],
        arial: [  '"Arial Rounded MT Regular", sans-serif']
      },
    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar')],
  daisyui: {
    // colors: 
    themes: [
      {
        light: {
          ...themes["light"],
          primary: mainColor,
          ".btn": {
            "background-color": mainColor,
            "color": mainBlack,
            "border-radius": "15px",
            height: '37px',
            "min-height": "37px",
            border: 'none',
            width: 'max-content'
          },
          ".btn:hover": {
            "background-color": mainColor,
          },
          ".btn.btn-transparent": {
            "background-color": "transparent",
            "color": mainWhite,
            border: "1px solid #EAECEF"
          },
        }

      }
    ]
  },
}

