import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f5f7fa",
      100: "#e4e7eb",
      200: "#cbd2d9",
      300: "#9aa5b1",
      400: "#7b8794",
      500: "#616e7c",
      600: "#52606d",
      700: "#3e4c59",
      800: "#323f4b",
      900: "#1f2933",
    },
    accent: {
      100: "#ffc7c7",
      200: "#ff8a8a",
      300: "#ff4c4c",
      400: "#c33c3c",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "lg",
      },
      variants: {
        solid: {
          bg: "accent.200",
          color: "white",
          _hover: {
            bgGradient: "linear(to-r, accent.200, accent.300)",
            boxShadow: "md",
          },
          _active: {
            bgGradient: "linear(to-r, accent.300, accent.400)",
          },
        },
      },
    },
    Badge: {
      variants: {
        solid: {
          bg: "accent.300",
          color: "white",
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.50",
        color: "brand.900",
      },
      a: {
        color: "accent.200",
        _hover: {
          textDecoration: "underline",
          color: "accent.300",
        },
      },
      "::placeholder": {
        color: "brand.300",
      },
      "::selection": {
        backgroundColor: "accent.200",
        color: "white",
      },
      "::-webkit-scrollbar": {
        width: "16px",
        borderRadius: "8px",
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: "8px",
        backgroundColor: `rgba(0, 0, 0, 0.1)`,
      },
    },
  },
  fonts: {
    heading: `'Lexend', sans-serif`,
    body: `'Lexend', sans-serif`,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  shadows: {
    outline: "0 0 0 3px rgba(255, 140, 140, 0.6)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  },
});

export default theme;
