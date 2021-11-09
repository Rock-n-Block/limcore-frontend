import React from 'react';
import cn from 'classnames';

import styles from './button.module.scss';

const Button: React.FC = () => {
  return (
    <button className={cn(styles.button)} type="button">
      123
    </button>
  );
};

export default Button;
