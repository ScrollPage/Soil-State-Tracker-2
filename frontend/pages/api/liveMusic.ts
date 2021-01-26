import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json([
    {
      id: 1,
      name: "1cluster",
      title: "some",
      cluster_detectors: [
        {
          cluster: "1cluster",
          id: 1,
          x: -77.0317,
          y: 38.9146,
        },
        {
          cluster: "1cluster",
          id: 2,
          x: -77.023982,
          y: 38.878824,
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
          x: -77.0423,
          y: 38.9224,
        },
      ],
    },
  ]);
};