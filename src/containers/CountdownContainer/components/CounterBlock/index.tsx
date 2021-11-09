import React from 'react';
import cn from 'classnames';

import { OptionalClassNameProp } from 'typings';

import styles from './CounterBlock.module.scss';

export interface ICounterBlockCustomClasses {
  counter?: string;
  text?: string;
}

interface ICounterBlock extends OptionalClassNameProp {
  value: number | string;
  info: string;
  customClasses?: ICounterBlockCustomClasses;
}

const CounterBlock: React.FC<ICounterBlock> = React.memo(
  ({ className, value, info, customClasses = {} }) => {
    return (
      <div className={cn(className, styles.container)}>
        <div className={cn(customClasses.counter, styles.number, 'text_bold')}>{value}</div>
        <div className={cn(customClasses.text, styles.info, 'text_medium')}>{info}</div>
      </div>
    );
  },
);

export default CounterBlock;
