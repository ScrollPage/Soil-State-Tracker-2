import React from "react";
import { SRegisterForm } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string, ref } from "yup";
import { authSignup } from "@/store/actions/auth";
import { useDispatch } from "react-redux";

const validationSchema = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(15, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилия")
    .max(15, "Слишком длинная фамилия")
    .required("Введите фамилию"),
  password: string()
    .matches(
      // @ts-ignore: Unreachable code error
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      "Слишком легкий пароль"
    )
    .required("Введите пароль"),
  confirmPassword: string()
    .required("Введите пароль")
    .oneOf([ref("password"), ""], "Пароли должны совпадать"),
});

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <SRegisterForm>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(
            authSignup(
              values.email,
              values.firstName,
              values.lastName,
              values.password
            )
          );
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Input type="text" name="email" placeholder="Enter your E-mail" />
            <Input type="text" name="firstName" placeholder="Введите имя" />
            <Input type="text" name="lastName" placeholder="Введите фамилию" />
            <Input
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
            />
            <SButton
              htmlType="submit"
              width={"300px"}
              disabled={props.isSubmitting}
            >
              Создать аккаунт
            </SButton>
          </Form>
        )}
      </Formik>
    </SRegisterForm>
  );
};

export default RegisterForm;
