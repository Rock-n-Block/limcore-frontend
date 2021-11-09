import React from 'react';
import cn from 'classnames';

import { Progress } from 'components';

import style from './CurrentRound.module.scss';

interface ICurrentRound {
  prop?: any;
}

const CurrentRound: React.FC<ICurrentRound> = () => {
  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>№1</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>Текущий раунд</h3>
      <div className={cn(style.text, 'text_sm')}>5 дней осталось</div>
      <Progress percent={50} sectors={7} />
    </div>
  );
};

export default CurrentRound;
