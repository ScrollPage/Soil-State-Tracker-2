import Image from "next/image";
import React from "react";
import {
  Wrapper,
  Info,
  Name,
  Title,
  SubTitle,
  Inner,
  AuthButtons,
  Nav,
  NavLink,
} from "./styles";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions/auth";
import { SButton } from "@/components/UI/Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useScroll } from "@/hooks/useScroll";
import { useWindowSize } from "@/hooks/useWindowSize";

export const MainHeader = () => {
  const dispatch = useDispatch();
  const { isAuth } = useUser();
  const { push } = useRouter();
  const scroll = useScroll();
  const { height } = useWindowSize();

  return (
    <Wrapper small={scroll > (height ?? 1000) - 120}>
      <Info>
        <Image height={120} width={160} src="/main/logo.svg" />
        <Name>
          <Title>LoRaWan Dam</Title>
          <SubTitle>
            Умный сервис по выращиванию
            <br /> клубники
          </SubTitle>
        </Name>
      </Info>
      <Inner>
        <AuthButtons>
          {isAuth ? (
            <>
              <SButton
                myType="orange"
                small
                onClick={() =>
                  push({ pathname: "/control" }, undefined, {
                    shallow: true,
                  })
                }
              >
                Кабинет
              </SButton>
              <SButton
                myType="white"
                small
                onClick={() => dispatch(logout(true))}
              >
                Выход
              </SButton>
            </>
          ) : (
            <>
              <SButton
                myType="white"
                small
                onClick={() =>
                  push({ pathname: "/login" }, undefined, { shallow: true })
                }
              >
                Вход
              </SButton>
              <SButton
                myType="orange"
                small
                onClick={() =>
                  push({ pathname: "/register" }, undefined, {
                    shallow: true,
                  })
                }
              >
                Регистрация
              </SButton>
            </>
          )}
        </AuthButtons>
        <Nav>
          <NavLink>Как это работает</NavLink>
          <NavLink>Кому подойдет</NavLink>
          <NavLink>Команда</NavLink>
        </Nav>
      </Inner>
    </Wrapper>
  );
};
