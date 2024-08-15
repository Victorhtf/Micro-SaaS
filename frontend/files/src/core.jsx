// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import LoginIndex from "./pages/Login/Index.jsx";
import AppIndex from "./pages/App/index.jsx";
import HomeIndex from "./pages/Home/index.jsx";
import DashboardIndex from "./pages/Dashboards/index.jsx";
import AnalyticsIndex from "./pages/Analytics/index.jsx";
import PostsIndex from "./pages/Posts/index.jsx";
import NotFoundLayout from "./pages/NotFound/NotFoundLayout.jsx";

// Styles
import "./index.css";

// Components
import { TranslationProvider } from "./contexts/TranslationProvider.jsx";

// Import i18n setup configurtation
import "./i18n/i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TranslationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppIndex />}>
            <Route path="/" element={<LoginIndex />} />
            <Route path="/home" element={<HomeIndex />} />
            <Route path="/dashboards" element={<DashboardIndex />} />
            <Route path="/posts" element={<PostsIndex />} />
            <Route path="/analytics" element={<AnalyticsIndex />} />
          </Route>

          <Route path="*" element={<NotFoundLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  </StrictMode>
);
