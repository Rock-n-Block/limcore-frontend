import React from 'react';
import cn from 'classnames';

import Countdown from './components/Countdown';

import styles from './CountdownContainer.module.scss';
// interface ICountdownContainerProps {
// }

const CountdownContainer: React.FC = () => {
  const startDate = new Date();
  return (
    <div className={cn('box', styles.container)}>
      <h3 className={cn(styles.subtitle, 'text_blue text_upper')}>Анлок токенов через</h3>
      <Countdown className={styles.countdown} startDate={startDate} />
    </div>
  );
};

export default CountdownContainer;
