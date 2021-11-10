import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import HeaderRightBlock from 'containers/Header/HeaderRightBlock';

import style from './Preview.module.scss';

const Preview: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={style.preview}>
      <div className={cn(style.container, 'container')}>
        <HeaderRightBlock className={style.header} />
        <h1 className={cn(style.title, 'text_center')}>{t('preview')}</h1>
      </div>
    </div>
  );
};

export default Preview;
