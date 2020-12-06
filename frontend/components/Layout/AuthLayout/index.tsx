import React from "react";
import { Main, Header, Title, GoBack, Content } from "./styles";
import ChatWidget from "@/components/ChatWidget";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isStaff } = useUser();
  return (
    <>
      <Header>
        <Content>
          <Image height={84} width={114} src="/main/logo.svg" />
          <Title>LoRaWAN Dam</Title>
        </Content>
        <GoBack>
          <Link href="/">
            <a>Вернуться на главную</a>
          </Link>
        </GoBack>
      </Header>
      <Main>{children}</Main>
      {!isStaff && <ChatWidget />}
    </>
  );
};

export default AuthLayout;
