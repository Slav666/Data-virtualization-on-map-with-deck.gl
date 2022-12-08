import * as React from 'react';

import CITIES from '../components/map/data/cities.json';

function ControlPanel({ onSelectCity }) {
  return (
    <div className="absolute top-0 right-0 m-3">
      <h3>Camera Transition is not finished</h3>
      <hr />

      {CITIES.filter(city => city.state === 'California').map((city, index) => (
        <div key={`btn-${index}`} className="input">
          <input
            defaultChecked={city.city === 'San Francisco'}
            id={`city-${index}`}
            name="city"
            type="radio"
            onClick={() => onSelectCity(city)}
          />
          <label htmlFor={`city-${index}`}>Hello</label>
        </div>
      ))}
    </div>
  );
}
export default React.memo(ControlPanel);
