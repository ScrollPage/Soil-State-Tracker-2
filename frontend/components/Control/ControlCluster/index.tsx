import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ICluster } from "@/types/cluster";
import React, { memo } from "react";
import useSWR from "swr";
import ControlClusterItem from "../ControlClusterItem";
import { Wrapper } from "./styles";

interface ControlClusterProps {
  clusters: ICluster[] | null;
}

const ControlCluster: React.FC<ControlClusterProps> = ({ clusters }) => {
  const { data: clusterData, error: clusterError } = useSWR("/api/cluster/", {
    initialData: clusters,
  });

  if (clusterError) return <ErrorMessage message="Ошибка вывода групп" />;

  if (!clusterData) return <LoadingSpinner />;

  if (clusterData?.length === 0) return null;

  return (
    <Wrapper>
      {clusterData.map((cluster) => (
        <ControlClusterItem
          key={`controlClusterItem__key__${cluster.name}`}
          name={cluster.name}
          cluster_detectors={cluster.cluster_detectors}
          id={cluster.id}
        />
      ))}
    </Wrapper>
  );
};

export default memo(ControlCluster);
