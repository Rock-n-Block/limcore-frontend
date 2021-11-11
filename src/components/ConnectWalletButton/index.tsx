import React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'rc-dropdown/lib';

import shieldIcon from 'assets/img/icons/shield.svg';
import { Button } from 'components';
import WalletContainer from 'containers/WalletContainer';
import { addressShortener } from 'utils/formatters';
import { useWalletConnectorContext } from 'services';

import styles from './connect-wallet-button.module.scss';

type IConnectWalletButtonProps = React.ComponentProps<typeof Button>;

const ConnectWalletButton: React.FC<IConnectWalletButtonProps> = ({ onClick, ...props }) => {
  const { address, connect } = useWalletConnectorContext();
  const { t } = useTranslation();

  const hasConnectedWallet = Boolean(address);

  if (!hasConnectedWallet) {
    return (
      <Button
        className={styles.button}
        outline
        color="primary"
        prefix={shieldIcon}
        customClassNames={{ prefix: styles.icon }}
        onClick={connect}
        {...props}
      >
        {t('connect trust wallet')}
      </Button>
    );
  }

  return (
    <Dropdown
      trigger="click"
      overlay={
        <WalletContainer />
      }
      overlayClassName={styles.dropdownBody}
      placement="bottomRight"
    >
      <Button
        className={styles.button}
        outline
        color="primary"
        prefix={shieldIcon}
        customClassNames={{ prefix: styles.icon }}
        onClick={onClick}
        {...props}
      >
        {addressShortener(address)}
      </Button>
    </Dropdown>
  );
};

export default ConnectWalletButton;
