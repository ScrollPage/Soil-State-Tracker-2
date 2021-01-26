import React, { memo, useMemo, useState, useCallback } from "react";
import { Wrapper, Title, Inner } from "./styles";
import { ICluster } from "@/types/cluster";
import { IDetector } from "@/types/detector";
import { Plan } from "@/components/Map/Plan";
import { SideBar } from "@/components/Map/SideBar";

interface MapContainerProps {
  data: ICluster[];
}

const MapContainerComponent: React.FC<MapContainerProps> = ({ data }) => {
  const [clusters, setClusters] = useState<string[]>([]);

  const detectors = useMemo(() => {
    return data.reduce<IDetector[]>((acc, current) => {
      if (!clusters.includes(current.name)) {
        return acc;
      }
      return [...acc, ...current.cluster_detectors];
    }, []);
  }, [data, clusters]);

  const plainOptions = useMemo(() => {
    return data.reduce<string[]>((acc, current) => {
      return [...acc, current.name];
    }, []);
  }, [data]);

  const setCheckedList = useCallback(
    (items: string[]) => {
      setClusters(items);
    },
    [clusters, setClusters]
  );

  return (
    <Wrapper>
      <Title>Расположение датчиков</Title>
      <Inner>
        <Plan detectors={detectors} />
        <SideBar
          checkedList={clusters}
          setCheckedList={setCheckedList}
          plainOptions={plainOptions}
        />
      </Inner>
    </Wrapper>
  );
};

export const MapContainer = memo(MapContainerComponent);
