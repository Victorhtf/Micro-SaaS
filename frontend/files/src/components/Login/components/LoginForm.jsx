import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { useTranslationContext } from "../../../contexts/TranslationProvider";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { t } = useTranslationContext();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const credentials = btoa(
      `${formik.values.username}:${formik.values.password}`
    );

    setLoading(true);

    try {
      const userData = await axios.post(
        `${apiUrl}/auth/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      toast.success(t("login.success", { ns: "translation" }));

      if (userData.data.token) {
        login(userData.data.token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        toast.error(t("login.fail", { ns: "translation" }));
      }
    } finally {
      setLoading(false);
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
    <div className="flex items-center justify-center w-full h-screen bg-background-color">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-text-color text-2xl font-bold text-center mb-6">
          {t("login.title", { ns: "translation" })}
        </h2>

        <Form name="login" onFinish={formik.handleSubmit} layout="vertical">
          <Form.Item
            label={t("form.username", { ns: "translation" })}
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
              placeholder={t("form.username_placeholder", {
                ns: "translation",
              })}
              className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:border-primary-color"
            />
          </Form.Item>

          <Form.Item
            label={t("form.password", { ns: "translation" })}
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
              placeholder={t("form.password_placeholder", {
                ns: "translation",
              })}
              className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:border-primary-color"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full px-4 py-2 bg-primary-color text-white font-medium rounded-md hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? <Spin /> : t("login.sign_in", { ns: "translation" })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
3;
