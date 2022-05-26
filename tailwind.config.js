module.exports = {
  purge: [
    "src/**/*.tsx"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        badge: '250px',
      },
      animation: {
        'bounce-limited': 'bounce 1s ease-in-out 3.5'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
