import Head from "next/head";
import RegisterForm from "@/components/Auth/RegisterForm";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ensureRedirectToData } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";

interface IRegister {}

const Register = ({}: IRegister) => {
  return (
    <SRegister>
      <Head>
        <title>Регистрация</title>
      </Head>
      <SRegisterInner>
        <SRegisterLeft>
          <SRegisterTitle>Регистрация</SRegisterTitle>
          <SRegisterSubTitle>
            У вас уже есть аккаунт? &nbsp;
            <Link href="/login">
              <a>Войдите</a>
            </Link>
          </SRegisterSubTitle>
        </SRegisterLeft>
        <SRegisterMain>
          <RegisterForm />
        </SRegisterMain>
      </SRegisterInner>
    </SRegister>
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

const SRegister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SRegisterInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 767.98px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SRegisterTitle = styled.h1`
  font-weight: 800;
  font-size: 36px;
  @media (max-width: 767.98px) {
    font-size: 26px;
  }
`;

const SRegisterSubTitle = styled.span`
  display: flex;
  @media (max-width: 767.98px) {
    margin-bottom: 30px;
    font-size: 15px;
  }
`;

const SRegisterMain = styled.div`
  height: 360px;
  width: 300px;
  order: -1;
  @media (max-width: 767.98px) {
    order: 2;
  }
`;

const SRegisterLeft = styled.div`
  font-size: 20px;
`;

const SRegisterSteps = styled.div`
  margin: 30px 10px;
  @media (max-width: 480px) {
    .ant-steps-item {
      padding: 0 !important;
    }
    margin: 10px 10px;
  }
`;
