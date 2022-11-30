import { ArcLayer, GeoJsonLayer, PolygonLayer, IconLayer, TextLayer } from '@deck.gl/layers/typed';
import { DeckGL } from '@deck.gl/react/typed';
import { Marker, NavigationControl, StaticMap, _MapContext } from 'react-map-gl';
import ICON_ATLAS from '../../icons/pngegg.png';
import dataTest from './data/data.json';
import 'mapbox-gl/dist/mapbox-gl.css';

const skatePark =
  'https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/16/query?outFields=*&where=1%3D1&f=geojson';
console.log('skate park', skatePark);
// console.log('skate park', SKATE_PARK);
// const parks = dataTest.features.map(park => {
//   <Marker
//     key={park.properties.PARK_ID}
//     position={{ lat: park.geometry.coordinates[1], lng: park.geometry.coordinates[0] }}
//   />;
// });
const INITIAL_VIEW_STATE = {
  latitude: 45.47,
  longitude: -75.45,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';
const test = dataTest.features.map(park => park.properties.NAME);
const test2 = dataTest.features.map(park => {
  return park.geometry.coordinates;
});
console.log('text', test);
console.log('cordinates', test2);
const park1 = dataTest.features.map(park => park);
console.log(park1);

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 50,
  right: 20,
};
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 526, height: 526, mask: true },
};
export default function SkateParkMap() {
  const onClick = info => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.NAME} (${info.object.properties.FACILITY})`);
    }
  };
  const layers = [
    new GeoJsonLayer({
      id: 'skatePark',
      data: skatePark,
      // Styles
      // filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 1000,
      getPointRadius: f => 11 - f.properties.scalerank,
      pointType: 'icon',
      getFillColor: [234, 221, 202, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick,
    }),
    new IconLayer({
      id: 'icon-layer',
      data: dataTest.features,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas: ICON_ATLAS,
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      onClick,
      sizeScale: 15,
      getPosition: feature => feature.geometry.coordinates,
      getSize: d => 5,
      getColor: d => [Math.sqrt(d.exits), 140, 0],
    }),
    new TextLayer({
      id: 'text-layer',
      data: dataTest.features,
      pickable: true,
      getPosition: feature => feature.geometry.coordinates,
      getText: feature => feature.properties.NAME,
      getSize: 16,
      getAngle: 0,
      sizeUnits: 'pixels',
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      getColor: [255, 0, 0],
      getElevation: 100,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={({ object }) => object && `${object.properties.NAME}\n${object.properties.PARK_ID}`}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />

      {/* <NavigationControl style={NAV_CONTROL_STYLE} /> */}
    </DeckGL>
  );
}
