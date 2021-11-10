import React from 'react';
import cn from 'classnames';
import InputNumber from 'rc-input-number/lib';

import style from './BuyInput.module.scss';

interface IBuyInput {
  title: string;
  isNumber?: boolean;
  readonly?: boolean;
  prefix?: React.ReactElement;
  placeholder?: string;
}

const BuyInput: React.FC<IBuyInput> = ({
  title,
  isNumber = true,
  readonly = false,
  prefix,
  placeholder,
}) => {
  return (
    <div className={style.binput}>
      <div className={style.content}>
        <div className={cn(style.title, 'text_sm')}>{title}</div>
        <InputNumber
          readOnly={readonly}
          controls={false}
          placeholder={placeholder}
          type={isNumber ? 'number' : 'string'}
          className={style.input}
        />
      </div>
      {prefix}
    </div>
  );
};

export default BuyInput;
