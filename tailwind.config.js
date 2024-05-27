/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-light": "#F9F9F9",
        "gray-dark": "#171717",
        "gray-darker": "#212121",
      },
      borderColor: {
        "border-normal": "hsla(0,0%,100%,.15)",
        "border-hover": "hsla(0,0%,100%,.25)",
      },
      backgroundColor: {
        "gray-light": "#F9F9F9",
        "gray-dark": "#171717",
        "gray-darker": "#212121",
      },
    },
  },
  plugins: [],
};
