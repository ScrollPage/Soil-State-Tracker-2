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
import ChatWidget from "@/components/ChatWidget";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

interface ControlLayoutProps {
  children: React.ReactNode;
}

const ControlLayout: React.FC<ControlLayoutProps> = ({ children }) => {
  const { isStaff } = useUser();
  return (
    <>
      <Header>
        <Nav>
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
            Далай <br /> Лама
          </Name>
        </Rectangle>
        <Side>
          <SideLink active={true}>
            <Link href="/">
              <a>Управление</a>
            </Link>
          </SideLink>
          <SideLink>
            <Link href="/">
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
      {!isStaff && <ChatWidget />}
    </>
  );
};

export default ControlLayout;
