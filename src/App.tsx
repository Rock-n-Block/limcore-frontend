import React from 'react';
import { ToastContainer } from 'react-toastify';

import { Header } from 'containers';
import { MainPage } from 'pages';

import './styles/index.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <ToastContainer
        limit={3}
        pauseOnFocusLoss={false}
        closeButton={false}
        hideProgressBar
        position="bottom-right"
      />
      <Header />
      <div className="content">
        <MainPage />
      </div>
    </div>
  );
};
