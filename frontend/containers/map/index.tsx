import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import ReactMapGL, {
  ViewportProps,
  Marker,
  FlyToInterpolator,
  Popup,
  NavigationControl,
  ScaleControl,
  FullscreenControl,
} from "react-map-gl";
import {
  Wrapper,
  DetectorBtn,
  ClusterMarker,
  Title,
  Inner,
  SideBar,
} from "./styles";
import useSupercluster from "use-supercluster";
import { ICluster } from "@/types/cluster";
import { IDetector } from "@/types/detector";

interface MapContainerProps {
  data: ICluster[];
}

const MapContainerComponent: React.FC<MapContainerProps> = ({ data }) => {
  const newData = useMemo(() => {
    let mas: IDetector[] = [];
    return data.reduce((acc, current) => {
      return [...acc, ...current.cluster_detectors];
    }, mas);
  }, [data]);
  const [viewport, setViewport] = useState<any>({
    longitude: -77.02,
    latitude: 38.887,
    zoom: 12,
  });
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const mapRef = useRef<any>();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPlace(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const points = newData.map((detector) => ({
    type: "Feature",
    properties: {
      cluster: false,
      title: detector.id,
      venue: detector.id,
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(detector.x), parseFloat(detector.y)],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  // const changeMapLanguage = (map: any) => {
  //   map.getStyle().layers.forEach((thisLayer: any) => {
  //     if (thisLayer.type == "symbol") {
  //       map.setLayoutProperty(thisLayer.id, "text-field", [
  //         "get",
  //         "name_" + "ru",
  //       ]);
  //     }
  //   });
  // };

  return (
    <Wrapper>
      <Title>Расположение датчиков</Title>
      <Inner isFullScreen={fullScreen}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          maxZoom={20}
          mapboxApiAccessToken={process.env.NEXT_MAPBOX_TOKEN}
          onViewportChange={(viewport: ViewportProps) => {
            setViewport(viewport);
          }}
          // onStyleLoad={changeMapLanguage}
          ref={mapRef}
        >
          {clusters.map((cluster: any) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount,
              venue,
            } = cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`mapmarker__key__${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <ClusterMarker
                    width={50 + (pointCount / points.length) * 40}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );

                      setViewport({
                        ...viewport,
                        latitude,
                        longitude,
                        zoom: expansionZoom,
                        transitionInterpolator: new FlyToInterpolator({
                          speed: 2,
                        }),
                        transitionDuration: "auto",
                      });
                    }}
                  >
                    {pointCount}
                  </ClusterMarker>
                </Marker>
              );
            }

            return (
              <Marker
                key={`mapmarker__key__${venue}`}
                longitude={longitude}
                latitude={latitude}
              >
                <DetectorBtn
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPlace(cluster);
                  }}
                >
                  <img src="/images/detector.png" alt="marker-detector" />
                </DetectorBtn>
              </Marker>
            );
          })}
          {selectedPlace ? (
            <Popup
              longitude={selectedPlace.geometry.coordinates[0]}
              latitude={selectedPlace.geometry.coordinates[1]}
              anchor="right"
              offsetLeft={15}
              offsetTop={30}
              onClose={() => {
                setSelectedPlace(null);
              }}
            >
              <div>
                <h2>Кластер: {selectedPlace.properties.title}</h2>
                <p>Id: {selectedPlace.properties.venue}</p>
              </div>
            </Popup>
          ) : null}
          <div style={{ position: "absolute", right: "15px", top: "15px" }}>
            <NavigationControl />
          </div>
          <div style={{ position: "absolute", left: "15px", top: "15px" }}>
            {typeof window !== "undefined" && (
              <div
                onClick={() => {
                  setFullScreen((item) => !item);
                }}
              >
                <FullscreenControl container={document.querySelector("body")} />
              </div>
            )}
          </div>
        </ReactMapGL>
      </Inner>
      <SideBar></SideBar>
    </Wrapper>
  );
};

export const MapContainer = memo(MapContainerComponent);
