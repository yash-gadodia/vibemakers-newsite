import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { GrommetProvider } from "./components/providers/GrommetProvider";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <GrommetProvider>
      <App />
    </GrommetProvider>
  </HelmetProvider>
);
