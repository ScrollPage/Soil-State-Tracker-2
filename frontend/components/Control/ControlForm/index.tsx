import React from "react";
import { SControlForm, SControlFormTitle } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { addCluster } from "@/store/actions/cluster";

const validationSchema = object().shape({
  name: string()
    .min(3, "Слишком короткое название группы")
    .max(20, "Слишком длинное название группы")
    .required("Введите название группы"),
});

interface FormValues {
  name: string;
}

export const ControlForm = () => {
  const dispatch = useDispatch();

  return (
    <SControlForm>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(addCluster(values.name));
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <SControlFormTitle>Создать группу</SControlFormTitle>
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
    </SControlForm>
  );
};
