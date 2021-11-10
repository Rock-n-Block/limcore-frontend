import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import style from './Preview.module.scss';

const Preview: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={style.preview}>
      <div className="container">
        <h1 className={cn(style.title, 'text_center')}>{t('preview')}</h1>
      </div>
    </div>
  );
};

export default Preview;
