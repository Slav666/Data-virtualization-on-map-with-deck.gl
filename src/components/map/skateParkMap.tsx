import React, { useState } from 'react';
import { MVTLayer } from '@deck.gl/geo-layers';
import { ArcLayer, GeoJsonLayer, IconLayer, PolygonLayer, TextLayer } from '@deck.gl/layers/typed';
import { DeckGL } from '@deck.gl/react/typed';
import { Marker, NavigationControl, StaticMap, _MapContext } from 'react-map-gl';
import ICON_ATLAS from '../../icons/pngegg.png';
import dataTest from './data/data.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import SidePanel from '../sidePanel';

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
  pitch: 10,
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
  // function toggleLayer(chosenLayerId) {
  //   const newLayers = props.layers.map(layer => {
  //     return chosenLayerId === layer.id
  //       ? layer.clone({ visible: !layer.props.visible }) // toggle visible boolean
  //       : layer;
  //   });
  //   props.refreshLayers(newLayers);
  // }
  // const [layer, setLayer] = useState(IconLayer);
  const onClick = info => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.NAME} (${info.object.properties.FACILITY})`);
    }
  };
  const layer = new PolygonLayer({
    id: 'polygon-layer',
    data: dataTest.features,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.counter,
    getElevation: d => d.population / d.area / 10,
    getFillColor: d => [d.population / d.area / 60, 140, 0],
    getLineColor: [80, 80, 80],
    getLineWidth: 1,
  });
  // const layer = new MVTLayer({
  //   data: ['https://tiles-a.basemaps.cartocdn.com/vectortiles/carto.streets/v1/{z}/{x}/{y}.mvt'],

  //   minZoom: 0,
  //   maxZoom: 23,
  //   getLineColor: [192, 192, 192],
  //   getFillColor: [140, 170, 180],

  //   getLineWidth: f => {
  //     switch (f.properties.class) {
  //       case 'street':
  //         return 6;
  //       case 'motorway':
  //         return 10;
  //       default:
  //         return 1;
  //     }
  //   },
  //   lineWidthMinPixels: 4,
  // });
  const geoLayer = new GeoJsonLayer({
    id: 'skatePark',
    data: dataTest.features,
    // Styles
    // filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 1000,
    getPointRadius: f => 15 - f.properties.scalerank,
    pointType: 'circle',
    getFillColor: [234, 221, 202, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick,
  });
  const iconLayer = new IconLayer({
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
  });
  const textLayer = new TextLayer({
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
  });
  let [layers, setLayers] = useState([layer, geoLayer, iconLayer, textLayer]);
  const refreshLayers = (newLayer: any) => {
    setLayers(newLayer);
  };
  function toggleLayer(chosenLayerId: String) {
    const newLayers = layers.map(layer => {
      return chosenLayerId === layer.id
        ? layer.clone({ visible: !layer.props.visible }) // toggle visible boolean
        : layer;
    });
    refreshLayers(newLayers);
  }

  return (
    <>
      <div
        className="sidebar left-[-300px] flex min-h-screen 
    overflow-y-auto bg-gray-900 p-2 text-center shadow duration-1000 lg:left-0"
      >
        <div className="text-xl text-gray-100">
          <div className="mt-1 flex items-center rounded-md p-2.5 ">
            <i className="bi bi-app-indicator rounded-md bg-blue-600 px-2 py-1"></i>
            <h1 className="ml-3  text-xl font-bold text-gray-200">Slav's Map App</h1>
          </div>

          <div>
            <SidePanel layers={layers} toggleLayer={toggleLayer} />
          </div>
        </div>
      </div>
      <div style={{ height: '100vh', width: '85vw', position: 'relative', marginLeft: '20px' }}>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
          getTooltip={({ object }) => object && `${object.properties.NAME}\n${object.properties.PARK_ID}`}
        >
          <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />

          {/* <NavigationControl style={NAV_CONTROL_STYLE} /> */}
        </DeckGL>
      </div>
    </>
  );
}
