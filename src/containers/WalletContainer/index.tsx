import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import logoutSvg from 'assets/img/icons/logout.svg';
import { Button, CopyButton } from 'components';
import { addressShortener } from 'utils/formatters';
import { useWalletConnectorContext } from 'services';

import styles from './WalletContainer.module.scss';

const WalletContainer: React.FC = () => {
  const { t } = useTranslation();
  const { address, disconnect } = useWalletConnectorContext();
  return (
    <div className={cn(styles.container)}>
      <h2 className={cn(styles.title, 'text_blue', 'text_bold', 'text_upper')}>{t('wallet')}</h2>

      <p className={styles.subtitle}>{t('connected to trust wallet')}</p>

      <div className={styles.addressContainer}>
        <div className={cn(styles.address, 'text_semibold', 'text_md')}>
          {addressShortener(address, {
            leftCharsCount: 7,
            rightCharsCount: 7,
          })}
        </div>
        <div className={styles.copyButton}>
          <CopyButton className={cn(styles.copyButton, 'text_blue')} text={address} />
        </div>
      </div>
      <Button
        className={cn(styles.disconnectButton, 'text_medium')}
        prefix={logoutSvg}
        onClick={disconnect}
      >
        {t('disconnect')}
      </Button>
    </div>
  );
};

export default WalletContainer;
