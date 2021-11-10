import React from 'react';
import cn from 'classnames';

import AddressRow from './components/AddressRow';

import { information } from './mock';

import styles from './ContractsAddresses.module.scss';

// interface IContractsAddressesProps {}

const ContractsAddresses: React.FC = () => {
  return (
    <div className={cn(styles.container, 'box')}>
      <h3 className={cn(styles.subtitle, 'text_blue', 'text_upper')}>Адреса контрактов</h3>
      <ul className={styles.list}>
        {information.map(({ title, content, isCopyable }) => {
          return (
            <AddressRow
              key={title + content}
              title={title}
              content={content}
              isCopyable={isCopyable}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ContractsAddresses;
