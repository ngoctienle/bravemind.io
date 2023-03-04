/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: colors.neutral,
        primary: '#2a66ff',
        active: '#91EAE4',
        'kline-up': '#20AC95',
        'kline-down': '#E2464A',
        'light-blue': '#2A54FF',
        'light-blue-hover': '#5576FF',
        'light-blue-pressed': '#274DEB',
        'light-yellow': '#FFD677',
        'light-yellow-hover': '#FFE2A0',
        'light-yellow-pressed': '#EBC56D',
        'light-red': '#FF4D4F',
        'light-red-hover': '#FF8284',
        'light-red-pressed': '#EB4749',
        'light-green': '#24C587',
        'light-green-hover': '#66D6AB',
        'light-green-pressed': '#21B57C',
        'light-white': '#FFFFFF',
        'light-black': '#1A1A1A',
        'light-text-1': '#1A1A1A',
        'light-text-1-pressed': '#000000',
        'light-text-2': '#555555',
        'light-text-2-hover': '#2B2B2B',
        'light-text-2-pressed': '#484848',
        'light-text-3': '#999999',
        'light-text-3-hover': '#4D4D4D',
        'light-text-3-pressed': '#828282',
        'light-text-4': '#BFBFBF',
        'light-text-4-hover': '#606060',
        'light-text-4-pressed': '#A2A2A2'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.5xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
