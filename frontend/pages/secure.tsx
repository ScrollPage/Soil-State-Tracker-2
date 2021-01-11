import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import { ControlLayout } from "@/components/Layout/ControlLayout";
import cookies from "next-cookies";
import { SecureContainer } from "@/containers/secure";

interface SucureProps {
  changeInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Sucure = ({ changeInfo }: SucureProps) => {
  return (
    <ControlLayout>
      <Head>
        <title>Настройки</title>
      </Head>
      <SecureContainer changeInfo={changeInfo} />
    </ControlLayout>
  );
};

export default Sucure;

export const getServerSideProps: GetServerSideProps<SucureProps> = async (
  ctx
) => {
  ensureAuth(ctx);

  const firstName = cookies(ctx)?.firstName || "";
  const lastName = cookies(ctx)?.lastName || "";
  const email = cookies(ctx)?.email || "";

  return {
    props: {
      changeInfo: {
        firstName,
        lastName,
        email,
      },
    },
  };
};
