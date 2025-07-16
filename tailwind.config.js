/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "content/**/*.{njk,md,html}",
    "./src/**/*.svg",
    "_includes/**/*.{njk,md,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],

};
