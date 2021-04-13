import React, { memo } from "react";
import { Formik, Form } from "formik";
import { Wrapper, Inner, Button } from "./styles";
import { useDispatch } from "react-redux";
import { Input } from "@/components/UI/Input";

export interface ChatAddFormValues {
  content: string;
}

interface ChatAddProps {
  onSubmit: (content: string) => void;
}

const ChatAddComponent = ({ onSubmit }: ChatAddProps) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          content: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(values.content);
          resetForm();
          setSubmitting(false);
        }}
      >
        {() => (
          <Form>
            <Inner>
              <Input name="content" placeholder="Введите..." width="100%" />
              <Button type="submit">+</Button>
            </Inner>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const ChatAdd = memo(ChatAddComponent);
