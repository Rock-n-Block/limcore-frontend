import React from 'react';
import cn from 'classnames';

import ChangeLanguage from 'components/ChangeLanguage';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { OptionalClassNameProp } from 'typings';

import styles from './HeaderRightBlock.module.scss';

const HeaderRightBlock: React.FC<OptionalClassNameProp> = ({ className }) => {
  return (
    <div className={cn(styles.container, className)}>
      <ChangeLanguage />
      <ConnectWalletButton />
    </div>
  );
};

export default HeaderRightBlock;
