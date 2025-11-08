/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'flip-next': 'flip-next 0.65s cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        'flip-prev': 'flip-prev 0.65s cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        'spin-slow': 'spin-slow 6s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'fade': 'fade 2s ease-in-out',
        'pulse-slow': 'pulse-slow 5s ease-in-out infinite',
      },
      keyframes: {
        'flip-next': {
          '0%': { transform: 'perspective(2000px) rotateY(0deg)', boxShadow: '-5px 5px 20px rgba(0, 0, 0, 0.3)' },
          '50%': { transform: 'perspective(2000px) rotateY(-90deg)', boxShadow: '-15px 10px 40px rgba(0, 0, 0, 0.6)' },
          '100%': { transform: 'perspective(2000px) rotateY(-180deg)', boxShadow: '-5px 5px 20px rgba(0, 0, 0, 0.3)' },
        },
        'flip-prev': {
          '0%': { transform: 'perspective(2000px) rotateY(-180deg)', boxShadow: '-5px 5px 20px rgba(0, 0, 0, 0.3)' },
          '50%': { transform: 'perspective(2000px) rotateY(-90deg)', boxShadow: '-15px 10px 40px rgba(0, 0, 0, 0.6)' },
          '100%': { transform: 'perspective(2000px) rotateY(0deg)', boxShadow: '-5px 5px 20px rgba(0, 0, 0, 0.3)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
        'fade': {
          '0%, 100%': { opacity: '0' },
          '20%, 80%': { opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
