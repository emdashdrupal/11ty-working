/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "content/**/*.{njk,md, html}",
    "./src/**/*.svg",
    "_includes/**/*.{njk,md, html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
  colors: {
    'midnight-green': '0b5563',
    'ecru': 'aba361',
    'cadet-gray': '94a3b8',
    'russian-violet': '42033d',
    'tyrian-purple': '680e4b',
  },
};
