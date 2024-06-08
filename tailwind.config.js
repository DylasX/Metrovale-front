/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Inconsolata: ['"Inconsolata"', '"Lexend Mega"', 'sans-serif'],
      },
      boxShadow: {
        neobrutalism: '10px 10px 0px 0px rgba(0,0,0,1);',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
};
