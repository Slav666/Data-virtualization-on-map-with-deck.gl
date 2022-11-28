import React, { FC, ReactElement } from 'react';

import { ArcLayer, GeoJsonLayer } from '@deck.gl/layers/typed';
import { DeckGL } from '@deck.gl/react/typed';
// import DeckGL, { ArcLayer, GeoJsonLayer } from 'deck.gl';
// import { render } from 'react-dom';
import { NavigationControl, StaticMap, _MapContext } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { Button } from '@astrosat/react-utils';

import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10,
};

const App: FC = (): ReactElement => {
  const onClick = info => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
    }
  };
  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick,
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1,
    }),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main>
        <h2>Main Content</h2>

        {/* <Button onClick={() => console.log('BUTTON CLICKED')}>
        <span>Click Me</span>
      </Button> */}
        <DeckGL
          ContextProvider={_MapContext.Provider}
          controller={true}
          initialViewState={INITIAL_VIEW_STATE}
          layers={layers}
        >
          <StaticMap mapStyle={MAP_STYLE} />
          <NavigationControl style={NAV_CONTROL_STYLE} />
        </DeckGL>
      </main>

      <Footer />
    </div>
  );
};
export default App;
