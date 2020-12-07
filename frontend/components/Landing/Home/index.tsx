import { SButton } from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import React from "react";
import { Wrapper, Content, Title, Subtitle } from "./styles";

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
    </Wrapper>
  );
};
