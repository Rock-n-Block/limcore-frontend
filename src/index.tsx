import React from 'react';
import ReactDOM from 'react-dom';

import './utils/i18n';
import Connector from './services/walletConnect';

import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <Connector>
      <App />
    </Connector>
  </React.StrictMode>,
  document.getElementById('root'),
);
