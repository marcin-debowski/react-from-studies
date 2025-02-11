import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import Layout from "./Layout.tsx";
import App2 from "./App2.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppAllInOne from "./AppAllInOne.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppAllInOne />
  </StrictMode>
);
