import React from "react";
import { useTranslationContext } from "../../contexts/TranslationProvider.jsx";
import { TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Login() {
  const { t } = useTranslationContext();
  const { i18n } = useTranslation();

  async function getUser() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const username = "Usernasme";
    const password = "Password";
    const credentials = btoa(`${username}:${password}`);
    const userData = await axios.post(
      `${apiUrl}/auth/login`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    console.log(userData);
  }

  return (
    <>
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
              onClick={() => {
                getUser();
              }}
            >
              {t("login.sign_in", { ns: "translation" })}
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}
