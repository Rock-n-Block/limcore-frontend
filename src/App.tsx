import React from 'react';

import { MainPage } from 'pages';

import './styles/index.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <MainPage />
      </div>
    </div>
  );
};
