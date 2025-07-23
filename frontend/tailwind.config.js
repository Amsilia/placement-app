/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      blur: {
        xs: '2px',   
        '3xl': '20px', 
        '4xl': '40px',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeOut: 'fadeOut 1s ease-in-out',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        'primary': '#0090FF',
        'secondary': '#526071',
        'cream': '#F1F5FC',
        'grayskin': '#FAFAFA',
        'supersoft': '#F1F5FC',
        'badge': '#E0E0E0',
        'brith': '#333333',
        'brandcolor': '#0090FF'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}