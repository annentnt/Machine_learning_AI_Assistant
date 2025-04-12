/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00B8D4',
        'secondary': '#263238',
        'gradient-start': '#236A6A',
        'gradient-end': '#0C2047',
        'red': '#FF3C3C',
        'linear-1': '#00DFA8',
        'linear-2': '#028DC9',
        'hovering-linear-1': '#19856C',
        'bar-color': '#549EA4',
        'neon': '#D8E760',
        'bar-step': '#236A6A',
        'green-1': '#389893'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle, theme(colors.gradient-start), theme(colors.gradient-end))',
      },

      fontFamily: {
        'barlow-condensed': 'Barlow Condensed'
      }

    },
  },
  plugins: [],
}

