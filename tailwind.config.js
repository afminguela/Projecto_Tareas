module.exports = {
  content: ["./index.html", "./input.css"],
  theme: {
    extend: {
      backgroundImage: {
        'papel': "url('src/textura papel blanco.jpg')",
      
      },
      colors: {
        mediumblue: "#040bb6",
        "fills-tertiary": "rgba(118, 118, 128, 0.12)",
        "colors-blue": "#007aff",
        "colors-blue-dark": "#0a84ff",
        white: "#fff",
        "colors-green": "#34c759",
      },
      spacing: {},
      fontFamily: {
        "indie-flower": "'Indie Flower'",
        "sf-pro": "'SF Pro'",
      },
      borderRadius: {
        "11xs-6": "1.6px",
        "mini-5": "14.5px",
        "81xl": "100px",
      },
    },
    fontSize: {
      "8xs-6": "0.288rem",
      "8xl-3": "1.706rem",
      "mid-4": "1.088rem",
      mid: "1.063rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
    