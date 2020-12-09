import React from "react";
import { Wrapper, Step, Title } from "./styles";

interface StepperProps {
  step: number;
}

export const Stepper: React.FC<StepperProps> = ({ step }) => {
  return (
    <Wrapper>
      <Step active={step === 0}>
        <Title active={step === 0}>Заполнение данных</Title>
      </Step>
      <Step active={step === 1}>
        <Title active={step === 1}>Создание аккаунта</Title>
      </Step>
    </Wrapper>
  );
};
