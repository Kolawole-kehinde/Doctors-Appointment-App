/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        primary: {
          DEFAULT: "#5F6FFF",
          100: "#1F2937",
        },
        secondary: {
          DEFAULT: "#EAEFFF",
          100: "#ADADAD",
          200: "#595959",
          300: "#4B5563",
          400: "#565656",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
