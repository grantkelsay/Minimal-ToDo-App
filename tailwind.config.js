/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#121212',
        "columnBackgroundColor": '#292929',
        "pageBackgroundColor": '#000000',
        "mainAccentColor": '#BB86FC',
        "secondaryAccentColor": '#6200EE',
      },
      animation: {
        'custom-fade-in': 'fadeIn 2s ease-in-out',
        'button-fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

