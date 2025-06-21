// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d0d0d", // deeper black for contrast
      paper: "#1a1a1a",   // keep paper contrast
    },
    primary: {
      main: "#ff3366", // slightly more vivid neon pink
    },
    secondary: {
      main: "#e6e6e6", // softer than pure white, for contrast
    },
    text: {
      primary: "#fefefe", // crisp white
      secondary: "#bbbbbb", // dimmed gray for less focus
    },
  },
  typography: {
    fontFamily: `"Outfit", "Inter", "DM Sans", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontWeight: 900,
      fontSize: "3rem",
      letterSpacing: "-1px",
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 800,
      fontSize: "2.25rem",
      letterSpacing: "-0.5px",
    },
    h5: {
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "1rem",
      letterSpacing: "1px",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.75,
    },
    button: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)", // darker depth
          borderRadius: "20px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          padding: "0.6rem 1.6rem",
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 1px 10px rgba(0, 0, 0, 0.4)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#1a1a1a",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "rgba(255,255,255,0.04)",
          padding: "0.5rem",
          color: "#fff",
        },
        input: {
          padding: "0.75rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#333",
        },
      },
    },
  },
});

export default theme;
