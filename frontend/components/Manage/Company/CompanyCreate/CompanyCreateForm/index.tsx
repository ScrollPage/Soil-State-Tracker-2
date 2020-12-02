import React from "react";
import { Formik, FormikProps, Form } from "formik";
import Input from "@/components/UI/Input";
import { SButton } from "@/components/UI/Button";
import { useDispatch } from "react-redux";
import { addCompany } from "@/store/actions/company";
import { object, string } from "yup";
import { LoadingOutlined } from "@ant-design/icons";

export const validationCompany = object().shape({
  companyName: string()
    .min(3, "Слишком короткое название компании")
    .max(15, "Слишком длинное название компании")
    .required("Введите название компании"),
  companyInfo: string()
    .min(3, "Слишком короткая информация о компании")
    .max(15, "Слишком длинная информация о компании")
    .required("Введите информацию о компании"),
  companyUrl: string()
    .min(5, "Слишком короткая ссылка")
    .max(30, "Слишком длинная ссылка")
    .required("Введите ссылку на сайт компании"),
});

interface FormValues {
  companyName: string;
  companyInfo: string;
  companyUrl: string;
}

interface ICompanyCreateForm {
  changeHanlder?: (id: number, name: string, url: string, info: string) => void;
  initialValues?: {
    id: number;
    name: string;
    info: string;
    url: string;
  };
}

const CompanyCreateForm = ({
  changeHanlder,
  initialValues,
}: ICompanyCreateForm) => {
  const dispatch = useDispatch();

  const createCompanyHandler = (values: FormValues) => {
    if (!!changeHanlder && initialValues) {
      changeHanlder(
        initialValues.id,
        values.companyName,
        values.companyUrl,
        values.companyInfo
      );
    } else {
      dispatch(
        addCompany(values.companyName, values.companyUrl, values.companyInfo)
      );
    }
  };

  return (
    <Formik
      initialValues={{
        companyName: initialValues?.name ?? "",
        companyInfo: initialValues?.info ?? "",
        companyUrl: initialValues?.url ?? "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        createCompanyHandler(values);
        setTimeout(() => {
          setSubmitting(false);
          resetForm();
        }, 1000);
      }}
      validationSchema={validationCompany}
    >
      {(props: FormikProps<FormValues>) => (
        <Form>
          <Input
            type="text"
            name="companyName"
            placeholder="Название компании"
            width={"100%"}
          />
          <Input
            type="text"
            name="companyUrl"
            placeholder="Ссылка на сайт"
            width={"100%"}
          />
          <Input
            type="text"
            name="companyInfo"
            placeholder="Описание компании"
            width={"100%"}
          />
          <SButton htmlType="submit" disabled={props.isSubmitting}>
            {!props.isSubmitting ? (
              !!changeHanlder ? (
                "Подтвердить"
              ) : (
                "Создать"
              )
            ) : (
              <LoadingOutlined />
            )}
          </SButton>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyCreateForm;
