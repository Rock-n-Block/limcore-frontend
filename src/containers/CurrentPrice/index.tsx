import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import style from './CurrentPrice.module.scss';

interface ICurrentPrice {
  price: number;
}

const CurrentPrice: React.FC<ICurrentPrice> = ({ price }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>{price}$</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>{t('price.text1')}</h3>
      <div className={cn(style.tokens, 'text_md')}>{t('price.text2')}</div>
    </div>
  );
};

export default CurrentPrice;
