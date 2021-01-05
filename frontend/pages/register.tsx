import Head from "next/head";
import React from "react";
import { ensureRedirectToData } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import AuthLayout from "@/components/Layout/AuthLayout";
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
  ensureRedirectToData(ctx);
  return {
    props: {},
  };
};
