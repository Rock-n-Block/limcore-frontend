import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Connector from './services/walletConnect';

import './utils/i18n';

import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Connector>
        <App />
      </Connector>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
