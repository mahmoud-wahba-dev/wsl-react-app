import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initTheme } from "./hooks/useTheme";
import { Toaster } from "sonner";

initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" richColors expand />
    <App />
  </StrictMode>,
);
