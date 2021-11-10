import React from 'react';
import { useTranslation } from 'react-i18next';

import shieldIcon from 'assets/img/icons/shield.svg';
import { Button } from 'components';
import { addressShortener } from 'utils/formatters';
import { useWalletConnectorContext } from 'services';

import styles from './connect-wallet-button.module.scss';

type IConnectWalletButtonProps = React.ComponentProps<typeof Button>;

const ConnectWalletButton: React.FC<IConnectWalletButtonProps> = ({ onClick, ...props }) => {
  const { address, connect } = useWalletConnectorContext();
  const { t } = useTranslation();

  const hasConnectedWallet = Boolean(address);

  return (
    <Button
      outline
      prefix={shieldIcon}
      customClassNames={{ button: styles.button, prefix: styles.icon }}
      onClick={hasConnectedWallet ? onClick : connect}
      {...props}
    >
      {hasConnectedWallet ? addressShortener(address) : t('connect trust wallet')}
    </Button>
  );
};

export default ConnectWalletButton;
