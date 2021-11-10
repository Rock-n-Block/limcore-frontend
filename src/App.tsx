import React from 'react';

import { Header } from 'containers';
import { MainPage } from 'pages';

import './styles/index.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <MainPage />
      </div>
    </div>
  );
};
