import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import AddressRow from './components/AddressRow';

import styles from './ContractsAddresses.module.scss';

// interface IContractsAddressesProps {}

const ContractsAddresses: React.FC = () => {
  const { t } = useTranslation();

  const information = React.useCallback(
    () => [
      {
        title: t('contracts.text1'),
        content: '0x4095309503950395039503...3485uo2225',
        isCopyable: true,
      },
      {
        title: t('contracts.text2'),
        content: '0x4095309503950395039503...3485uo2225',
        isCopyable: true,
      },
    ],
    [t],
  );
  return (
    <div className={cn(styles.container, 'box')}>
      <h3 className={cn(styles.subtitle, 'text_blue', 'text_upper')}>{t('contracts.title')}</h3>
      <ul className={styles.list}>
        {information().map(({ title, content, isCopyable }) => {
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
