import Head from "next/head";
import React from "react";
import { GetServerSideProps } from "next";
import { ensureRedirectToData } from "@/utils/ensure";
import { AuthLayout } from "@/components/Layout/AuthLayout";
import { LoginContainer } from "@/containers/login";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  return (
    <AuthLayout>
      <Head>
        <title>Вход</title>
      </Head>
      <LoginContainer />
    </AuthLayout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  ctx
) => {
  ensureRedirectToData(ctx);
  return {
    props: {},
  };
};
