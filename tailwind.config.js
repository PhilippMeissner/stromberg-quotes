module.exports = {
  purge: [
    "src/**/*.tsx"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        badge: '250px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
