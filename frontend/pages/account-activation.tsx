import React from "react";
import { getAsString } from "@/utils.ts/getAsString";
import { ensureRedirectToData } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { AccountActivationContainer } from "@/containers/accountactiovation";

interface AccountActivationProps {
  token: string | null;
}

const AccountActivation = ({ token }: AccountActivationProps) => {
  return (
    <>
      <Head>
        <title>Активация аккаунта</title>
      </Head>
      <AccountActivationContainer token={token} />
    </>
  );
};

export default AccountActivation;

export const getServerSideProps: GetServerSideProps<AccountActivationProps> = async (
  ctx
) => {
  ensureRedirectToData(ctx);
  let token = getAsString(ctx.query.token);
  return {
    props: {
      token: token || null,
    },
  };
};
