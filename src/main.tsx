import React from 'react';

import axe from '@axe-core/react';
import ReactDOM from 'react-dom/client';

import App from './app.component';

import './i18n/i18n';

import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);

if (import.meta.env.DEV) {
  // const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

// Don't use MSW when docker running, only during local development.
if (import.meta.env.VITE_USE_MSW) {
  const { worker } = await import('~/mocks/browser');
  worker.start();
}
