import { IDetector } from "./detector";

export interface ICluster {
  id: number;
  name: string;
  cluster_detectors: IDetector[];
  title: string | null;
}