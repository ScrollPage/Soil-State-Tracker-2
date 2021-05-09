import React, { memo } from "react";
import { Wrapper } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { authChange } from "@/store/actions/auth";
import { LoadingInner } from "@/components/UI/LoadingInner";

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

export interface ChangeFormValues {
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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(authChange(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }: FormikProps<ChangeFormValues>) => (
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
            <SButton type="submit" myType="green" disabled={isSubmitting}>
              {isSubmitting ? <LoadingInner /> : "Изменить"}
            </SButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const ChangeForm = memo(ChangeFormComponent);
