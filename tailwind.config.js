/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#202023',
        'primary-light': '#e0e0e0',
        'button-light': '#fff',
        'button-dark': '#1c1917',
        'accent-dark': '#7f86f2',
        accent: '#8b2bdc',
        'normal-dark': '#a8a29e',
        'normal-light': '#2c2a29',
      },
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
