module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          from: { opacity: 0, transform: "translateY(-50px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        bounceOnHover: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rotateIn: {
          from: { transform: "rotate(-360deg)", opacity: 0 },
          to: { transform: "rotate(0)", opacity: 1 },
        },
      },
      animation: {
        "fade-in-down": "fadeInDown 1s ease-in-out",
        "bounce-on-hover": "bounceOnHover 0.6s ease-in-out",
        "rotate-in": "rotateIn 1.2s ease-in-out",
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
};

