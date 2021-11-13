import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import Countdown from './components/Countdown';

import styles from './CountdownContainer.module.scss';

interface ICountdownContainerProps {
  startTime?: number; // unix
  endTime: number;
}

const CountdownContainer: React.FC<ICountdownContainerProps> = React.memo(
  ({ startTime, endTime }) => {
    const { t } = useTranslation();

    const startDate = startTime ? new Date(startTime * 1e3) : new Date();

    return (
      <div className={cn('box', styles.container)}>
        <h3 className={cn(styles.subtitle, 'text_blue text_upper')}>{t('unlock.title')}</h3>
        <Countdown
          className={styles.countdown}
          startDate={startDate}
          endTime={endTime}
          disabled={endTime === 0 || startTime === 0}
        />
      </div>
    );
  },
);

export default CountdownContainer;
