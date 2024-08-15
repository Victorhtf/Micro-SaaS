import React, { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

// Crie o contexto
const TranslationContext = createContext();

// Crie o provider
export const TranslationProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  return (
    <TranslationContext.Provider value={{ t, i18n }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Crie um hook para usar o contexto facilmente
export const useTranslationContext = () => useContext(TranslationContext);
