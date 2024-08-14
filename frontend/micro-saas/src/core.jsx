// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styles
import "./index.css";

// Components
import App from "./App";
import { TranslationProvider } from "../contexts/TranslationProvider";

// Import i18n setup configurtation
import "../i18n/i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </StrictMode>
);
