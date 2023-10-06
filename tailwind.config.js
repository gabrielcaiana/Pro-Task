/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        purple: {
          dark: "#0D062D",
          DEFAULT: "#5030E5",
          light: "#F1EEFD",
        },
        orange: {
          dark: "#D58D49",
          DEFAULT: "#FFA500",
          light: "#F9EEE3",
        },
        green: {
          dark: "#68B266",
          DEFAULT: "#8BC48A",
          light: "#E6F3EB",
        },
        blue: {
          DEFAULT: "#76A5EA",
        },
        red: {
          DEFAULT: "#D8727D",
          light: "#FBF1F2",
        },
        neutral: {
          700: "#111827",
          600: "#121217",
          DEFAULT: "#787486",
          400: "#625F6D",
          300: "#DBDBDB",
          200: "#F5F5F5",
          100: "#ffffff",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
