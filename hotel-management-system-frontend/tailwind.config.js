/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'main-purple': '#291732',
        'button-gold': '#C99D00',
        'background-gray': '#f3f3f3'
      },

    },
  },
  plugins: [],
}
