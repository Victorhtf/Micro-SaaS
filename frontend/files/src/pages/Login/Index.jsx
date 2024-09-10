import React from "react";
import { useTranslationContext } from "../../contexts/TranslationProvider.jsx";
import LoginForm from "./components/LoginForm.jsx";

export default function Login() {
  const { t } = useTranslationContext();

  return (
    <>
      <div className="flex-1 flex items-center justify-center">
        <section className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-[#003366] text-2xl font-semibold mb-4">
            {t("welcome_message", { ns: "translation" })}
          </h1>
          <LoginForm />
        </section>
      </div>
    </>
  );
}
