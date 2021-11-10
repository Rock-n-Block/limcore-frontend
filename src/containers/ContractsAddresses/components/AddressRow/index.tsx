import React from 'react';
import cn from 'classnames';

import { CopyButton } from 'components';
import { addressShortener } from 'utils/formatters';

import styles from './AddressRow.module.scss';

interface IAddressRowProps {
  title: string;
  content: string;
  isCopyable: boolean;
}

const AddressRow: React.FC<IAddressRowProps> = ({ title, content, isCopyable }) => {
  return (
    <li className={styles.container}>
      <div className={styles.primary}>
        <div className={cn(styles.title, 'text_medium')}>{title}</div>
        <div className={cn(styles.content, 'text_md', 'text_semibold')}>
          {addressShortener(content, {
            leftCharsCount: 20,
            rightCharsCount: 10,
          })}
        </div>
      </div>
      <div className={styles.secondary}>
        {isCopyable && <CopyButton className={styles.copyButton} text={content} />}
      </div>
    </li>
  );
};

export default AddressRow;
