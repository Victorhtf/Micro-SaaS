import React from "react";
import { useAuth } from "../../contexts/AuthProvider.jsx";
import Unauthorized from "./Unauthorized.jsx";

const withAuthentication = (Component) => {
  return (props) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    return <Unauthorized />;
  };
};

export default withAuthentication;
