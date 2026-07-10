import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initTheme } from "./hooks/useTheme";
import { Toaster } from "sonner";
import AuthProvider from "./context/AuthContext.jsx";

initTheme();

createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <Toaster position="top-right" richColors expand />
      <App />
    </AuthProvider>
);
