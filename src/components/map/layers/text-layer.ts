import { TextLayer } from '@deck.gl/layers/typed';

import skateParkData from '../data/data.json';

const textLayer = new TextLayer({
  id: 'text-layer',
  data: skateParkData.features,
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

export default textLayer;
