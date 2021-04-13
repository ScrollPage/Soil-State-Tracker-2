import React, { memo } from "react";
import { Wrapper } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { authLogin } from "@/store/actions/auth";

const validationSchema = object().shape({
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(15, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилия")
    .max(15, "Слишком длинная фамилия")
    .required("Введите фамилию"),
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
});

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface ChangeFormProps {
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
}

const ChangeFormComponent: React.FC<ChangeFormProps> = ({
  initialFirstName,
  initialLastName,
  initialEmail,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          firstName: initialFirstName ?? "",
          lastName: initialLastName ?? "",
          email: initialEmail ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // await dispatch(authLogin(values.email, values.password));
          console.log(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Input
              type="text"
              name="firstName"
              placeholder="Введите имя"
              src="user"
              myType="default"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Введите фамилию"
              src="user"
              myType="default"
            />
            <Input
              type="text"
              name="email"
              placeholder="E-mail"
              src="email"
              myType="default"
            />
            <SButton type="submit" myType="green">
              Изменить
            </SButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const ChangeForm = memo(ChangeFormComponent);
