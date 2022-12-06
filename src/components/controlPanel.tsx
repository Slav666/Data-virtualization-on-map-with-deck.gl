import * as React from 'react';

import CITIES from '../components/map/data/cities.json';

function ControlPanel({ onSelectCity }) {
  return (
    <div className="control-panel">
      <h3>Camera Transition</h3>
      <hr />

      {CITIES.filter(city => city.state === 'California').map((city, index) => (
        <div key={`btn-${index}`} className="input">
          <input
            type="radio"
            name="city"
            id={`city-${index}`}
            defaultChecked={city.city === 'San Francisco'}
            onClick={() => onSelectCity(city)}
          />
          <label htmlFor={`city-${index}`}>Hello</label>
        </div>
      ))}
    </div>
  );
}
export default React.memo(ControlPanel);
