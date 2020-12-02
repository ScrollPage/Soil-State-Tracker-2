import { emailActivate } from "@/store/actions/auth";
import { getAsString } from "@/utils.ts/getAsString";
import { ensureRedirectToData } from "@/utils.ts/ensure";
import { CheckOutlined } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface IAccountActivation {
  token: string | null;
}

const AccountActivation = ({ token }: IAccountActivation) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(emailActivate(token));
    }
  }, [token]);
  return (
    <SAccountActivation>
      <Head>
        <title>Активация аккаунта</title>
      </Head>
      <h1>
        Вы успешно подтвердили аккаунт&nbsp;
        <CheckOutlined />
      </h1>
    </SAccountActivation>
  );
};

export default AccountActivation;

export const getServerSideProps: GetServerSideProps<IAccountActivation> = async (
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

const SAccountActivation = styled.div`
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
