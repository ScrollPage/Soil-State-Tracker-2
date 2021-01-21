import { ICluster } from "@/types/cluster";

export const clustersData: ICluster[] = [
  {
    id: 1,
    name: "1cluster",
    title: "some",
    cluster_detectors: [
      {
        cluster: "1cluster",
        id: 1,
        x: 123,
        y: -123,
      },
      {
        cluster: "1cluster",
        id: 2,
        x: 50,
        y: 12,
      },
    ],
  },
  {
    id: 2,
    name: "2cluster",
    title: "some2",
    cluster_detectors: [
      {
        cluster: "2cluster",
        id: 3,
        x: 100,
        y: 2,
      },
    ],
  },
];