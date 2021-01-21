import React from "react";
import Container from "@/components/UI/Container";
import { Wrapper, Title, Main } from "./styles";
import { SideBar } from "@/components/Control/SideBar/index.";
import ChooseProvider from "@/context/control";
import { Info } from "@/components/Control/Info/index";
import { ResizePanel } from "@/components/Control/ResizePanel";

interface ControlContainerProps {}

export const ControlContainer: React.FC<ControlContainerProps> = ({}) => {
  return (
    <Container>
      <Wrapper>
        <Title>Управление</Title>
        <ChooseProvider>
          <Main>
            <ResizePanel>
              <SideBar />
              <Info />
            </ResizePanel>
          </Main>
        </ChooseProvider>
      </Wrapper>
    </Container>
  );
};
