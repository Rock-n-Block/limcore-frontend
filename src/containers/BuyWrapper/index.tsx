import React from 'react';
import cn from 'classnames';

import { useWalletConnectorContext } from 'services';
import { Button } from 'components';
import { Buy } from '..';

import style from './BuyWrapper.module.scss';

const BuyWrapper: React.FC = () => {
  const { address, connect } = useWalletConnectorContext();
  return (
    <div className={cn(style.wbuy, 'box_main')}>
      <h2 className={cn(style.title, 'text_blue', 'text_bold', 'text_center', 'text_upper')}>
        Вы покупаете LIMC токены, отправляя USDT на адрес контракта продажи
      </h2>
      {address ? (
        <Buy />
      ) : (
        <div className={style.connect}>
          <div className={cn(style.connect_text, 'text_sm', 'text_center')}>
            Подключите кошелек, чтобы купить LIMC
          </div>
          <Button onClick={connect}>connect</Button>
        </div>
      )}
    </div>
  );
};

export default BuyWrapper;
