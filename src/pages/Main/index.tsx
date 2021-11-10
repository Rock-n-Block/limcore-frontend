import React from 'react';
import cn from 'classnames';

import { BuyWrapper, CountdownContainer, CurrentPrice, CurrentRound, Preview } from 'containers';
import ContractsAddresses from 'containers/ContractsAddresses';

import style from './main.module.scss';

const Main: React.FC = () => {
  return (
    <div className={style.main}>
      <Preview />
      <div className={cn(style.container, 'container')}>
        <div className={cn(style.box_mini, style.box)}>
          <CurrentRound days={5} allTokens={9191001} soldTokens={9191001 / 2} />
          <CurrentPrice price={0.1} />
          <CountdownContainer />
        </div>
        <div className={cn(style.box_big, style.box)}>
          <BuyWrapper />
          <ContractsAddresses />
        </div>
      </div>
    </div>
  );
};

export default Main;
