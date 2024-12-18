import type { Config } from 'tailwindcss'

export default {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6',
          DEFAULT: '#2563EB',
          dark: '#1D4ED8'
        },
        secondary: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#2563EB'
        }
      }
    }
  },
  plugins: []
} as Config