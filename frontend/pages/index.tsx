import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import MainLayout from "@/components/Layout/MainLayout";
import { Home } from "@/components/Landing/Home";
import { HowWeDo } from "@/components/Landing/HowWeDo";
import { Internet } from "@/components/Landing/Internet";
import { UseFul } from "@/components/Landing/Useful";
import { HowItWorks } from "@/components/Landing/HowItWorks";

interface IIndex {}

export default function Index({}: IIndex) {
  return (
    <MainLayout>
      <Head>
        <title>LoRaWAN Dam</title>
      </Head>
      <Home />
      <HowWeDo />
      <Internet />
      <UseFul />
      <HowItWorks />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IIndex> = async (ctx) => {
  // ensureAuth(ctx);
  return {
    props: {},
  };
};
