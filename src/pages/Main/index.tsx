import React from 'react';
import cn from 'classnames';

import { Preview, CurrentRound } from 'containers';

import style from './main.module.scss';

const Main: React.FC = () => {
  return (
    <div className={style.main}>
      <Preview />
      <div className={cn(style.container, 'container')}>
        <div className={cn(style.box_mini, style.box)}>
          <CurrentRound />
        </div>
        <div className={cn(style.box_big, style.box)}>2</div>
      </div>
    </div>
  );
};

export default Main;