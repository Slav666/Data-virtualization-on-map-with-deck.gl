import { ArcLayer, GeoJsonLayer, PolygonLayer } from '@deck.gl/layers/typed';
import { DeckGL } from '@deck.gl/react/typed';
import { NavigationControl, StaticMap, _MapContext } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const SKATE_PARK =
  'https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/16/query?outFields=*&where=1%3D1&f=geojson';

const INITIAL_VIEW_STATE = {
  latitude: 45.47,
  longitude: -75.45,
  zoom: 10,
  bearing: 0,
  pitch: 30,
};
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 50,
  right: 20,
};

export default function SkateParkMap() {
  const onClick = info => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
    }
  };
  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: SKATE_PARK,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f => 11 - f.properties.scalerank,
      pointType: 'circle',
      getFillColor: [234, 221, 202, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick,
    }),
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap className="right-[-300px] flex" reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
      {/* <NavigationControl style={NAV_CONTROL_STYLE} /> */}
    </DeckGL>
  );
}
