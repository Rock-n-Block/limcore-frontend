import React from 'react';
import cn from 'classnames';

import style from './Currency.module.scss';

interface ICurrency {
  img: string;
  symbol: string;
  bg?: 'gray' | 'blue';
}

const Currency: React.FC<ICurrency> = ({ img, symbol, bg = 'blue' }) => {
  return (
    <div className={cn(style.currency, style[bg])}>
      <div className={style.img}>
        <img src={img} alt="" />
      </div>
      <div
        className={cn(style.symbol, 'text_upper', {
          text_white: bg === 'blue',
          text_blue: bg === 'gray',
        })}
      >
        {symbol}
      </div>
    </div>
  );
};

export default Currency;
