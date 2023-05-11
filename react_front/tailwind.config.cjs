/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      backgroundImage: {
        'hero-form': "url('../src/assets/images/astronaute-.jpg')",
        'green-gradient': "linear-gradient(45deg,rgb(65, 167, 113) 0%,  rgb(124, 252, 115) 100%);",
        "light-violet": "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);",
        "light-blue": "linear-gradient(45deg, #103CE7  0%, #64E9FF 100%);",
        "azure-radiant": "linear-gradient(45deg, #0172AF 20%, #74FEBD 100%);",
        /* Color Gradient for Dark Theme  */

        "dark-blue": "linear-gradient(45deg, #0C0C0C 0%, #4834D4 100%);",
        "dark-green": "linear-gradient(45deg, #233329 0%, #63D471 100%);",
        "dark-violet": "linear-gradient(45deg, #000000 0%, #923CB5 100%);",
        "dark-azure": "linear-gradient(45deg, #000000 0%, #55EFC4 100%);",
      },
      boxShadow: {
        "input_neupho": "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      }

    },
  },
  plugins: [],
  darkMode: "class"
}

