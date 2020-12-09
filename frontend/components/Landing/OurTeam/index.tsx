import Container from "@/components/UI/Container";
import React from "react";
import { Wrapper, Inner, Title, Main, Circle } from "./styles";

export const OurTeam = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Title>Наша команда</Title>
          <Main>
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
          </Main>
        </Inner>
      </Container>
    </Wrapper>
  );
};
