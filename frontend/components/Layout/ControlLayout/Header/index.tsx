import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrapper, Nav, NavLink, Settings } from "./styles";

const ControlHeaderComponent = () => {
  return (
    <Wrapper>
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
      </Nav>
      <Settings>
        <Image src="/control/settings.svg" height={24} width={24} />
      </Settings>
    </Wrapper>
  );
};

export const ControlHeader = memo(ControlHeaderComponent);
