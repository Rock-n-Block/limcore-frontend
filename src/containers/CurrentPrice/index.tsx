import React from 'react';
import cn from 'classnames';

import { Progress } from 'components';

import style from './CurrentPrice.module.scss';

interface ICurrentPrice {
  prop?: any;
}

const CurrentPrice: React.FC<ICurrentPrice> = () => {
  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>№1</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>Текущий раунд</h3>
      <div className={cn(style.text, 'text_sm')}>5 дней осталось</div>
      <div className={style.progress}>
        <Progress percent={50} sectors={7} />
      </div>
      <div className={cn(style.tokens, 'text_md')}>1002 из 9191001 токенов продано </div>
    </div>
  );
};

export default CurrentPrice;
