import Container from "@/components/UI/Container";
import Image from "next/image";
import React from "react";
import { Wrapper, MyImage, Title, Text, Inner, Strawberry } from "./styles";

export const HowWeDo = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Title>Как мы это сделаем?</Title>
          <Text>
            C помощью, разработанной нами, нейросети составим идеальный график
            полива и добавления удобрений, который поможет вам правильно
            ухаживать за вашей клубникой
          </Text>
        </Inner>
      </Container>
      <MyImage>
        <Image src="/main/club_bgc_2.png" height={780} width={644} />
      </MyImage>
      <Strawberry>
        <Image src="/main/club.png" height={192} width={192} />
      </Strawberry>
      <Strawberry>
        <Image src="/main/club.png" height={192} width={192} />
      </Strawberry>
    </Wrapper>
  );
};
