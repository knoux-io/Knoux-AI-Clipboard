/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './index.html',
    './app/renderer/**/*.{js,ts,jsx,tsx,mdx}',
    './app/renderer/components/**/*.{js,ts,jsx,tsx}',
    './app/renderer/views/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        knoux: {
          primary: {
            DEFAULT: '#0ea5e9',
            light: '#38bdf8',
            dark: '#0284c7',
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          secondary: {
            DEFAULT: '#d946ef',
            light: '#e879f9',
            dark: '#c026d3',
          },
          accent: {
            cyan: '#06b6d4',
            purple: '#a855f7',
            pink: '#ec4899',
            emerald: '#10b981',
          },
          success: { DEFAULT: '#10b981', light: '#d1fae5', dark: '#047857' },
          warning: { DEFAULT: '#f59e0b', light: '#fef3c7', dark: '#d97706' },
          error: { DEFAULT: '#ef4444', light: '#fee2e2', dark: '#dc2626' },
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { '0%': { transform: 'translateY(-10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideLeft: { '0%': { transform: 'translateX(10px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideRight: { '0%': { transform: 'translateX(-10px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        scaleIn: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        glow: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        shimmer: { '0%': { backgroundPosition: '-200px 0' }, '100%': { backgroundPosition: 'calc(200px + 100%) 0' } },
      },
      boxShadow: {
        'knoux-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'knoux': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'knoux-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'knoux-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'knoux-glow': '0 0 20px rgba(14, 165, 233, 0.3)',
        'knoux-glow-lg': '0 0 40px rgba(14, 165, 233, 0.5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.2)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.text-gradient-primary': {
          background: 'linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': theme('colors.knoux.primary.500') + ' transparent',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'focus', 'dark']);
    },
  ],
};
