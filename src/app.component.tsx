import React, { FC, ReactElement } from 'react';

import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';

import SkateParkMap from './components/map/skateParkMap';

const App: FC = (): ReactElement => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-row">
        <SkateParkMap />
      </main>
      <Footer />
    </div>
  );
};
export default App;
