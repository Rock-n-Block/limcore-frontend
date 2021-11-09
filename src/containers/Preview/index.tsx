import React from 'react';

import style from './Preview.module.scss';

const Preview: React.FC = () => {
  return (
    <div className={style.preview}>
      <div className="container">
        <h1 className={style.title}>Первичное предложение токенов</h1>
      </div>
    </div>
  );
};

export default Preview;
