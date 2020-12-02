import { IProtection } from "@/types/protection";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { SHeaderMenu, SNavLink } from "./styles";

interface INavitem {
  path: string;
  name: string;
  isAuth?: boolean;
  isStaff?: boolean;
  isWorker?: boolean;
  isAdmin?: boolean;
}

const navItems: INavitem[] = [
  {
    path: "/",
    name: "Главная",
  },
  {
    path: "/about",
    name: "О продукте",
  },
  {
    isAuth: true,
    isAdmin: true,
    isWorker: true,
    path: "/data",
    name: "Данные",
  },
  {
    isAuth: true,
    isAdmin: true,
    path: "/manage",
    name: "Управление",
  },
  {
    isAuth: true,
    isStaff: true,
    path: "/support",
    name: "Поддержка",
  },
];

export const renderLinks = (
  protection: IProtection,
  isDrower?: boolean,
  setMenuOpen?: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();
  const { isAuth, isStaff, isWorker } = protection;
  const isAdmin = !isStaff && !isWorker;

  const menuOpenHadler = () => {
    if (isDrower && setMenuOpen) {
      setMenuOpen(false);
    }
  };

  const filterLinks = (item: INavitem) => {
    let isShow = isAuth || !item.isAuth;
    return isShow;
  };

  return navItems
    .filter((item) => filterLinks(item))
    .map((item, index) => (
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
