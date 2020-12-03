import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

interface IClusterPage {}

export default function ClusterPage({}: IClusterPage) {
  return (
    <SClusterPage>
      <Head>
        <title>Главная</title>
      </Head>
      <h1>ClusterPage</h1>
    </SClusterPage>
  );
}

export const getServerSideProps: GetServerSideProps<IClusterPage> = async (
  ctx
) => {
  // ensureAuth(ctx);
  return {
    props: {},
  };
};

const SClusterPage = styled.div`
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
