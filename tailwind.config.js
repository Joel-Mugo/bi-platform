module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        corp: {
          50: '#f6fbff',
          100: '#eaf6ff',
          200: '#cfecff',
          300: '#9cd7ff',
          400: '#66bfff',
          500: '#2f9cff',
          600: '#2a86e0',
          700: '#2368b3',
          800: '#1b4d80',
          900: '#10283f'
        },
        accent: {
          soft: 'rgb(202 217 81)',
          muted: 'rgb(166 162 71)',
          earthy: 'rgb(135 165 90)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(15, 23, 42, 0.08)'
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 320ms ease-out'
      }
    }
  },
  plugins: []
}
