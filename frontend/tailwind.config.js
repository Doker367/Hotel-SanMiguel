/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5A3C', // warm terracotta
        secondary: '#C9A87C', // muted gold
        accent: '#4A6259', // sage green
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      letterSpacing: {
        wider: '0.1em',
      }
    }
  },
  plugins: []
}