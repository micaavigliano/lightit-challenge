/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-container": "#003B67",
        "background-modal": "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
