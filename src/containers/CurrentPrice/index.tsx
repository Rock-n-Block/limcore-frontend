import React from 'react';
import cn from 'classnames';

import style from './CurrentPrice.module.scss';

interface ICurrentPrice {
  price: number;
}

const CurrentPrice: React.FC<ICurrentPrice> = ({ price }) => {
  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>{price}$</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>Текущая цена LIMC</h3>
      <div className={cn(style.tokens, 'text_md')}>{1002} из 9191001 токенов продано </div>
    </div>
  );
};

export default CurrentPrice;
