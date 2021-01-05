import React, { useEffect } from "react";
import { Wrapper, Title, SubTitle } from "./styles";
import { useRouter } from "next/router";

const ErrorContainer = () => {
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
      <Title>Страница не найдена</Title>
      <SubTitle>Вы будете перенаправлены на главную страницу</SubTitle>
    </Wrapper>
  );
};

export default ErrorContainer;
