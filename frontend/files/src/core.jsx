// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import LoginIndex from "./components/Login/Index.jsx";
import AppIndex from "./pages/App/index.jsx";
import HomeIndex from "./pages/Home/index.jsx";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes.jsx";
import DashboardIndex from "./pages/Dashboards/index.jsx";
import AnalyticsIndex from "./pages/Analytics/index.jsx";
import PostsIndex from "./pages/Posts/index.jsx";
import NotFoundIndex from "./pages/NotFound/index.jsx";

// Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// Components
import { TranslationProvider } from "./contexts/TranslationProvider.jsx";

// Import i18n setup configurtation
import "./i18n/i18n";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TranslationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppIndex />}>
              <Route path="/" element={<LoginIndex />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<HomeIndex />} />
                <Route path="/dashboards" element={<DashboardIndex />} />
                <Route path="/posts" element={<PostsIndex />} />
                <Route path="/analytics" element={<AnalyticsIndex />} />
              </Route>
              <Route path="*" element={<NotFoundIndex />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </TranslationProvider>
    </AuthProvider>
  </StrictMode>
);
