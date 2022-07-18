/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./components/**/*.tsx', './pages/**/*.tsx', './public/**/*.html'],
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

/* stealing time
.theme-dark {
    --background-primary: #202020;
    --background-primary-rgb: 32, 32, 32;
    --background-primary-alt: #1a1a1a;
    --background-secondary: #161616;
    --background-secondary-alt: #000000;
    --background-modifier-border: #333;
    --background-modifier-form-field: rgba(0, 0, 0, 0.3);
    --background-modifier-form-field-highlighted: rgba(0, 0, 0, 0.22);
    --background-modifier-box-shadow: rgba(0, 0, 0, 0.3);
    --background-modifier-success: #197300;
    --background-modifier-success-rgb: 25, 115, 0;
    --background-modifier-error: #3d0000;
    --background-modifier-error-rgb: 61, 0, 0;
    --background-modifier-error-hover: #470000;
    --background-modifier-cover: rgba(0, 0, 0, 0.8);
    --text-accent: #7f6df2; //link
    --text-accent-hover: #8875ff;
    --text-normal: #dcddde;
    --text-muted: #999;
    --text-muted-rgb: 153, 153, 153;
    --text-faint: #666;
    --text-error: #ff3333;
    --text-error-hover: #990000;
    --text-highlight-bg: rgba(255, 255, 0, 0.4);
    --text-highlight-bg-active: rgba(255, 128, 0, 0.4);
    --text-selection: rgba(23, 48, 77, 0.99);
    --text-on-accent: #dcddde;
    --interactive-normal: #2a2a2a;
    --interactive-hover: #303030;
    --interactive-accent: #483699;
    --interactive-accent-rgb: 72, 54, 153;
    --interactive-accent-hover: #4d3ca6;
    --interactive-success: #197300;
    --scrollbar-active-thumb-bg: rgba(255, 255, 255, 0.2);
    --scrollbar-bg: rgba(255, 255, 255, 0.05);
    --scrollbar-thumb-bg: rgba(255, 255, 255, 0.1);
    --highlight-mix-blend-mode: lighten;
    color-scheme: dark;
}
*/
