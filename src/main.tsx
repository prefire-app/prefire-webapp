import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/App";

const rootElement = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Hydrate pre-rendered HTML if present, otherwise do a fresh render (e.g. /map)
if (rootElement.innerHTML.trim() !== "") {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
