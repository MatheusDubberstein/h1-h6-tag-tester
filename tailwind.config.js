/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        tokyonight: {
          red: "#F7768E",
          green: "#9ECE6A",
          orange: "#E0AF68",
          blue: {
            100: "#7DCFFF",
            300: "#7AA2F7",
            900: "#283457",
          },
          purple: "#BB9AF7",
        },
      },
    },
  },
  plugins: [],
};
