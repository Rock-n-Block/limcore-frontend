import React from 'react';
import cn from 'classnames';

import { CurrentPrice, CurrentRound, Preview } from 'containers';
import Header from 'containers/Header';

import style from './main.module.scss';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
        <Preview />
        <div className={cn(style.container, 'container')}>
          <div className={cn(style.box_mini, style.box)}>
            <CurrentRound days={5} allTokens={9191001} soldTokens={9191001 / 2} />
            <CurrentPrice price={0.1} />
          </div>
          <div className={cn(style.box_big, style.box)}>2</div>
        </div>
      </div>
    </>
  );
};

export default Main;
