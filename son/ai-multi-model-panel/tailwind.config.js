/********************
 * TailwindCSS Config
 ********************/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#f8fafc',
          dark: '#0b0f17'
        },
        panel: {
          light: '#ffffff',
          dark: '#0f172a'
        },
        accent: {
          DEFAULT: '#6d28d9'
        }
      }
    }
  },
  plugins: []
};
