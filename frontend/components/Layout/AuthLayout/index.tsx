import React from "react";
import { AuthHeader } from "./Header";
import { Main } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <AuthHeader />
      <Main>{children}</Main>
    </>
  );
};

export default AuthLayout;
