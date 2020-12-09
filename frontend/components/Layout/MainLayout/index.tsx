import React from "react";
import {
  Main,
  Header,
  Info,
  Title,
  Subtitle,
  AuthButtons,
  Nav,
  NavLink,
  Name,
  Inner,
} from "./styles";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions/auth";
import ChatWidget from "@/components/ChatWidget";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Image from "next/image";
import { SButton } from "@/components/UI/Button";
import { useRouter } from "next/router";
import { useScroll } from "@/hooks/useScroll";
import { useWindowSize } from "@/hooks/useWindowSize";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isStaff, isAuth } = useUser();
  const { push } = useRouter();
  const scroll = useScroll();
  const { height } = useWindowSize();

  return (
    <>
      <Header small={scroll > (height ?? 1000) - 120}>
        <Info>
          <Image height={120} width={160} src="/main/logo.svg" />
          <Name>
            <Title>LoRaWan Dam</Title>
            <Subtitle>
              Умный сервис по выращиванию
              <br /> клубники
            </Subtitle>
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
                {" "}
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
            <NavLink>
              <Link href="/">
                <a>Как это работает</a>
              </Link>
            </NavLink>
            <NavLink>
              <Link href="/">
                <a>Кому подойдет</a>
              </Link>
            </NavLink>
            <NavLink>
              <Link href="/">
                <a>Команда</a>
              </Link>
            </NavLink>
          </Nav>
        </Inner>
      </Header>
      <Main>{children}</Main>
      {!isStaff && <ChatWidget />}
    </>
  );
};

export default MainLayout;
