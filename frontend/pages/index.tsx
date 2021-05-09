import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Promo } from "@/containers/landing/Promo";

export default function Index() {
  return (
    <MainLayout>
      <Head>
        <title>SightVI</title>
      </Head>
      <Promo />
    </MainLayout>
  );
}
