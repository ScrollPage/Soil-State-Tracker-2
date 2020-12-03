import EmptyMessage from "@/components/UI/EmptyMessage";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ICluster } from "@/types/cluster";
import React from "react";
import useSWR from "swr";
import { ControlClusterItem } from "../ControlClusterItem";
import { SControlCluster } from "./styles";

interface IControlCluster {
  clusters: ICluster[] | null;
}

export const ControlCluster: React.FC<IControlCluster> = ({ clusters }) => {
  const { data: clusterData, error: clusterError } = useSWR("/api/cluster/", {
    initialData: clusters,
  });

  if (clusterError) return <ErrorMessage message="Ошибка вывода групп" />;

  if (!clusterData) return <LoadingSpinner />;

  if (clusterData?.length === 0)
    return <EmptyMessage message="У вас нет групп " />;

  return (
    <SControlCluster>
      {clusterData.map((cluster) => (
        <ControlClusterItem
          key={`controlClusterItem__key__${cluster.name}`}
          title={cluster.name}
          detectors={cluster.cluster_detectors}
        />
      ))}
    </SControlCluster>
  );
};
