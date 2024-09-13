import { Outlet } from "react-router-dom";
import React from "react";

import withAuthentication from "./withAuthentication.jsx";
const ProtectedRoutes = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default withAuthentication(ProtectedRoutes);
