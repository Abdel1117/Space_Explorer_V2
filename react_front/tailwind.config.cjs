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
        "light-blue": "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);",
        "yellow_to_orange": "linear-gradient(45deg, #103CE7  0%, #64E9FF 100%);",
        "azure_radiant": "linear-gradient(45deg, #0172AF 20%, #74FEBD 100%);"

      },
      boxShadow: {
        "input_neupho": "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      }

    },
  },
  plugins: [],
  darkMode: "class"
}

