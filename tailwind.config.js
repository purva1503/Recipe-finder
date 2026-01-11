module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],

  safelist: [
    "global-food-bg"   // keep this
  ],

  theme: {
    extend: {
      // ⭐ ADD THIS
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        slideRight: "slideRight 0.3s ease-out",
      },
    },
  },

  plugins: [],
};
