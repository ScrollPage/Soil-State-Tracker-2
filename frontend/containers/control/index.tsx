import React from "react";
import ControlTransfer from "@/components/Control/ControlTransfer";
import ControlCluster from "@/components/Control/ControlCluster";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ControlAdd } from "@/components/Control/ControlAdd";
import Container from "@/components/UI/Container";
import { Wrapper, Title, Main, Detectors, Clusters } from "./styles";
import { IDetector } from "@/types/detector";
import { ICluster } from "@/types/cluster";

interface ControlContainerProps {
  detectors: IDetector[] | null;
  clusters: ICluster[] | null;
}

export const ControlContainer: React.FC<ControlContainerProps> = ({
  detectors,
  clusters,
}) => {
  return (
    <Container>
      <Wrapper>
        <Title>Управление</Title>
        <Main>
          <DndProvider backend={HTML5Backend}>
            <Detectors>
              <ControlTransfer detectors={detectors} />
            </Detectors>
            <Clusters>
              <ControlCluster clusters={clusters} />
              <ControlAdd />
            </Clusters>
          </DndProvider>
        </Main>
      </Wrapper>
    </Container>
  );
};
