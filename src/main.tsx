import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthProvider.tsx";
import { SheltersProvider } from "./components/context/ShelterProvider.tsx";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./lib/htpp.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SheltersProvider>
            <App />
            <Toaster />
          </SheltersProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
