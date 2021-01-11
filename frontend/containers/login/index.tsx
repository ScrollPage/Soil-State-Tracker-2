import React from "react";
import Container from "@/components/UI/Container";
import Link from "next/link";
import { LoginForm, LoginFormValues } from "@/components/Auth/LoginForm";
import { MyPartic } from "@/components/UI/MyPartic";
import { Wrapper, Inner, Title, SubTitle, Bottom } from "./styles";
import { useDispatch } from "react-redux";
import { authLogin } from "@/store/actions/auth";

export const LoginContainer = () => {
  const dispatch = useDispatch();

  const onSubmit = (values: LoginFormValues) => {
    dispatch(authLogin(values));
  };

  return (
    <Wrapper>
      <MyPartic />
      <Container>
        <Inner>
          <Title>Войти в аккаунт</Title>
          <LoginForm handleSubmit={onSubmit} />
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
