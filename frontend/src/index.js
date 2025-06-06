// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // import your custom theme

import { ModalProvider, Modal } from "./context/Modal";
import App from "./App";
import configureStore from "./store";

const store = configureStore();

function Root() {
  return (
    <ThemeProvider theme={theme}>   {/* <-- Wrap entire app here */}
      <CssBaseline />               {/* <-- Apply global baseline styles */}
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Modal />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
