import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers/typed';
import { scaleThreshold } from 'd3-scale';

const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json';

const landCover = [
  [
    [-123.0, 49.196],
    [-123.0, 49.324],
    [-123.306, 49.324],
    [-123.306, 49.196],
  ],
];

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

export const polygonLayer = new PolygonLayer({
  id: 'ground',
  data: landCover,
  stroked: false,
  getPolygon: f => f,
  getFillColor: [0, 0, 0, 0],
});

export const geoJsonLayer = new GeoJsonLayer({
  id: 'geojson',
  data: DATA_URL,
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
