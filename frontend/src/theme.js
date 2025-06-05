// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f2027",
      paper: "rgba(255,255,255,0.08)",
    },
    primary: {
      main: "#00bcd4", // cyan
    },
    secondary: {
      main: "#26c6da", // lighter cyan
    },
    text: {
      primary: "#e0f7fa",
      secondary: "#b2ebf2",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h5: {
      fontWeight: 700,
      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
    },
    body1: {
      lineHeight: 1.8,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
});

export default theme;
