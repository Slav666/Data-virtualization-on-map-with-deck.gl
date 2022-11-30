import React, { FC, ReactElement } from 'react';

import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';

import SkateParkMap from './components/map/skateParkMap';
import HeatMap from './components/map/heatMap';
import SidePanel from './components/sidePanel';

const App: FC = (): ReactElement => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-row">
        {/* <SidePanel /> */}
        <SkateParkMap />
        {/* <HeatMap /> */}
      </main>
      <Footer />
    </div>
  );
};
export default App;
