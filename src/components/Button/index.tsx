import React, { useMemo } from 'react';
import cn from 'classnames';

import PendingImg from 'assets/img/icons/status-pending.svg';
import { Icon } from 'components';
import { OptionalClassNameProp } from 'typings';

import styles from './Button.module.scss';

type IButtonSchemaColor = 'nostyle' | 'primary' | 'buyPrimary' | 'buySecondary';
interface IButtonProps extends OptionalClassNameProp {
  color?: IButtonSchemaColor;
  prefix?: string;
  outline?: boolean;
  loading?: boolean;
  loadingText?: string;
  customClassNames?: {
    content?: string;
    prefix?: string;
    prefixIcon?: string;
    icon?: string;
  };
}

const getColorSchema = (schemaName?: IButtonSchemaColor) => {
  switch (schemaName) {
    case 'primary': {
      return {
        button: styles.buttonPrimary,
        prefix: styles.prefixPrimary,
        content: cn(styles.contentPrimary, 'text_14', 'text_semibold'),
      };
    }
    default: {
      return {};
    }
  }
};

const Button: React.FC<
  IButtonProps &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = React.memo(
  ({
    className,
    children,
    color,
    outline,
    prefix,
    disabled = false,
    loading = false,
    loadingText,
    customClassNames = {},
    ...props
  }) => {
    const colorSchema = getColorSchema(color);

    const prefixEl = useMemo(() => {
      const isPrefixJsx = React.isValidElement(prefix);
      if (isPrefixJsx) return prefix;
      if (typeof prefix === 'string')
        return <Icon className={cn(styles.prefixIcon, customClassNames.prefixIcon)}>{prefix}</Icon>;
      return null;
    }, [prefix, customClassNames.prefixIcon]);

    return (
      <button
        className={cn(
          styles.button,
          className,
          {
            [styles.buttonOutline]: outline,
          },
          colorSchema.button,
        )}
        type="button"
        disabled={disabled || loading}
        {...props}
      >
        <>
          {prefixEl && (
            <div className={cn(styles.prefix, customClassNames.prefix, colorSchema.prefix)}>
              {prefixEl}
            </div>
          )}
          {loading && <Icon className={styles.pending}>{PendingImg}</Icon>}
          <div className={cn(styles.content, customClassNames.content, colorSchema.content)}>
            {loading ? `${loadingText || 'In progress...'}` : children}
          </div>
        </>
      </button>
    );
  },
);

export default Button;
