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
    <Wrapper>
      <Head>
        <title>404 ошибка</title>
      </Head>
      <Title>Страница не найдена</Title>
      <Subtitle>Вы будете перенаправлены на главную страницу</Subtitle>
    </Wrapper>
  );
}

const Subtitle = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
`;

const Title = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: -60px;
  flex-direction: column;
`;
