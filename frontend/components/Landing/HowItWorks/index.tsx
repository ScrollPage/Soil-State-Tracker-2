import Container from "@/components/UI/Container";
import React from "react";
import {
  Wrapper,
  Inner,
  Main,
  Title,
  Subtitle,
  Text,
  TextBlock,
  Box,
} from "./styles";

export const HowItWorks = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Title>Как это работает?</Title>
          <Main>
            <TextBlock>
              <Subtitle>Регистрация</Subtitle>
              <Text>
                Предприниматели в сети интернет формируют глобальную
                экономическую сеть и при этом - превращены в посмешище, хотя
                само их существование приносит несомненную пользу обществу.
                Предварительные выводы неутешительны:{" "}
              </Text>
            </TextBlock>
            <Box />
          </Main>
        </Inner>
      </Container>
    </Wrapper>
  );
};
