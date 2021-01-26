import { ensureAuth } from "@/utils/ensure";
import { GetServerSideProps } from "next";
import React, { useMemo } from "react";
import { ControlLayout } from "@/components/Layout/ControlLayout";
import Head from "next/head";
import useSWR from "swr";
import { MapContainer } from "@/containers/map";
import { instanceWithSSR } from "@/api";
import { ICluster } from "@/types/cluster";

export interface ControlProps {
  clusters: ICluster[] | null;
}

const Map = ({ clusters }: ControlProps) => {
  const { data, error } = useSWR("/api/cluster/", {
    initialData: clusters,
  });

  const newData = useMemo(() => {
    if (!data || error) {
      return [];
    }
    let mas: ICluster[] = [];
    return data.reduce((acc, current) => {
      return [...acc, ...current.cluster_detectors];
    }, mas);
  }, [data, error]);

  return (
    <ControlLayout>
      <Head>
        <title>Карта</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      {!error && newData && <MapContainer data={newData} />}
    </ControlLayout>
  );
};

export default Map;

export const getServerSideProps: GetServerSideProps<ControlProps> = async (
  ctx
) => {
  ensureAuth(ctx);
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
    },
  };
};
