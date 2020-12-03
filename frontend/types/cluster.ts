import { IDetector } from "./detector";

export interface ICluster {
  name: string;
  cluster_detectors: IDetector[];
}