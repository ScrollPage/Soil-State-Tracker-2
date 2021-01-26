import React, { memo, useEffect, useRef, useState } from "react";
import ReactMapGL, {
  ViewportProps,
  Marker,
  FlyToInterpolator,
  Popup,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { Wrapper, DetectorBtn, ClusterMarker } from "./styles";
import useSupercluster from "use-supercluster";
import { useWindowSize } from "@/hooks/useWindowSize";
import { IDetector } from "@/types/detector";

interface MapContainerProps {
  data: IDetector[];
}

const MapContainerComponent: React.FC<MapContainerProps> = ({ data }) => {
  const { width, height } = useWindowSize();
  const [viewport, setViewport] = useState<any>({
    longitude: -77.02,
    latitude: 38.887,
    zoom: 12,
  });
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
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

  const points = data.map((detector) => ({
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
      <ReactMapGL
        {...viewport}
        width={width && width - 250}
        height={height && height - 120}
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
        <div style={{ position: "absolute", bottom: 100, left: 20 }}>
          <ScaleControl maxWidth={100} unit={"metric"} />
        </div>
      </ReactMapGL>
    </Wrapper>
  );
};

export const MapContainer = memo(MapContainerComponent);
