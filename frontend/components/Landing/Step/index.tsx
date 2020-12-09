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
  TextStep,
} from "./styles";

interface StepProps {
  title?: string;
  subtitle: string;
  text: string;
  isSecond: boolean;
}

export const Step: React.FC<StepProps> = ({
  title,
  subtitle,
  text,
  isSecond,
}) => {
  return (
    <Wrapper isSecond={isSecond}>
      <Container>
        <Inner>
          <Title>{title && title}</Title>
          <Main>
            <TextBlock>
              <Subtitle>{subtitle}</Subtitle>
              <Text>{text}</Text>
            </TextBlock>
            <Box />
          </Main>
        </Inner>
        <TextStep>Шаг 1</TextStep>
      </Container>
    </Wrapper>
  );
};
