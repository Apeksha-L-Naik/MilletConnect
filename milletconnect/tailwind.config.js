const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind checks all relevant files for classes
  theme: {
    extend: {
      keyframes: {
        // Animation for fading in from above
        fadeInDown: {
          from: { opacity: 0, transform: "translateY(-50px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        // Bouncing animation
        bounceOnHover: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Rotating animation for elements
        rotateIn: {
          from: { transform: "rotate(-360deg)", opacity: 0 },
          to: { transform: "rotate(0)", opacity: 1 },
        },
        // Sliding animation from left
        slideIn: {
          from: { opacity: 0, transform: "translateX(-50px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        // Simple fade-in effect
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        // Delayed fade-in effect
        fadeInDelay: {
          from: { opacity: 0 },
          "50%": { opacity: 0 },
          to: { opacity: 1 },
        },
        // Bounce animation for scaling in
        bounceIn: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        // Fade effect for images
        imageFade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        // Fading in from below
        "fade-in-up": {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        // Flip animation for a 180-degree rotation
        flip: {
          from: { transform: "rotateY(0deg)", opacity: 1 },
          to: { transform: "rotateY(180deg)", opacity: 1 },
        },
        // Smooth scaling hover effect
        scaleUp: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.05)" },
        },
      },
      animation: {
        "fade-in-down": "fadeInDown 1s ease-in-out",
        "bounce-on-hover": "bounceOnHover 0.6s ease-in-out",
        "rotate-in": "rotateIn 1.2s ease-in-out",
        "slide-in": "slideIn 1s ease-in-out",
        "fade-in": "fadeIn 1.2s ease-in-out",
        "fade-in-delay": "fadeInDelay 2s ease-in-out",
        "bounce-in": "bounceIn 1.5s ease-in-out",
        "image-fade": "imageFade 1.5s ease-in-out",
        "fade-in-up": "fade-in-up 1.2s ease-out",
        flip: "flip 0.6s ease-in-out",
        "scale-up": "scaleUp 0.8s ease-in-out",
      },
      colors: {
        custom: "#b08d64", // Your custom color
        primary: "#4F46E5", // Custom primary color
        secondary: "#F59E0B", // Custom secondary color
        neutral: "#9CA3AF", // Neutral shade
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        poppins: ["'Poppins'", "sans-serif"], // Added Poppins for modern styles
      },
      spacing: {
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "64px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 4px 20px rgba(255, 255, 255, 0.3)", // Soft glowing effect
        custom: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Custom shadow
      },
    },
  },
  plugins: [
    // Custom plugin for creating hover animations
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".hover-grow": {
          transform: "scale(1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
        ".hover-rotate": {
          transform: "rotate(0)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "rotate(10deg)",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
