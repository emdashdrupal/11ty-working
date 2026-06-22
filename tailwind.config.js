/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './content/**/*.md',
    './content/**/*.njk',
    './_includes/**/*.njk',
    './_includes/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--sans-serif)'],
        serif: ['var(--serif)'],
        mono: ['var(--monospace)'],
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Disable Tailwind's reset since we have base.css
  }
}
