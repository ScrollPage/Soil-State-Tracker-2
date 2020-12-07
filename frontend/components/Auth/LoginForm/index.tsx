import React from "react";
import { SLoginForm } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { authLogin } from "@/store/actions/auth";

const validationSchema = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  password: string().required("Введите пароль"),
});

interface FormValues {
  email: string;
  password: string;
}

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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(authLogin(values.email, values.password));
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Input type="text" name="email" placeholder="E-mail" src="email" />
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              src="padlock"
              // width="350px"
            />
            <SButton myType="white" type="submit">
              Продолжить
            </SButton>
          </Form>
        )}
      </Formik>
    </SLoginForm>
  );
};

export default LoginForm;
