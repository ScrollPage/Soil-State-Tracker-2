export function addDataLayer(map: any, data: any[], sourceName: string) {

  map.getStyle().layers.forEach((thisLayer: any) => {
    if (thisLayer.type == "symbol") {
      map.setLayoutProperty(thisLayer.id, "text-field", [
        "get",
        "name_" + "ru",
      ]);
    }
  });

  if (!map.getSource(sourceName)) {
    map.addSource(sourceName, {
      type: "geojson",
      data: data,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
      clusterProperties: {
        sum: ["+", ["get", "event_count"]],
      },
    });
  } else {
    map.getSource(sourceName).setData(data);
  }

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: sourceName,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": "rgb(229, 36, 59)",
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      "circle-opacity": 0.75,
      "circle-stroke-width": 4,
      "circle-stroke-color": "#fff",
      "circle-stroke-opacity": 0.5,
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: sourceName,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{sum}",
      "text-font": ["Open Sans Bold"],
      "text-size": 16,
    },
    paint: {
      "text-color": "white",
    },
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: sourceName,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": ["step", ["get", "event_count"], 20, 100, 30, 750, 40],
      "circle-color": "rgb(229, 36, 59)",
      "circle-opacity": 0.75,
      "circle-stroke-width": 4,
      "circle-stroke-color": "#fff",
      "circle-stroke-opacity": 0.5,
    },
  });

  map.addLayer({
    id: "event-count",
    type: "symbol",
    source: sourceName,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": "{Д}",
      "text-font": ["Open Sans Bold"],
      "text-size": 16,
    },
    paint: {
      "text-color": "white",
    },
  });
}