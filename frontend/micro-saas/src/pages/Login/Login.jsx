import React from "react";
import { useTranslationContext } from "../../../contexts/TranslationProvider";
import { TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslationContext();
  const { i18n } = useTranslation();

  return (
    <>
      {console.log(i18n.language)}
      <div className="flex-1 flex items-center justify-center">
        <section className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-[#003366] text-2xl font-semibold mb-4">
            {t("welcome_message", { ns: "translation" })}
          </h1>
          <form noValidate autoComplete="off">
            <TextField
              label={t("form.Username", { ns: "translation" })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label={t("form.Password", { ns: "translation" })}
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              {t("login.sign_in", { ns: "translation" })}
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}
