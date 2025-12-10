import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import { SweetProvider } from "./contexts/Sweets.tsx";
import { CountProvider } from "./contexts/CountContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SweetProvider>
      <CountProvider>
        <App />
      </CountProvider>
    </SweetProvider>
  </StrictMode>
);
