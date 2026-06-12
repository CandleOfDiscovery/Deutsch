/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#1A3C6E',
        amber: '#F5A623',
        parchment: '#F8F9FA',
        ink: '#121212'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif"', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(26, 60, 110, 0.14)'
      }
    }
  },
  plugins: []
}
