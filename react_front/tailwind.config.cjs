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
        'green-gradient': "linear-gradient(180deg, rgb(124, 252, 115) 0%, rgb(65, 167, 113) 83%);",
        "light-blue": "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);",
        "yellow_to_orange":  "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);"

      },
      boxShadow: {
        "input_neupho": "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      }

    },
  },
  plugins: [],
  darkMode: "class"
}

