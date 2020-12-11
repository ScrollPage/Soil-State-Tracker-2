import { emailActivate } from "@/store/actions/auth";
import { getAsString } from "@/utils.ts/getAsString";
import { ensureRedirectToData } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

interface AccountActivationProps {
  token: string | null;
}

const AccountActivation = ({ token }: AccountActivationProps) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(emailActivate(token));
    }
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      push({ pathname: "/login" }, undefined, {
        shallow: true,
      });
    }, 3000);
  }, []);

  return (
    <Wrapper>
      <Head>
        <title>Активация аккаунта</title>
      </Head>
      <h1>Активация аккаунта</h1>
      <h2>Через 3 секунды вы будете перенаправлены на страницу входа</h2>
    </Wrapper>
  );
};

export default AccountActivation;

export const getServerSideProps: GetServerSideProps<AccountActivationProps> = async (
  ctx
) => {
  let token = getAsString(ctx.query.token);
  ensureRedirectToData(ctx);
  return {
    props: {
      token: token || null,
    },
  };
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  h1 {
    font-weight: 800;
    font-size: 36px;
  }
`;
