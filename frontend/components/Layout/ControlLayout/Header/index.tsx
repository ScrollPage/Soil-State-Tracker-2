import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrapper, Nav, NavLink, Settings } from "./styles";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { SButton } from "@/components/UI/Button";
import { logout } from "@/store/actions/auth";
import { useDispatch } from "react-redux";

const ControlHeaderComponent = () => {
  const dispatch = useDispatch();
  const { isStaff } = useUser();
  return (
    <Wrapper>
      <Nav>
        <Image height={84} width={114} src="/main/logo.svg" />
        <HeadLink url="/" label="Главная" />
        <HeadLink url="/" label="Инстуркция" />
        {isStaff && <HeadLink url="/im" label="Панель поддержки" />}
      </Nav>
      <Settings>
        <SButton myType="white" small onClick={() => dispatch(logout(true))}>
          Выход
        </SButton>
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
  const { pathname } = useRouter();

  return (
    <NavLink isActive={pathname === url}>
      <Link href={url}>
        <a>{label}</a>
      </Link>
    </NavLink>
  );
};
