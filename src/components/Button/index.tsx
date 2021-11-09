import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button className={cn(styles.button)} type="button" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
