/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nero: '#0B0B0B',
        oro: {
          DEFAULT: '#C8A96A',
          light: '#D4BB88',
          dark: '#A88B50',
        },
        beige: '#F5F0E8',
        grigio: '#1A1A1A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
