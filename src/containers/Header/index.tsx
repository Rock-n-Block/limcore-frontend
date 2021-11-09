import React from 'react';

import { LogoSvg } from 'assets/img/icons';
import ChangeLanguage from 'components/ChangeLanguage';
import ConnectWalletButton from 'components/ConnectWalletButton';
import Icon from 'components/Icon';

import BackButton from './BackButton';

import styles from './header.module.scss';

const Header: React.FC = () => {
  const isPrevious = true;
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftBlock}>
          {isPrevious && <BackButton className={styles.backButton} />}
          <a href="/">
            <Icon>{LogoSvg}</Icon>
          </a>
        </div>

        <div className={styles.rightBlock}>
          <ChangeLanguage />
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
