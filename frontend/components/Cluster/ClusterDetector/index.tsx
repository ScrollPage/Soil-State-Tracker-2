import { IDetector } from "@/types/detector";
import React from "react";
import { SClusterDetector } from "./styles";

export const ClusterDetector: React.FC<IDetector> = ({ id, x, y }) => {
  return (
    <SClusterDetector>
      <h3>id: {id}</h3>
      <h3>x: {x}</h3>
      <h3>y: {y}</h3>
    </SClusterDetector>
  );
};
