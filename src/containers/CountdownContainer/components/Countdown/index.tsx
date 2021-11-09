import React from 'react';
import cn from 'classnames';

import { OptionalClassNameProp } from 'typings';
import CounterBlock, { ICounterBlockCustomClasses } from '../CounterBlock';

import { useCountdownTimer } from 'hooks';
import { unixToDaysHoursMinutesSeconds } from './utils';

import styles from './Countdown.module.scss';

interface ICountdownCustomClasses extends ICounterBlockCustomClasses {
  counterBlock?: string;
}

interface ICountdown extends OptionalClassNameProp {
  startDate: Date;
  customClasses?: ICountdownCustomClasses;
}

const Countdown: React.FC<ICountdown> = ({ className, startDate, customClasses = {} }) => {
  const startUnixTimestamp = Math.floor(startDate.getTime() / 1e3);
  const endUnixTimestamp = Math.floor(new Date('2021-12-05T00:00:00.000Z').getTime() / 1e3); // Dec 05 2021 00:00:00

  const { secondsRemaining } = useCountdownTimer({
    startTime: startUnixTimestamp,
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
        info="дней"
        {...counterBlocksProps}
      />
      <div className="counter-block__separator">:</div>
      <CounterBlock
        className={cn(customClasses.counterBlock)}
        value={hours}
        info="часов"
        {...counterBlocksProps}
      />
      <div className="counter-block__separator">:</div>
      <CounterBlock
        className={cn(customClasses.counterBlock)}
        value={minutes}
        info="мин"
        {...counterBlocksProps}
      />
      <div className="counter-block__separator">:</div>
      <CounterBlock
        className={cn(customClasses.counterBlock)}
        value={seconds}
        info="сек"
        {...counterBlocksProps}
      />
    </div>
  );
};

export default Countdown;
