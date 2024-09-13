import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import LoginForm from "./components/LoginForm";
import { useTranslationContext } from "../../contexts/TranslationProvider";

export default function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslationContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return <>{!isAuthenticated && <LoginForm />}</>;
}
