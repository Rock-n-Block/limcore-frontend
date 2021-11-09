import React from 'react';
import { Button } from 'components';
import Header from 'containers/Header';

import styles from './main.module.scss';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Button />
      </div>
      <div className={styles.bg} />
    </>
  );
};

export default Main;
