import { instanceWithSSR } from "@/api";
import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import { ICluster } from "@/types/cluster";
import { ControlTransfer } from "@/components/Control/ControlTransfer";
import { ControlCluster } from "@/components/Control/ControlCluster";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface IControl {
  detectors: IDetector[] | null;
  clusters: ICluster[] | null;
}

const Control = ({ detectors, clusters }: IControl) => {
  return (
    <SControl>
      <DndProvider backend={HTML5Backend}>
        <SControlDetectors>
          <ControlTransfer detectors={detectors} />
        </SControlDetectors>
        <SControlClusters>
          <ControlCluster clusters={clusters} />
        </SControlClusters>
      </DndProvider>
    </SControl>
  );
};

export default Control;

export const getServerSideProps: GetServerSideProps<IControl> = async (ctx) => {
  ensureAuth(ctx);

  let detectors: IDetector[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/detector/`)
    .then((response) => {
      detectors = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  let clusters: ICluster[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/cluster/`)
    .then((response) => {
      clusters = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      clusters: clusters || null,
      detectors: detectors || null,
    },
  };
};

const SControl = styled.div`
  display: flex;
  padding: 20px 0;
`;

const SControlDetectors = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const SControlClusters = styled.div`
  flex: 1;
`;
