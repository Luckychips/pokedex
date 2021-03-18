// tailwind.config.js
module.exports = {
  purge: ['src/**/*.svelte', 'public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [],
};
