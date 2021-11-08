import React from 'react';

import { Button } from 'components';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Button />
    </div>
  );
};

export default Home;
