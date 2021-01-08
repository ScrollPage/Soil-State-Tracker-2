import { Stepper } from "@/components/UI/Stepper";
import { MyPartic } from "@/components/UI/MyPartic";
import RegisterForm, {
  RegisterFormValues,
} from "@/components/Auth/RegisterForm";
import Link from "next/link";
import React, { useState } from "react";
import Container from "@/components/UI/Container";
import { Wrapper, Inner, Title, SubTitle, Bottom } from "./styles";
import { authSignup } from "@/store/actions/auth";
import { useDispatch } from "react-redux";

export const RegisterContainer = () => {
  const dispatch = useDispatch();
  const [formStep, setFormStep] = useState(0);

  const onSubmit = (values: RegisterFormValues) => {
    dispatch(authSignup(values));
  };

  return (
    <Wrapper>
      <MyPartic />
      <Container>
        <Stepper step={formStep} />
        <Inner>
          <Title>
            {formStep === 0 ? "Заполнение данных" : "Создать аккаунт"}
          </Title>
          <RegisterForm
            step={formStep}
            setStep={setFormStep}
            handleSubmit={onSubmit}
          />
          <SubTitle>Есть аккаунт?</SubTitle>
          <Bottom>
            <Link href="/login">
              <a>Войти</a>
            </Link>
          </Bottom>
        </Inner>
      </Container>
    </Wrapper>
  );
};
