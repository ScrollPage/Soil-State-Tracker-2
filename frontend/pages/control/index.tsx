import { instanceWithSSR } from "@/api";
import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import { ICluster } from "@/types/cluster";
import ControlLayout from "@/components/Layout/ControlLayout";
import Head from "next/head";
import { ControlContainer } from "@/containers/control";

interface ControlProps {
  detectors: IDetector[] | null;
  clusters: ICluster[] | null;
}

const Control = ({ detectors, clusters }: ControlProps) => {
  return (
    <ControlLayout>
      <Head>
        <title>Управление</title>
      </Head>
      <ControlContainer detectors={detectors} clusters={clusters} />
    </ControlLayout>
  );
};

export default Control;

export const getServerSideProps: GetServerSideProps<ControlProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  let detectors: IDetector[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/detector/`)
    .then((response) => {
      detectors = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  let clusters: ICluster[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/cluster/`)
    .then((response) => {
      clusters = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      clusters: clusters || null,
      detectors: detectors || null,
    },
  };
};
