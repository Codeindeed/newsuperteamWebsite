/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    colors: {
      primary: "#00AD66",
      secondary: "#F6C03A",
      error: "#EB5757",
      success: "#009A49",
      warning: "#E2B93B",
      "grey-10": "#E5E5E5",
      "grey-20": "#CCCCCC",
      "grey-30": "#B3B3B3",
      "grey-40": "#999999",
      "grey-50": "#808080",
      "grey-60": "#666666",
      "grey-70": "#4D4D4D",
      "grey-80": "#333333",
      "grey-90": "#1A1A1A",
      "grey-100": "#000000",
      white: "#ffffff",
      transparent: "transparent",
    },
    fontFamily: {
      archivo: "'Archivo', sans-serif",
    },
    extend: {
      boxShadow: {
        "input-custom": "0 0 0 1px #6C0505",
      },
      fontSize: {
        "heading-1": [
          "64px",
          {
            lineHeight: "72px",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "600",
          },
        ],

        "heading-2": [
          "56px",
          {
            lineHeight: "64px",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "600",
          },
        ],

        "heading-3": [
          "48px",
          {
            lineHeight: "56px",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "600",
          },
        ],

        "heading-4": [
          "40px",
          {
            lineHeight: "48px",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "600",
          },
        ],

        "heading-5": [
          "32px",
          {
            lineHeight: "40px",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "600",
          },
        ],

        "heading-6": [
          "24px",
          {
            lineHeight: "28px",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "600",
          },
        ],
        "heading-7": [
          "20px",
          {
            lineHeight: "24px",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "600",
          },
        ],
        "button-lg": [
          "16px",
          {
            lineHeight: "120%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
        "button-md": [
          "14px",
          {
            lineHeight: "120%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
        "button-sm": [
          "12px",
          {
            lineHeight: "120%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
        "body-1": [
          "24px",
          {
            fontFamily: "'Archivo', sans-serif",
            lineHeight: "130%",
            letterSpacing: "-5%",
            fontWeight: "400",
          },
        ],
        "body-2": [
          "20px",
          {
            lineHeight: "120%",
            letterSpacing: "-3%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
        "body-3": [
          "18px",
          {
            lineHeight: "120%",
            letterSpacing: "-2%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
        "body-4": [
          "16px",
          {
            lineHeight: "120%",
            letterSpacing: "-2%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
        "body-5": [
          "14px",
          {
            lineHeight: "120%",
            letterSpacing: "-2%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
        "body-6": [
          "12px",
          {
            lineHeight: "100%",
            letterSpacing: "-2%",
            fontFamily: "'Archivo', sans-serif",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
