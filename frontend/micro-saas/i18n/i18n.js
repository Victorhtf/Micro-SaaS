import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "../src/locales/en/translation.json";
import ptBRTranslations from "../src/locales/pt-BR/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources: {
        en: {
          translation: enTranslations,
        },
        "pt-BR": {
          translation: ptBRTranslations,
        },
      },
      fallbackLng: "en",
      debug: true,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["navigator", "cookie", "localStorage", "querystring"],
        caches: ["cookie"],
        lookupCookie: "i18nextLng",
        lookupLocalStorage: "i18nextLng",
        lookupSessionStorage: "i18nextLng",
      },
    },
    (err, t) => {
      if (err) {
        console.error("i18next initialization error:", err);
      } else {
        console.log("i18next initialized with language:", i18n.language);
        console.log("Detected languages:", i18n.languages);
      }
    }
  );

i18n.on("languageChanged", (lng) => {
  console.log("Language changed to:", lng);
});

export default i18n;
