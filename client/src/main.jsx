import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StaticContextProvider from "./contexts/staticContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StaticContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StaticContextProvider>
  </StrictMode>
);
