import React from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import { SButton } from "@/components/UI/Button";
import { useWindowSize } from "@/hooks/useWindowSize";

export const Product = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Images>
            <img src="/landing/circles.svg" />
          </Images>
          <Info>
            <Title>Наш продукт - ваш комфорт</Title>
            <SubTitle>
              Все стремятся к облегчению своего труда, при этом без потери
              эффективности. Наши датчики для этого и созданы. Они избавят вас
              от *************, а всю информацию можно получать через интернет,
              сидя уюте.
            </SubTitle>
            <SButton myType="blue" type="submit">
              Смотреть видео
            </SButton>
          </Info>
        </Inner>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${({ theme }) => theme.blue};
`;

const Info = styled.div`
  flex: 1;
  ${SButton} {
    margin-top: 40px;
  }
`;
const Inner = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Images = styled.div`
  position: relative;
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px 0 20px 0;
  height: 100%;
  > img {
    max-height: 100%;
  }
`;

const Title = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 58px;
  letter-spacing: -0.06em;
  color: ${({ theme }) => theme.blue};
`;

const SubTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 19px;
  line-height: 160%;
`;
