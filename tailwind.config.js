module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kaisei': ['Kaisei Decol', 'serif']
      },
      keyframes: {
        ring: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-30deg)' },
          '40%': { transform: 'rotate(25deg)' },
          '60%': { transform: 'rotate(-20deg)' },
          '80%': { transform: 'rotate(15deg)' }
        },
        'fade-out': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8) translateY(20px)'
          },
          '20%': { 
            opacity: '1',
            transform: 'scale(1.1) translateY(0)'
          },
          '80%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(0.9) translateY(-20px)'
          }
        },
        snake: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)' 
          },
          '50%': { 
            transform: 'translateY(-10px) rotate(5deg)' 
          }
        },
        'run-snake': {
          '0%': { transform: 'translateX(100vw)'},
          '100%': { transform: 'translateX(-100vw)'}
        },
        'rainbow-text': {
          '0%': { color: '#ff0000' },
          '14%': { color: '#ff7f00' },
          '28%': { color: '#ffff00' },
          '42%': { color: '#00ff00' },
          '57%': { color: '#0000ff' },
          '71%': { color: '#4b0082' },
          '85%': { color: '#8f00ff' },
          '100%': { color: '#ff0000' }
        }
      },
      animation: {
        'ring': 'ring 0.5s ease-in-out',
        'fade-out': 'fade-out 1.5s ease-in-out forwards',
        'snake': 'snake 3s ease-in-out infinite',
        'rainbow': 'rainbow-text 2s linear infinite',
        'run-snake': 'run-snake 3s linear forwards',  
      }
    },
  },
  plugins: [],
}