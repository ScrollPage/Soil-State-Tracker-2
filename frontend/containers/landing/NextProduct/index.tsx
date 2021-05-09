import React from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import { SButton } from "@/components/UI/Button";

export const NextProduct = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Info>
            <Title>Вы получаете</Title>
            <SubTitle>
              Вы покупаете систему из нужного количеста датчиков, подключенных к
              нашей сети, а так же интуитовно понятный сайт, через который
              сможете ими управлять, как с компьютера или телефона, лишь был бы
              интернет.
            </SubTitle>
            <SButton myType="blue" type="submit">
              Смотреть видео
            </SButton>
          </Info>
          <Images>
            <img src="/landing/blocks.svg" />
          </Images>
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
