import React from "react";
import { SLoginForm } from "./styles";
import { Formik, Form, FormikProps, Field } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { authLogin } from "@/store/actions/auth";

const validationSchema = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  password: string().required("Введите пароль"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <SLoginForm>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          await dispatch(authLogin(values.email, values.password));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Input type="text" name="email" placeholder="E-mail" />
            <Input type="password" name="password" placeholder="Пароль" />
            <SButton htmlType="submit" width={"300px"}>
              Войти
            </SButton>
          </Form>
        )}
      </Formik>
    </SLoginForm>
  );
};

export default LoginForm;
