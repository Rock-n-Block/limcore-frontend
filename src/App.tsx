import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from 'pages';

import './styles/index.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
};
