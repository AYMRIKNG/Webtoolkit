/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     backgroundColor:{
      'midligh-black': '#0a0a0a',
      'ligh-black': '#111111',
      'flashygreen': '#68E487',
      'flashyyellow': '#CEFF51',
    },
    colors:{
      'boneswhite': '#d9d9d9',
    },
    backgroundImage: {
      'hero-pattern': "url('./src/assets/purple.gif')",
      
    }
    },
  },
  plugins: [],
}

