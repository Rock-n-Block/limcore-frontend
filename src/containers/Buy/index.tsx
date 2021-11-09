import React from 'react';
import cn from 'classnames';

import LinkImg from 'assets/img/icons/currency/limc.svg';
import UsdtImg from 'assets/img/icons/currency/usdt.svg';
import { Button, BuyInput, Currency } from 'components';

import style from './Buy.module.scss';

const Buy: React.FC = () => {
  return (
    <div className={style.buy}>
      <div className={cn(style.balance, 'text_sm')}>
        <div className={style.balance_text}>Ваш баланс LIMC</div>
        <div className={cn(style.balance_content, 'text_blue')}>3933 LIMC</div>
      </div>
      <BuyInput
        title="Отправить"
        placeholder="10"
        prefix={<Currency img={UsdtImg} symbol="USDT" />}
      />
      <BuyInput
        title="Получить LIMC"
        readonly
        prefix={<Currency img={LinkImg} symbol="limc" bg="gray" />}
      />
      <BuyInput title="Адрес получения LIMC" isNumber={false} placeholder="0x0" />
      <Button className={style.btn}>Купить</Button>
    </div>
  );
};

export default Buy;
