import React from 'react';

import { Header } from 'containers';
import { MainPage } from 'pages';

import './styles/index.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <Header />

        <MainPage />
      </div>
    </div>
  );
};
