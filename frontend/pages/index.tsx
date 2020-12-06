import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import MainLayout from "@/components/Layout/MainLayout";
import { Home } from "@/components/Landing/Home";

interface IIndex {}

export default function Index({}: IIndex) {
  return (
    <MainLayout>
      <Wrapper>
        <Head>
          <title>LoRaWAN Dam</title>
        </Head>
        <Home />
        <How>asd</How>
      </Wrapper>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IIndex> = async (ctx) => {
  // ensureAuth(ctx);
  return {
    props: {},
  };
};

const Wrapper = styled.div`
  flex: 1;
`;
const Main = styled.div`
  height: 100vh;
  background: url(main/bgc.png) repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
const How = styled.div`
  height: 100vh;
`;
