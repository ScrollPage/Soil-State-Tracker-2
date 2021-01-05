import Head from "next/head";
import ErrorContainer from "@/containers/error";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 ошибка</title>
      </Head>
      <ErrorContainer />
    </>
  );
}
