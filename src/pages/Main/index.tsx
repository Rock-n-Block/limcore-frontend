import React from 'react';
import Header from 'containers/Header';

import styles from './main.module.scss';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container} />
      <div className={styles.bg} />
    </>
  );
};

export default Main;
