import React from 'react';

import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { DeckGL } from '@deck.gl/react/typed';
import { NavigationControl, StaticMap } from 'react-map-gl';

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 1,
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 50,
  right: 20,
};
export default function HeatMap({
  // eslint-disable-next-line react/prop-types
  data = DATA_URL,
  intensity = 1,
  threshold = 0.03,
  radiusPixels = 30,
  mapStyle = MAP_STYLE,
}) {
  const layers = [
    new HeatmapLayer({
      data,
      id: 'heatmp-layer-custom',
      pickable: false,
      getPosition: d => [d[0], d[1]],
      getWeight: d => d[2],
      radiusPixels,
      intensity,
      threshold,
    }),
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap className="fixed right-[-400px] flex" reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
      {/* <NavigationControl style={NAV_CONTROL_STYLE} /> */}
    </DeckGL>
  );
}
