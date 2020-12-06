import React from "react";
import { Main, Header } from "./styles";
import ChatWidget from "@/components/ChatWidget";
import { useUser } from "@/hooks/useUser";
// import Link from "next/link";

interface ControlLayoutProps {
  children: React.ReactNode;
}

const ControlLayout: React.FC<ControlLayoutProps> = ({ children }) => {
  const { isStaff } = useUser();
  return (
    <>
      <Header>
        
      </Header>
      <Main>{children}</Main>
      {!isStaff && <ChatWidget />}
    </>
  );
};

export default ControlLayout;
