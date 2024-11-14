/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'disabled-grey-400': '#fafafa',
        'disabled-grey-900': '#e5e7eb'
      },
    },
  },
  plugins: [],
}