import styled from "styled-components";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      push({ pathname: "/" }, undefined, {
        shallow: true,
      });
    }, 3000);
  }, []);

  return (
    <SCustom404>
      <Head>
        <title>404 ошибка</title>
      </Head>
      <h1>Страница не найдена</h1>
      <h3>Вы будете перенаправлены на главную страницу</h3>
    </SCustom404>
  );
}

const SCustom404 = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: -60px;
  flex-direction: column;
  h1 {
    font-weight: 800;
    font-size: 36px;
  }
`;
