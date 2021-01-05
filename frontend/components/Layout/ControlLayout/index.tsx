import React from "react";
import { ControlHeader } from "./Header";
import { ControlSideBar } from "./SideBar";
import { Main } from "./styles";

interface ControlLayoutProps {
  children: React.ReactNode;
}

const ControlLayout: React.FC<ControlLayoutProps> = ({ children }) => {
  return (
    <>
      <ControlHeader />
      <ControlSideBar />
      <Main>{children}</Main>
    </>
  );
};

export default ControlLayout;
