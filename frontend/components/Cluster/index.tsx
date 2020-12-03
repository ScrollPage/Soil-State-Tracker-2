import { IDetector } from "@/types/detector";
import React from "react";
import { SClusterContainer } from "./styles";

interface IClusterContainer {
  detectors: IDetector[] | null;
}

export const ClusterContainer = () => {
  return <SClusterContainer></SClusterContainer>;
};
