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
  value?: number | string;
  onChange?: React.ComponentProps<typeof InputNumber>['onChange'];
}

const BuyInput: React.FC<IBuyInput> = ({
  title,
  isNumber = true,
  readonly = false,
  prefix,
  placeholder,
  value,
  onChange = () => {},
}) => {
  return (
    <div className={style.binput}>
      <div className={style.content}>
        <div className={cn(style.title, 'text_sm')}>{title}</div>
        {isNumber ? (
          <InputNumber
            className={style.input}
            value={value}
            readOnly={readonly}
            controls={false}
            placeholder={placeholder}
            type={isNumber ? 'number' : 'text'}
            onChange={onChange}
          />
        ) : (
          <input
            className={style.input}
            value={value}
            readOnly={readonly}
            placeholder={placeholder}
            type="text"
            onChange={(e: any) => {
              const val = e.target.value;
              onChange(val);
            }}
          />
        )}
      </div>
      {prefix}
    </div>
  );
};

export default BuyInput;
