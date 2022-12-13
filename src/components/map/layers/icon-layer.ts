import { IconLayer } from '@deck.gl/layers/typed';

import ICON_ATLAS from '~/icons/pngegg.png';

import skateParkData from '../data/data.json';

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 526, height: 526, mask: true },
};

const onClick = (info: any) => {
  if (info.object) {
    alert(`${info.object.properties.NAME} (${info.object.properties.FACILITY})`);
  }
};
const iconLayer = new IconLayer({
  id: 'icon-layer',
  data: skateParkData.features,
  pickable: true,
  iconAtlas: ICON_ATLAS,
  iconMapping: ICON_MAPPING,
  getIcon: d => 'marker',
  onClick,
  sizeScale: 15,
  getPosition: feature => feature.geometry.coordinates,
  getSize: d => 5,
  getColor: d => [Math.sqrt(d.exits), 140, 0],
});

export default iconLayer;
