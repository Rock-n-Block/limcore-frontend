import React from 'react';

import { MainPage } from 'pages';
import Connector from './services/walletConnect';

import './styles/index.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Connector>
        <div className="content">
          <MainPage />
        </div>
      </Connector>
    </div>
  );
};
