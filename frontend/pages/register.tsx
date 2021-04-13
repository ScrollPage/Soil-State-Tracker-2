import Head from "next/head";
import React from "react";
import { ensureAuth } from "@/utils/ensure";
import { GetServerSideProps } from "next";
import { AuthLayout } from "@/components/Layout/AuthLayout";
import { RegisterContainer } from "@/containers/register";

interface RegisterProps {}

const Register = ({}: RegisterProps) => {
  return (
    <AuthLayout>
      <Head>
        <title>Регистрация</title>
      </Head>
      <RegisterContainer />
    </AuthLayout>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps<RegisterProps> = async (
  ctx
) => {
  ensureAuth(ctx, "auth");
  return {
    props: {},
  };
};
