/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "475px", // Extra small devices
        sm: "640px", // Small devices
        md: "768px", // Medium devices
        tb: "820px", // Tablets
        lg: "1024px", // Large devices
        xl: "1280px", // Extra large devices
        "2xl": "1536px", // 2x extra large devices
        "3xl": "1920px", // Custom screen size for very large devices
        xr: "414px",
        "2xr": "412px",
      },
    },
  },
  plugins: [],
};
