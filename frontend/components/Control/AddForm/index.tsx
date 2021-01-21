import React, { memo } from "react";
import { Wrapper, Title } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { object, string } from "yup";

const validationSchema = object().shape({
  name: string()
    .min(3, "Слишком короткое название группы")
    .max(20, "Слишком длинное название группы")
    .required("Введите название группы"),
});

export interface AddFormValues {
  name: string;
  title: string;
}

interface AddFormProps {
  setClose: () => void;
  handleSubmit: (values: AddFormValues) => void;
}

const AddFormComponent: React.FC<AddFormProps> = ({
  setClose,
  handleSubmit,
}) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: "",
          title: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
          setClose();
        }}
      >
        {(props: FormikProps<AddFormValues>) => (
          <Form>
            <Title>Создать группу</Title>
            <Input
              src="padlock"
              type="text"
              name="name"
              placeholder="Введите название группы"
            />
            <Input
              src="padlock"
              type="text"
              name="title"
              placeholder="Введите описание группы"
            />
            <SButton type="submit" myType="orange">
              Подтвердить
            </SButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const AddForm = memo(AddFormComponent);
