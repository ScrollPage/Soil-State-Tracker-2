import React, { memo, useEffect } from "react";
import { Main } from "./styles";
import { SctollToTopButton } from "@/components/UI/ScrollToTopButton";
import { MainHeader } from "./Header";
import { useDispatch } from "react-redux";
import { authCheckState } from "@/store/actions/auth";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayoutComponent: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  return (
    <>
      <MainHeader />
      <Main>{children}</Main>
      <SctollToTopButton />
    </>
  );
};

export const MainLayout = memo(MainLayoutComponent);
