import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from "./config/queryclient.ts";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
