module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#CC2630', 
        'primary-shadow': '#EA616A',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}