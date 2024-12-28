/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#6d0b17',  // color base
          'text': '#ffffff',   // color del texto sobre primary
        },
        'secondary': {
          DEFAULT: '#d81b60',
          'text': '#ffffff',
        }
      }
    }
  },
  plugins: [],
}

