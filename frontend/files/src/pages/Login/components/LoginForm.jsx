import React from "react";
import { Form, Input, Button } from "antd";
import { useTranslationContext } from "../../../contexts/TranslationProvider";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { t } = useTranslationContext();

  async function handleLogin() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // Codifica as credenciais em Base64
    const credentials = btoa(
      `${formik.values.username}:${formik.values.password}`
    );

    try {
      // Faz a requisição POST para o login
      const userData = await axios.post(
        `${apiUrl}/auth/login`,
        {}, // Não estamos passando um corpo, pois é Basic Auth no header
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      // Sucesso no login
      toast.success(t("login.success", { ns: "translation" }));

      // Exemplo: salvar o token ou dados do usuário se for retornado
      if (userData.data.token) {
        localStorage.setItem("token", userData.data.token);
      }
    } catch (error) {
      if (error.response) {
        toast.error(t("login.fail", { ns: "translation" }));
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: handleLogin,
  });

  return (
    <Form
      name="login"
      onFinish={formik.handleSubmit}
      style={{ maxWidth: "300px", margin: "auto" }}
    >
      <Form.Item
        label={t("form.Username", { ns: "translation" })}
        validateStatus={
          formik.touched.username && formik.errors.username ? "error" : ""
        }
        help={
          formik.touched.username && formik.errors.username
            ? formik.errors.username
            : ""
        }
      >
        <Input
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item
        label={t("form.Password", { ns: "translation" })}
        validateStatus={
          formik.touched.password && formik.errors.password ? "error" : ""
        }
        help={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""
        }
      >
        <Input.Password
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("login.sign_in", { ns: "translation" })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
