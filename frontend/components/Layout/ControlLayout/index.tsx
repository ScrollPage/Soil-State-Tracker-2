import React from "react";
import {
  Main,
  Header,
  Rectangle,
  Nav,
  NavLink,
  Name,
  SideLink,
  Settings,
  Side,
  SideBar,
  Circle,
} from "./styles";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import Link from "next/link";

interface ControlLayoutProps {
  children: React.ReactNode;
}

const ControlLayout: React.FC<ControlLayoutProps> = ({ children }) => {
  const { firstName, lastName } = useUser();
  const { pathname } = useRouter();
  return (
    <>
      <Header>
        <Nav>
          <Image height={84} width={114} src="/main/logo.svg" />
          <NavLink>
            <Link href="/">
              <a>Главная</a>
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/">
              <a>Инструкция</a>
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/">
              <a>Поддержка</a>
            </Link>
          </NavLink>
        </Nav>
        <Settings>
          <Image src="/control/settings.svg" height={24} width={24} />
        </Settings>
      </Header>
      <SideBar>
        <Rectangle>
          <Circle />
          <Name>
            {firstName} <br /> {lastName}
          </Name>
        </Rectangle>
        <Side>
          <SideLink active={pathname === "/control"}>
            <Link href="/control">
              <a>Управление</a>
            </Link>
          </SideLink>
          <SideLink active={pathname === "/control/[ID]"}>
            <Link href="/control/[ID]" as="/control/1">
              <a>Данные</a>
            </Link>
          </SideLink>
          <SideLink>
            <Link href="/">
              <a>Кабинет</a>
            </Link>
          </SideLink>
        </Side>
      </SideBar>
      <Main>{children}</Main>
    </>
  );
};

export default ControlLayout;
