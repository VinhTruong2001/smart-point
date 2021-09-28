module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gradientColorStops: {
        'gradient-left': '#fe3847',
        'gradient-right': '#171c44',
      },
      height: {
        '480px': '480px',
        '620px': '620px',
      },
      colors: {
        'primary': '#CC2630', 
        'primary-shadow': '#EA616A',
      },
      zIndex: {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
      },
      fontSize: {
        '58px': '58px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}