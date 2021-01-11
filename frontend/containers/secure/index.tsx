import React from "react";
import { Wrapper, Title } from "./styles";
import Container from "@/components/UI/Container";
import { ChangeForm } from "@/components/Auth/ChangeForm";

interface SucureContainerProps {
  changeInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const SecureContainer: React.FC<SucureContainerProps> = ({
  changeInfo,
}) => {
  const { firstName, lastName, email } = changeInfo;

  return (
    <Container>
      <Wrapper>
        <Title>Смена данных</Title>
        <ChangeForm
          initialFirstName={firstName}
          initialLastName={lastName}
          initialEmail={email}
        />
      </Wrapper>
    </Container>
  );
};
