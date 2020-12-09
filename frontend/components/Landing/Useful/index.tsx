import Container from "@/components/UI/Container";
import Image from "next/image";
import React from "react";
import {
  ImageWrapper,
  Strawberry,
  TextBlock,
  Wrapper,
  Inner,
  Title,
  Main,
  Text,
} from "./styles";

export const UseFul = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Main>
            <Title>Кому это полезно?</Title>
            <TextBlock>
              <Text>- Один из видов</Text>
              <Text>- Один из видов</Text>
              <Text>- Один из видов</Text>
              <Text>- Один из видов</Text>
            </TextBlock>
          </Main>
          <ImageWrapper>
            <Strawberry>
              <Image src="/main/club.png" height={370} width={370} />
            </Strawberry>
          </ImageWrapper>
        </Inner>
      </Container>
    </Wrapper>
  );
};
