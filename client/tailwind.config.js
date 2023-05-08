/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ccc",
      },
      container: {
        screens: {
          sm: "600px",
          md: "900px",
          lg: "1200px",
        },
      },
    },
  },
  plugins: [],
};
