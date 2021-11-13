import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useCountdownTimer } from 'hooks';
import { OptionalClassNameProp } from 'typings';
import { secondsToDaysHoursMinutesSeconds } from './utils';

import CounterBlock, { ICounterBlockCustomClasses } from '../CounterBlock';

import styles from './Countdown.module.scss';

interface ICountdownCustomClasses extends ICounterBlockCustomClasses {
  counterBlock?: string;
}

interface ICountdown extends OptionalClassNameProp {
  startDate: Date;
  endTime: number; // unix timestamp
  disabled?: boolean;
  customClasses?: ICountdownCustomClasses;
}

const Countdown: React.FC<ICountdown> = ({
  className,
  startDate,
  endTime,
  disabled = false,
  customClasses = {},
}) => {
  const { t } = useTranslation();
  const startUnixTimestamp = React.useMemo(
    () => Math.floor(startDate.getTime() / 1e3),
    [startDate],
  );

  const { secondsRemaining } = useCountdownTimer({
    startTime: startUnixTimestamp,
    endTime,
    disabled,
  });

  const { days, hours, minutes, seconds } = secondsToDaysHoursMinutesSeconds(secondsRemaining);
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
