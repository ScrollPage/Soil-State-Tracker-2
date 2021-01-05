import React from "react";
import { Main } from "./styles";
import { Footer } from "@/components/Landing/Footer";
import { SctollToTopButton } from "@/components/UI/ScrollToTopButton";
import { MainHeader } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <Main>{children}</Main>
      <Footer />
      <SctollToTopButton />
    </>
  );
};

export default MainLayout;
