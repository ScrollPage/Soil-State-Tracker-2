import { instanceWithSSR } from "@/api";
import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import { ICluster } from "@/types/cluster";
import useSWR from "swr";

interface IControl {
  detectors: IDetector[] | null;
  clusters: ICluster[] | null;
}

const Control = ({ detectors, clusters }: IControl) => {
  const { data: detectorData, error: detecotorError } = useSWR(
    "/api/detector/",
    {
      initialData: detectors,
    }
  );

  const { data: clusterData, error: clusterError } = useSWR("/api/cluster/", {
    initialData: clusters,
  });

  return (
    <SControl>
      <SControlDetectors>
        {detecotorError && <h1>Ошибка</h1>}
        {!detectorData && <h1>Загрузка...</h1>}
        {detectorData?.length === 0 && <h1>У вас нет детекторов</h1>}
        {detectorData && <h1>{JSON.stringify(detectorData, null, 2)}</h1>}
      </SControlDetectors>
      <SControlClusters>
        {clusterError && <h1>Ошибка</h1>}
        {!clusterData && <h1>Загрузка...</h1>}
        {clusterData?.length === 0 && <h1>У вас нет детекторов</h1>}
        {clusterData && <h1>{JSON.stringify(clusterData, null, 2)}</h1>}
      </SControlClusters>
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
`;

const SControlDetectors = styled.div``;

const SControlClusters = styled.div``;
