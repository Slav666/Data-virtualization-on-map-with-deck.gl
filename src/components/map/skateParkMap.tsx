import React, { useCallback, useRef, useState } from 'react';

import { MVTLayer } from '@deck.gl/geo-layers';
import { ArcLayer, GeoJsonLayer, IconLayer, PolygonLayer, TextLayer } from '@deck.gl/layers/typed';
import { DeckGL } from '@deck.gl/react/typed';
import { scaleThreshold } from 'd3-scale';
import ReactMapGl, { Map, MapRef, Marker, NavigationControl, StaticMap, _MapContext } from 'react-map-gl';

import ICON_ATLAS from '../../icons/pngegg.png';
import ControlPanel from '../controlPanel';
import dataTest from './data/data.json';
import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-next-line import/order
import SidePanel from '../sidePanel';

const skatePark =
  'https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/16/query?outFields=*&where=1%3D1&f=geojson';
console.log('skate park', skatePark);
const INITIAL_VIEW_STATE = {
  latitude: 45.47,
  longitude: -75.45,
  zoom: 10,
  bearing: 0,
  pitch: 10,
};
// const INITIAL_VIEW_STATE1 = {
//   latitude: 49.254,
//   longitude: -123.13,
//   zoom: 11,
//   maxZoom: 16,
//   pitch: 45,
//   bearing: 0,
// };
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

// const NAV_CONTROL_STYLE = {
//   position: 'absolute',
//   top: 50,
//   right: 20,
// };
const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 526, height: 526, mask: true },
};

const landCover = [
  [
    [-123.0, 49.196],
    [-123.0, 49.324],
    [-123.306, 49.324],
    [-123.306, 49.196],
  ],
];
const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json'; // eslint-disable-line

export const COLOR_SCALE = scaleThreshold()
  .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38],
  ]);

export default function SkateParkMap({ data = DATA_URL }) {
  const onClick = info => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.NAME} (${info.object.properties.FACILITY})`);
    }
  };

  // only needed when using shadows - a plane for shadows to drop on

  const polygonLayer = new PolygonLayer({
    id: 'ground',
    data: landCover,
    stroked: false,
    getPolygon: f => f,
    getFillColor: [0, 0, 0, 0],
  });
  const geoJsonLayer = new GeoJsonLayer({
    id: 'geojson',
    data,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
    getFillColor: f => COLOR_SCALE(f.properties.growth),
    getLineColor: [255, 255, 255],
    pickable: true,
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
  let [layers, setLayers] = useState([polygonLayer, geoJsonLayer, iconLayer, textLayer]);
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
  const mapRef = useRef<MapRef>();
  const onSelectCity = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);
  return (
    <>
      <div
        className="left-[-300px] flex min-h-screen
    overflow-y-auto bg-gray-900 p-2 text-center shadow duration-1000 lg:left-0"
      >
        <div className="text-xl text-gray-100">
          <div className="mt-1 flex items-center rounded-md p-2.5 ">
            <i className="rounded-md bg-blue-600 px-2 py-1"></i>
            <h1 className="ml-3  text-xl font-bold text-gray-200">Slav's Map App</h1>
          </div>

          <div>
            <SidePanel layers={layers} toggleLayer={toggleLayer} />
          </div>
        </div>
      </div>
      <div style={{ height: '100vh', width: '85vw', position: 'relative', marginLeft: '20px' }}>
        <ReactMapGl
          mapboxApiAccessToken="pk.eyJ1Ijoic2xhdzY2NiIsImEiOiJjbGF6dWs5MXAwYng1M25wbDNpNjlscTdlIn0.iXtSCUNohNGfnRy2SoKRvQ"
          mapStyle={MAP_STYLE}
          viewState={INITIAL_VIEW_STATE}
          width="100%"
          height="100%"
          reuseMaps={true}
          ref={mapRef}
        >
          <DeckGL
            controller={true}
            getTooltip={({ object }) => object && `${object.properties.NAME}\n${object.properties.PARK_ID}`}
            initialViewState={INITIAL_VIEW_STATE}
            layers={layers}
            // viewState={viewState}
            // onViewStateChange={e => setViewState(e.viewState)}
          >
            <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />

            {/* <NavigationControl style={NAV_CONTROL_STYLE} /> */}
            <ControlPanel onSelectCity={onSelectCity} />
          </DeckGL>
        </ReactMapGl>
      </div>
    </>
  );
}
