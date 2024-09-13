import { useTranslationContext } from "../../contexts/TranslationProvider.jsx";
import { useAuth } from "../../contexts/AuthProvider.jsx";

export default function Index() {
  const { t } = useTranslationContext();

  return (
    <div>
      <h2>{t("Home", { ns: "translation" })}</h2>
    </div>
  );
}
