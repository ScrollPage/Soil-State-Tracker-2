import { ensureAuth } from "@/utils/ensure";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { ControlLayout } from "@/components/Layout/ControlLayout";
import Head from "next/head";
import useSWR from "swr";
import { initializeMap } from "@/utils/initializeMap";
import { addDataLayer } from "@/utils/addDataLayer";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken =
  "pk.eyJ1IjoidHJpbW0iLCJhIjoiY2trOGN1bzduMG1kdzJvcGJwZjA2OXpiaSJ9.aAbP175PbX7djA2oOKYtfQ";
const sourceName = "dcmusic.live";
const url = "/api/liveMusic";

const fetcher = (...args: any) =>
  // @ts-ignore
  fetch(...args).then((response) => response.json());

export interface ControlProps {}

const Map = ({}: ControlProps) => {
  const { data, error } = useSWR(url, { fetcher });
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState<any>();

  if (error) {
    return "Error";
  }

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-77.02, 38.887],
      zoom: 12.5,
      pitch: 45,
      maxBounds: [
        [-77.875588, 38.50705], // Southwest coordinates
        [-76.15381, 39.548764], // Northeast coordinates
      ],
    });

    initializeMap(mapboxgl, map, sourceName);
    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted && data && Map) {
      Map.on("load", function () {
        addDataLayer(Map, data, sourceName);
      });
    }
  }, [pageIsMounted, setMap, data, Map]);

  return (
    <ControlLayout>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <title>Карта</title>
      </Head>
      <div id="my-map" style={{ height: "100%", width: "100%" }} />
    </ControlLayout>
  );
};

export default Map;

export const getServerSideProps: GetServerSideProps<ControlProps> = async (
  ctx
) => {
  ensureAuth(ctx);

  return {
    props: {},
  };
};
