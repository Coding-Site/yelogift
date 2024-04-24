import themes from "daisyui/src/theming/themes"
import type { Config } from  'tailwindcss';
import daisyui from "daisyui";
// import tailwind-scrollbar from 'tailwind-scrollbar';


const mainLightColor = '#FCD535';
const mainColor = '#F0B90B';
const mainBlack = '#0B0E11';
const mainLightBlack = '#1E2329';
const mainWhite = '#EAECEF';

/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'class',
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
        mainLightColor
      },
      fontFamily: {
        poppins: ['"Poppins", sans-serif'],
        arial: ['"Arial Rounded MT Regular", sans-serif']
      },
      'input': {
        padding: '.5rem',
        borderRadius: '.25rem !important',
        borderColor: '#CBD5E0',
        borderWidth: '1px',
        backgroundColor: '#000000',
        color: '#4A5568',
        fontSize: '1rem',
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [daisyui, require('tailwind-scrollbar')],
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
} satisfies Config;



