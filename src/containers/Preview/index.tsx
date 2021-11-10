import React from 'react';
import cn from 'classnames';

import HeaderRightBlock from 'containers/Header/HeaderRightBlock';

import style from './Preview.module.scss';

const Preview: React.FC = () => {
  return (
    <div className={style.preview}>
      <div className={cn(style.container, 'container')}>
        <HeaderRightBlock className={style.header} />
        <h1 className={cn(style.title, 'text_center')}>Первичное предложение токенов</h1>
      </div>
    </div>
  );
};

export default Preview;
