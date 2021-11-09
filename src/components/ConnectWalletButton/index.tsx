import React from 'react';
import { useTranslation } from 'react-i18next';
import shieldIcon from 'assets/img/icons/shield.svg';
import { Button } from 'components';
import { addressShortener } from 'utils/formatters';

import styles from './connect-wallet-button.module.scss';

const ConnectWalletButton: React.FC = () => {
  const { t } = useTranslation();

  const userAddress = '0x51dF960Fb5BBd528cc7A8d7Ac9F124F055E50552';
  const hasConnectedWallet = Boolean(userAddress);

  return (
    <Button
      outline
      prefix={shieldIcon}
      customClassNames={{ button: styles.button, prefix: styles.icon }}
    >
      {hasConnectedWallet ? addressShortener(userAddress) : t('connect trust wallet')}
    </Button>
  );
};

export default ConnectWalletButton;
