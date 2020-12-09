import React, { Dispatch, memo, SetStateAction } from "react";
import { Wrapper, Buttons } from "./styles";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import { SButton } from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { object, string, ref } from "yup";
import { authSignup } from "@/store/actions/auth";
import { useDispatch } from "react-redux";

const nameValidationSchema = object().shape({
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(15, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилия")
    .max(15, "Слишком длинная фамилия")
    .required("Введите фамилию"),
});

const contactValidationSchema = object().shape({
  email: string().email("Некорректный E-mail").required("Введите E-mail"),
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

interface RegisterFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ step, setStep }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <FormikStepper
        step={step}
        setStep={setStep}
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
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
        <FormikStep validationSchema={nameValidationSchema}>
          <Input
            type="text"
            name="firstName"
            placeholder="Введите имя"
            src="user"
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Введите фамилию"
            src="user"
          />
        </FormikStep>
        <FormikStep validationSchema={contactValidationSchema}>
          <Input
            type="text"
            name="email"
            placeholder="Введите E-mail"
            src="email"
          />
          <Input
            type="password"
            name="password"
            placeholder="Введите пароль"
            src="padlock"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            src="reload"
          />
        </FormikStep>
      </FormikStepper>
    </Wrapper>
  );
};

export default memo(RegisterForm);

interface FormikStepProps {
  children: React.ReactNode;
  validationSchema?: any | (() => any);
}

const FormikStep: React.FC<FormikStepProps> = ({
  children,
  validationSchema,
}) => {
  return <>{children}</>;
};

interface FormikStepperProps extends FormikConfig<FormikValues> {
  children: React.ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const FormikStepper: React.FC<FormikStepperProps> = ({
  children,
  step,
  setStep,
  ...stepperProps
}) => {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];

  const currentChild = childrenArray[step];

  const isLastElement = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...stepperProps}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={(values, helpers) => {
        if (isLastElement()) {
          stepperProps.onSubmit(values, helpers);
        } else {
          const { setSubmitting, setTouched } = helpers;
          setStep((e) => e + 1);
          setTouched({
            email: false,
            password: false,
            confirmPassword: false,
          });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <div>{currentChild}</div>
            <Buttons>
              {step > 0 ? (
                <SButton
                  onClick={() => setStep((e) => e - 1)}
                  myType="white"
                  disabled={isSubmitting}
                  small
                >
                  Назад
                </SButton>
              ) : null}
              <SButton
                myType="white"
                type="submit"
                disabled={isSubmitting}
                small={isLastElement() ? true : false}
              >
                {isLastElement() ? "Регистрация" : "Продолжить"}
              </SButton>
            </Buttons>
          </Form>
        );
      }}
    </Formik>
  );
};
