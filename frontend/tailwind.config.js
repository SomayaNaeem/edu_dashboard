/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:                '#2FEAFF',
        'accent-purple':        '#8000FF',
        'accent-blue':          '#3980FF',
        'accent-indigo':        '#5957FD',
        'accent-pink':          '#FD33FF',
        'accent-green':         '#A3FF12',
        'accent-orange':        '#FF5A36',
        'accent-light-purple':  '#9C6BFF',
        'accent-mint':          '#C8FFE0',
        'background-dark':      '#000044',
        'card-dark':            '#06065c',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
