import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StaticContextProvider from "./contexts/StaticContext";
import AppContextProvider from "./contexts/AppContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <StaticContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </StaticContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
