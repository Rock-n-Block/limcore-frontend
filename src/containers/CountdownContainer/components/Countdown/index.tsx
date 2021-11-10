import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useCountdownTimer } from 'hooks';
import { OptionalClassNameProp } from 'typings';
import { unixToDaysHoursMinutesSeconds } from './utils';

import CounterBlock, { ICounterBlockCustomClasses } from '../CounterBlock';

import styles from './Countdown.module.scss';

interface ICountdownCustomClasses extends ICounterBlockCustomClasses {
  counterBlock?: string;
}

interface ICountdown extends OptionalClassNameProp {
  startDate: Date;
  customClasses?: ICountdownCustomClasses;
}

const Countdown: React.FC<ICountdown> = ({ className, startDate, customClasses = {} }) => {
  const { t } = useTranslation();
  const startUnixTimestamp = React.useCallback(
    () => Math.floor(startDate.getTime() / 1e3),
    [startDate],
  );
  const endUnixTimestamp = Math.floor(new Date('2021-12-05T00:00:00.000Z').getTime() / 1e3); // Dec 05 2021 00:00:00

  const { secondsRemaining } = useCountdownTimer({
    startTime: startUnixTimestamp(),
    endTime: endUnixTimestamp,
  });

  const { days, hours, minutes, seconds } = unixToDaysHoursMinutesSeconds(secondsRemaining);
  const counterBlocksProps = {
    customClasses: {
      counter: customClasses.counter,
      text: customClasses.text,
    },
  };
  return (
    <div className={cn(className, styles.container)}>
      <CounterBlock
        className={cn(customClasses.counterBlock)}
        value={days}
        info={t('unlock.days_short')}
        {...counterBlocksProps}
      />
      <div className="counter-block__separator">:</div>
      <CounterBlock
        className={cn(customClasses.counterBlock)}
        value={hours}
        info={t('unlock.hours_short')}
        {...counterBlocksProps}
      />
      <div className="counter-block__separator">:</div>
      <CounterBlock
        className={cn(customClasses.counterBlock)}
        value={minutes}
        info={t('unlock.min_short')}
        {...counterBlocksProps}
      />
      <div className="counter-block__separator">:</div>
      <CounterBlock
        className={cn(customClasses.counterBlock)}
        value={seconds}
        info={t('unlock.sec_short')}
        {...counterBlocksProps}
      />
    </div>
  );
};

export default Countdown;
