import React from 'react';
import cn from 'classnames';

import style from './Preview.module.scss';

const Preview: React.FC = () => {
  return (
    <div className={style.preview}>
      <div className="container">
        <h1 className={cn(style.title, 'text_center')}>Первичное предложение токенов</h1>
      </div>
    </div>
  );
};

export default Preview;
