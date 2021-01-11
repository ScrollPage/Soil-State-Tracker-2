import React, { memo } from "react";
import { AuthHeader } from "./Header";
import { Main } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayoutComponent: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <AuthHeader />
      <Main>{children}</Main>
    </>
  );
};

export const AuthLayout = memo(AuthLayoutComponent);
