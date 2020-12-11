import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import Head from "next/head";
import ControlLayout from "@/components/Layout/ControlLayout";
import cookies from "next-cookies";
import ChangeForm from "@/components/Auth/ChangeForm";

interface SucureProps {
  firstName: string;
  lastName: string;
  email: string;
}

const Sucure = ({ firstName, lastName, email }: SucureProps) => {
  return (
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Настройки</title>
          </Head>
          <Title>Смена данных</Title>
          <ChangeForm
            initialFirstName={firstName}
            initialLastName={lastName}
            initialEmail={email}
          />
        </Wrapper>
      </Container>
    </ControlLayout>
  );
};

export default Sucure;

export const getServerSideProps: GetServerSideProps<SucureProps> = async (
  ctx
) => {
  // ensureAuth(ctx);

  const firstName = cookies(ctx)?.firstName || "";
  const lastName = cookies(ctx)?.lastName || "";
  const email = cookies(ctx)?.email || "";

  return {
    props: {
      firstName,
      lastName,
      email,
    },
  };
};

const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 69px 80px 80px 80px;
  @media (max-width: 1199.98px) {
    padding: 0px 30px 80px 30px;
  }
  @media (max-width: 767.98px) {
    padding: 0px 0px 80px 0px;
  }
`;
