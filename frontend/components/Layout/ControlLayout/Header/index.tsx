import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrapper, Nav, NavLink, Settings } from "./styles";
import { useUser } from "@/hooks/useUser";

const ControlHeaderComponent = () => {
  const { isStaff } = useUser();
  return (
    <Wrapper>
      <Nav>
        <Image height={84} width={114} src="/main/logo.svg" />
        <HeadLink url="/" label="Главная" />
        {isStaff && <HeadLink url="/im" label="Поддержка" />}
      </Nav>
      <Settings>
        <Image src="/control/settings.svg" height={24} width={24} />
      </Settings>
    </Wrapper>
  );
};

export const ControlHeader = memo(ControlHeaderComponent);

interface HeadLinkProps {
  label: string;
  url: string;
}

const HeadLink: React.FC<HeadLinkProps> = ({ label, url }) => {
  return (
    <NavLink>
      <Link href={url}>
        <a>{label}</a>
      </Link>
    </NavLink>
  );
};
