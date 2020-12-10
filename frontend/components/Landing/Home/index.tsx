import { SButton } from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import { MyPartic } from "@/components/UI/MyPartic";
import Image from "next/image";
import React from "react";
import {
  Wrapper,
  Content,
  Title,
  Subtitle,
  Strawberry,
  StrawberryBgc,
} from "./styles";

export const Home = () => {
  return (
    <Wrapper>
      <MyPartic />
      <Container>
        <Content>
          <Title>Вырасти лучшую клубнику</Title>
          <Subtitle>
            Поможем наладить процесс выращивания <br />
            марсианской клубники из любой точки вселенной
          </Subtitle>
          <SButton myType="orange" small>
            Узнать как
          </SButton>
        </Content>
      </Container>
      <Strawberry>
        <Image src="/main/club.png" height={746} width={742} />
      </Strawberry>
      <StrawberryBgc>
        <Image src="/main/club_bgc.png" height={967} width={864} />
      </StrawberryBgc>
    </Wrapper>
  );
};
