import { authCheckState } from "@/store/actions/auth";
import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ControlHeader } from "./Header";
import { ControlSideBar } from "./SideBar";
import { Main } from "./styles";

interface ControlLayoutProps {
  children: React.ReactNode;
}

const ControlLayoutComponent: React.FC<ControlLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  return (
    <>
      <ControlHeader />
      <ControlSideBar />
      <Main>{children}</Main>
    </>
  );
};

export const ControlLayout = memo(ControlLayoutComponent);
