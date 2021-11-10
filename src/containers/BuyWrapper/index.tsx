import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { ConnectWalletButton } from 'components';
import { useWalletConnectorContext } from 'services';

import { Buy } from '..';

import style from './BuyWrapper.module.scss';

const BuyWrapper: React.FC = () => {
  const { t } = useTranslation();
  const { address } = useWalletConnectorContext();
  return (
    <div className={cn(style.wbuy, 'box_main')}>
      <h2 className={cn(style.title, 'text_blue', 'text_bold', 'text_center', 'text_upper')}>
        {t('buy.title')}
      </h2>
      {address ? (
        <Buy />
      ) : (
        <div className={style.connect}>
          <div className={cn(style.connect_text, 'text_sm', 'text_center')}>{t('buy.connect')}</div>
          <ConnectWalletButton />
        </div>
      )}
    </div>
  );
};

export default BuyWrapper;
