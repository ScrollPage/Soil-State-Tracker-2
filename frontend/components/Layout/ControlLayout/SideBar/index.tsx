import React, { memo } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { Wrapper, Side, Rectangle, Circle, SideLink, Name } from "./styles";
import { Avatar } from "@/components/UI/Avatar";
import { sidebarLinks } from "@/someData/controlLinksData";

const renderLinks = (pathname: string) => {
  return sidebarLinks.map((link, index) => {
    return (
      <SideLink key={`sidelink__key__${index}`} active={pathname === link.href}>
        <Link href={link.href}>
          <a>{link.label}</a>
        </Link>
      </SideLink>
    );
  });
};

const ControlSideBarComponent = () => {
  const { firstName, lastName } = useUser();
  const { pathname } = useRouter();
  return (
    <Wrapper>
      <Rectangle>
        <Avatar />
        <Name>
          {firstName} <br /> {lastName}
        </Name>
      </Rectangle>
      <Side>{renderLinks(pathname)}</Side>
    </Wrapper>
  );
};

export const ControlSideBar = memo(ControlSideBarComponent);
