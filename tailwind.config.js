/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        snakeBorder: {
          '0%': { borderColor: '#ff0080', borderWidth: '4px', borderStyle: 'solid', boxShadow: '0px 0px 5px 2px #ff0080' },
          '25%': { borderColor: '#00ff80', borderWidth: '4px', borderStyle: 'solid', boxShadow: '0px 0px 5px 2px #00ff80' },
          '50%': { borderColor: '#8000ff', borderWidth: '4px', borderStyle: 'solid', boxShadow: '0px 0px 5px 2px #8000ff' },
          '75%': { borderColor: '#ff0080', borderWidth: '4px', borderStyle: 'solid', boxShadow: '0px 0px 5px 2px #ff0080' },
          '100%': { borderColor: '#00ff80', borderWidth: '4px', borderStyle: 'solid', boxShadow: '0px 0px 5px 2px #00ff80' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        snakeBorder: 'snakeBorder 2s linear infinite',
        fade: 'fade 2s  linear infinite',
      },
    },
  },
  plugins: [],
}
