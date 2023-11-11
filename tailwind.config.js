/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#191F26',
        "columnBackgroundColor": '#12181F',
        "pageBackgroundColor": '#060B10',
        "mainAccentColor": '#32E6E2',
        "secondaryAccentColor": '#32E6E2',
        "taskAccentColor": '#0C2A2A',
        "addTaskPush": '#0C2A2A',
        "purpleColor": '#6200EE',
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

