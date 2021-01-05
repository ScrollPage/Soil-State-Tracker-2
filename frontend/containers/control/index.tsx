import React from "react";
import Transfers from "@/components/Control/Transfers";
import Clusters from "@/components/Control/Clusters";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Add } from "@/components/Control/Add";
import Container from "@/components/UI/Container";
import { Wrapper, Title, Main, TransferWrapper, ClusterWrapper } from "./styles";
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
            <TransferWrapper>
              <Transfers detectors={detectors} />
            </TransferWrapper>
            <ClusterWrapper>
              <Clusters clusters={clusters} />
              <Add />
            </ClusterWrapper>
          </DndProvider>
        </Main>
      </Wrapper>
    </Container>
  );
};
