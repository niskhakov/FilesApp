import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/configureStore";
import { StyledEngineProvider } from "@mui/joy/styles";
import "@fontsource/public-sans";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StyledEngineProvider>
  // </React.StrictMode>
);
