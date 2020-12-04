import { IProtection } from "@/types/protection";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { SHeaderMenu, SNavLink } from "./styles";

interface INavitem {
  path: string;
  name: string;
}

const globalNavItems: INavitem[] = [
  { path: "/", name: "Главная" },
  { path: "/about", name: "О продукте" },
];

const authNavItems: INavitem[] = [
  { path: "/", name: "Главная" },
  { path: "/about", name: "О продукте" },
  { path: "/control", name: "Управление" },
];

const staffNavItems: INavitem[] = [
  { path: "/", name: "Главная" },
  { path: "/about", name: "О продукте" },
  { path: "/support", name: "Поддержка" },
];

export const renderLinks = (
  protection: IProtection,
  isDrower?: boolean,
  setMenuOpen?: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();
  const { isAuth, isStaff } = protection;

  const menuOpenHadler = () => {
    if (isDrower && setMenuOpen) {
      setMenuOpen(false);
    }
  };

  let navItems = globalNavItems;

  if (isStaff) {
    navItems = staffNavItems;
  }

  if (isAuth) {
    navItems = authNavItems;
  }

  return navItems.map((item, index) => (
    <Link key={`navlink__key__${item.path}__${index}`} href={item.path}>
      <SNavLink
        isDrower={isDrower}
        active={router.pathname === item.path}
        onClick={menuOpenHadler}
      >
        {item.name}
      </SNavLink>
    </Link>
  ));
};

interface IHeaderMenu {
  protection: IProtection;
}

const HeaderMenu = ({ protection }: IHeaderMenu) => {
  return <SHeaderMenu>{renderLinks(protection, false)}</SHeaderMenu>;
};

export default HeaderMenu;
