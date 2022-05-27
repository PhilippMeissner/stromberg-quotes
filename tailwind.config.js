module.exports = {
  content: [
    "src/**/*.tsx"
  ],
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
