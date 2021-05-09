import React from "react";
import styled from "styled-components";
import Container from "@/components/UI/Container";
import Image from "next/image";
import { SButton } from "@/components/UI/Button";

export const Promo = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Info>
            <Title>
              Система, <br /> автоматизирующая <br /> производство
            </Title>
            <SubTitle>
              Датчики, которые мы разработаем лично под ваши нужды, позволят
              удаленно следить за посевами и увеличить урожайность до 20%
            </SubTitle>
            <SButton myType="blue" type="submit">
              Смотреть подробнее
            </SButton>
          </Info>
          <Images>
            <Image height={504} width={262} src="/landing/phone.svg" />
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
  flex: 1.2;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Title = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 52px;
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
