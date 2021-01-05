import React from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { Wrapper, Side, Rectangle, Circle, SideLink, Name } from "./styles";

export const ControlSideBar = () => {
  const { firstName, lastName } = useUser();
  const { pathname } = useRouter();
  return (
    <Wrapper>
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
        <SideLink active={pathname === "/secure"}>
          <Link href="/secure">
            <a>Настройки</a>
          </Link>
        </SideLink>
      </Side>
    </Wrapper>
  );
};
