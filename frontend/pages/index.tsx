import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Promo } from "@/containers/landing/Promo";
import { Product } from "@/containers/landing/Product";
import { NextProduct } from "@/containers/landing/NextProduct";

export default function Index() {
  return (
    <MainLayout>
      <Head>
        <title>SightVI</title>
      </Head>
      <Promo />
      <Product />
      <NextProduct />
    </MainLayout>
  );
}
