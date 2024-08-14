// React
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

// Components
import AppLayout from "./pages/App/AppLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import HomeIndex from "./components/Home/Index.jsx";
import BashboardIndex from "./pages/Dashboards/index.jsx";
import AnalyticsIndex from "./pages/Analytics/index.jsx";
import PostsIndex from "./pages/Posts/index.jsx";
import NotFoundLayout from "./pages/NotFound/NotFoundLayout.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomeIndex />} />
            <Route path="/dashboards" element={<BashboardIndex />} />
            <Route path="/posts" element={<PostsIndex />} />
            <Route path="/analytics" element={<AnalyticsIndex />} />
          </Route>

          <Route path="*" element={<NotFoundLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
