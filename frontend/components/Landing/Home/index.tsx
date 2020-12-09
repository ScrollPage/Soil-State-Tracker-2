import { SButton } from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Image from "next/image";
import React from "react";
import { Wrapper, Content, Title, Subtitle, Strawberry } from "./styles";

export const Home = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
