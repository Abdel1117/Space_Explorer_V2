/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage : {
        'hero-form' : "url('../src/assets/images/astronaute-.jpg')",
      },
      boxShadow : {
        "input_neupho" : "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      }

    },
  },
  plugins: [],
}