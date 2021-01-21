import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ControlContext, ControlProps } from "@/pages/control";
import React, { memo, useContext } from "react";
import useSWR from "swr";
import { Cluster } from "../Cluster";
import { Wrapper, Main } from "./styles";

interface ClusterProps {}

const ClustersComponent: React.FC<ClusterProps> = () => {
  const { clusters } = useContext(ControlContext) as ControlProps;

  const { data: clusterData, error: clusterError } = useSWR("/api/cluster/", {
    initialData: clusters,
  });

  if (clusterError) return <ErrorMessage message="Ошибка вывода групп" />;

  if (!clusterData) return <LoadingSpinner />;

  if (clusterData?.length === 0) return null;

  return (
    <Wrapper>
      <Main>
        {clusterData.map((cluster) => (
          // <div key={`Cluster__key__${cluster.name}`} data-testid="cluster">
          //   <h1>{cluster.name}</h1>
          //   <h1>{cluster.id}</h1>
          // </div>
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

export const Clusters = memo(ClustersComponent);
