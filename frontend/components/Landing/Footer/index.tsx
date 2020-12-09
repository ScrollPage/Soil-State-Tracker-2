import Container from "@/components/UI/Container";
import Image from "next/image";
import React from "react";
import {
  Wrapper,
  Inner,
  About,
  Name,
  Title,
  Subtitle,
  Phone,
  Mail,
  Text,
  Small,
  Social,
  Media,
  Documents,
  ImageWrapper,
} from "./styles";

export const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <About>
            <Image src="/main/logo.svg" height={90} width={90} />
            <Name>
              <Title>LoRaWan Dam</Title>
              <Text>
                Умный сервис по выращиванию <br /> клубники
              </Text>
            </Name>
          </About>
          <Media>
            <Subtitle>Связаться с нами</Subtitle>
            <Phone>8 987 654 32 10</Phone>
            <Mail>LorawanDam@mail.ru</Mail>
            <Social>
              <ImageWrapper>
                <Image src="/main/vk.svg" height={36} width={36} />
              </ImageWrapper>
              <ImageWrapper>
                <Image src="/main/twitter.svg" height={36} width={36} />
              </ImageWrapper>
              <ImageWrapper>
                <Image src="/main/inst.svg" height={36} width={36} />
              </ImageWrapper>
            </Social>
            <Small>2020 Все права защищены</Small>
          </Media>
          <Documents>
            <Subtitle>Документы</Subtitle>
            <Text>Политика конфиденциальности</Text>
            <Text>Согласие на обработку персональных данных</Text>
          </Documents>
        </Inner>
      </Container>
    </Wrapper>
  );
};
