import React, { memo } from "react";
import { Wrapper } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { object, string } from "yup";
import { TextArea } from "@/components/UI/TextArea";

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
  initialValues?: AddFormValues;
}

const AddFormComponent: React.FC<AddFormProps> = ({
  setClose,
  handleSubmit,
  initialValues,
}) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: initialValues?.name ?? "",
          title: initialValues?.title ?? "",
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
            <Input
              type="text"
              name="name"
              placeholder="Введите название группы"
              myType="default"
              width="100%"
            />
            <TextArea name="title" placeholder="Введите описание группы" />
            <SButton type="submit" myType="green">
              Сохранить
            </SButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const AddForm = memo(AddFormComponent);
