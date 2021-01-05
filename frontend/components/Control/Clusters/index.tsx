import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ICluster } from "@/types/cluster";
import React, { memo } from "react";
import useSWR from "swr";
import Cluster from "../Cluster";
import { Wrapper, Title, Main } from "./styles";

interface ClusterProps {
  clusters: ICluster[] | null;
}

const Clusters: React.FC<ClusterProps> = ({ clusters }) => {
  const { data: clusterData, error: clusterError } = useSWR("/api/cluster/", {
    initialData: clusters,
  });

  if (clusterError) return <ErrorMessage message="Ошибка вывода групп" />;

  if (!clusterData) return <LoadingSpinner />;

  if (clusterData?.length === 0) return null;

  return (
    <Wrapper>
      <Title>Доступные кластеры</Title>
      <Main>
        {clusterData.map((cluster) => (
          <Cluster
            key={`Cluster__key__${cluster.name}`}
            name={cluster.name}
            cluster_detectors={cluster.cluster_detectors}
            id={cluster.id}
          />
        ))}
      </Main>
    </Wrapper>
  );
};

export default memo(Clusters);
