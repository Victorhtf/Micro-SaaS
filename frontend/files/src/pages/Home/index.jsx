import { useTranslationContext } from "../../contexts/TranslationProvider.jsx";

export default function Index() {
  const { t } = useTranslationContext();
  return <h2>{t("Home", { ns: "translation" })}</h2>;
}
