import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppcontextProvider from "./context/Appcontext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AppcontextProvider>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </AppcontextProvider>
);
