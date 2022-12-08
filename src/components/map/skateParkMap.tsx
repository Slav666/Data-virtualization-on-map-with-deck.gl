import React, { useCallback, useRef, useState } from 'react';

import { DeckGL } from '@deck.gl/react/typed';
import ReactMapGl, { MapRef, StaticMap } from 'react-map-gl';

import ControlPanel from '../controlPanel';
import 'mapbox-gl/dist/mapbox-gl.css';
import SidePanel from '../sideBar';
import { INITIAL_VIEW_STATE, MAP_BOX_TOKEN, MAP_STYLE } from './constats';
import iconLayer from './layers/icon-layer';
import { geoJsonLayer, polygonLayer } from './layers/polygon-layer-usa';
import textLayer from './layers/text-layer';

interface Props {
  longitude: number;
  latitude: number;
  layers: any[];
}
export default function SkateParkMap() {
  let [layers, setLayers] = useState([polygonLayer, geoJsonLayer, iconLayer, textLayer]);

  const refreshLayers = (newLayer: any) => {
    setLayers(newLayer);
  };

  function toggleLayer(chosenLayerId: string) {
    const newLayers = layers.map(layer => {
      return chosenLayerId === layer.id ? layer.clone({ visible: !layer.props.visible }) : layer;
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
          mapboxApiAccessToken={MAP_BOX_TOKEN}
          mapStyle={MAP_STYLE}
          viewState={INITIAL_VIEW_STATE}
          width="100%"
          height="100%"
          ref={mapRef}
        >
          <DeckGL
            controller={true}
            getTooltip={({ object }) => object && `${object.properties.NAME}\n${object.properties.PARK_ID}`}
            initialViewState={INITIAL_VIEW_STATE}
            layers={layers}
          >
            <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
            <ControlPanel onSelectCity={onSelectCity} />
          </DeckGL>
        </ReactMapGl>
      </div>
    </>
  );
}
