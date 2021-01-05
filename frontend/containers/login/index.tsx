import React from "react";
import Container from "@/components/UI/Container";
import Link from "next/link";
import LoginForm from "@/components/Auth/LoginForm";
import { MyPartic } from "@/components/UI/MyPartic";
import { Wrapper, Inner, Title, SubTitle, Bottom } from "./styles";

export const LoginContainer = () => {
  return (
    <Wrapper>
      <MyPartic />
      <Container>
        <Inner>
          <Title>Войти в аккаунт</Title>
          <LoginForm />
          <SubTitle>Нет аккаунта?</SubTitle>
          <Bottom>
            <Link href="/register">
              <a>Регистрация</a>
            </Link>
          </Bottom>
        </Inner>
      </Container>
    </Wrapper>
  );
};
