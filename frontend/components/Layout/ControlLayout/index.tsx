import Container from "@/components/UI/Container";
import { useSetupWebsokets } from "@/hooks/useSetupWebsokets";
import { authCheckState } from "@/store/actions/auth";
import React, { memo, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ControlHeader } from "./Header";
import { ControlSideBar } from "./SideBar";
import { Main } from "./styles";

interface ControlLayoutProps {
  children: React.ReactNode;
  isContainer?: boolean;
}

const ControlLayoutComponent: React.FC<ControlLayoutProps> = ({
  children,
  isContainer = true,
}) => {
  const dispatch = useDispatch();

  useSetupWebsokets();

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  const render = useMemo(
    () => (isContainer ? <Container>{children}</Container> : children),
    [isContainer, children]
  );

  return (
    <>
      <ControlHeader />
      <ControlSideBar />
      <Main>{render}</Main>
    </>
  );
};

export const ControlLayout = memo(ControlLayoutComponent);
