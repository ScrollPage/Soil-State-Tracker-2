import React from "react";
import { Main, Header, Title, GoBack, Content } from "./styles";
import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Header>
        <Content>
          <Image height={84} width={114} src="/main/logo.svg" />
          <Title>
            <Link href="/">
              <a>LoRaWAN Dam</a>
            </Link>
          </Title>
        </Content>
        <GoBack>
          <Link href="/">
            <a>Вернуться на главную</a>
          </Link>
        </GoBack>
      </Header>
      <Main>{children}</Main>
    </>
  );
};

export default AuthLayout;
