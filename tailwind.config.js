/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  variants: {
    linearGradients: ['hover', 'responsive'],
  },
  theme: {
    screen: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        sprBackground: "#EBEBEB",
        sprBlack: "#121414",
        sprGray: "rgba(18, 20, 20)",
        sprGray90: "rgba(18, 20, 20, 0.9)",
        sprGray80: "rgba(18, 20, 20, 0.8)",
        sprGray70: "rgba(18, 20, 20, 0.7)",
        sprGray60: "rgba(18, 20, 20, 0.6)",
        sprGray50: "rgba(18, 20, 20, 0.5)",
        sprGray40: "rgba(18, 20, 20, 0.4)",
        sprGray30: "rgba(18, 20, 20, 0.3)",
        sprGray20: "rgba(18, 20, 20, 0.02)",
        sprGray10: "rgba(18, 20, 20, 0.1)",
        sprPrimary: "#AFBE00",
        sprPrimaryOffLight: "#E2E7B3",
        sprPrimaryLight: "rgba(175, 190, 0, 0.6)",
        sprPrimarySuperLight: "rgba(175, 190, 0, 0.3)",
        sprPrimaryDark: "#99B100",
        sprPrimaryDarkest: "#7F9F00",
        sprPrimaryButton: "linear-gradient(180deg, #AFBE00 0%, #99B100 100%);",
        sprInactiveGray: "#888A89",
        sprTertiary: "#CA160A",
        sprPrimary50: "#FDFFEA",
        sprPrimary100: "#FAFFB6",
        sprPrimary200: "#E8F084",
        sprPrimary300: "#D2DF3B",
        sprPrimary400: "#C9D910",
        sprPrimary500: "#C0CF15",
        sprPrimary600: "#A1AD10",
        sprPrimary700: "#8B9608",
        sprPrimary800: "#646B10",
        sprPrimary900: "#646B10",
      },
      dropShadow: {
        sm: "0 4px 4px rgba(18, 20, 20, 0.05)",
      },
      backgroundImage: {
        'background-image': "url('/public/background-image.png')"
      }
    },
  },
  plugins: [],
};
