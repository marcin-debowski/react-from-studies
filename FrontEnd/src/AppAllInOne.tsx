import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import Layout from "./Layout.tsx";
import App2 from "./App2.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppAllInOne: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="post" element={<App2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppAllInOne;
