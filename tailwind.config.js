/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "main-blue": "#252931",
        "light-grey": "#5B606A",
        "light-blue": "#0059AC",
        "auth-placeholder": "#5F6571",
      },
      boxShadow: {
        "custom-shadow": "0px 1px 8px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
