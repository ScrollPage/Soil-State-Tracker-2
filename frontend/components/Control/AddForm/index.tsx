import React, { memo } from "react";
import { Wrapper, Title } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string } from "yup";

const validationSchema = object().shape({
  name: string()
    .min(3, "Слишком короткое название группы")
    .max(20, "Слишком длинное название группы")
    .required("Введите название группы"),
});

interface FormValues {
  name: string;
}

interface AddFormProps {
  setClose: () => void;
  handleSubmit: (name: string) => void;
}

const AddForm: React.FC<AddFormProps> = ({ setClose, handleSubmit }) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values.name);
          setSubmitting(false);
          resetForm();
          setClose();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <Title>Создать группу</Title>
            <Input
              src="padlock"
              type="text"
              name="name"
              placeholder="Введите название группы"
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

export default memo(AddForm);
