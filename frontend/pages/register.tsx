import Head from "next/head";
import RegisterForm from "@/components/Auth/RegisterForm";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { ensureRedirectToData } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Container from "@/components/UI/Container";
import AuthLayout from "@/components/Layout/AuthLayout";
import { Stepper } from "@/components/UI/Stepper";

interface IRegister {}

const Register = ({}: IRegister) => {
  const [formStep, setFormStep] = useState(0);

  return (
    <AuthLayout>
      <Wrapper>
        <Head>
          <title>Регистрация</title>
        </Head>
        <Container>
          <Stepper step={formStep} />
          <Inner>
            <Title>
              {formStep === 0 ? "Заполнение данных" : "Создать аккаунт"}
            </Title>
            <RegisterForm step={formStep} setStep={setFormStep} />
            <Subtitle>Есть аккаунт?</Subtitle>
            <Bottom>
              <Link href="/login">
                <a>Войти</a>
              </Link>
            </Bottom>
          </Inner>
        </Container>
      </Wrapper>
    </AuthLayout>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps<IRegister> = async (
  ctx
) => {
  ensureRedirectToData(ctx);
  return {
    props: {},
  };
};

const Wrapper = styled.div`
  background: url(login/login_bgc.png) no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  flex: 1;
  padding: 188px 0 110px 0;
`;

const Inner = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Play";
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  color: ${({ theme }) => theme.white};
  margin-bottom: 84px;
`;
const Subtitle = styled.span`
  margin-top: 20px;
  font-family: "Play";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
`;

const Bottom = styled.span`
  margin-top: 10px;
  > a {
    font-family: "Play";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #4753bb;
  }
`;
