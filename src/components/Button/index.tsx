import React, { useMemo } from 'react';
import cn from 'classnames';

import Icon from 'components/Icon';

import styles from './Button.module.scss';

type IButtonSchemaColor = 'primary';
interface IButtonProps {
  color?: IButtonSchemaColor;
  prefix?: string | JSX.Element;
  outline?: boolean;
  customClassNames?: {
    prefix?: string;
    prefixIcon?: string;
    icon?: string;
    button?: string;
  };
}

const getColorSchema = (schemaName: IButtonSchemaColor) => {
  switch (schemaName) {
    case 'primary':
    default: {
      return {
        button: styles.buttonPrimary,
        prefix: styles.prefixPrimary,
        content: cn(styles.contentPrimary, 'text_14', 'text_semibold'),
      };
    }
  }
};

const Button: React.FC<
  IButtonProps &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = React.memo(
  ({ children, color = 'primary', outline, prefix, customClassNames = {}, ...props }) => {
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
          customClassNames.button,
          {
            [styles.buttonOutline]: outline,
          },
          colorSchema.button,
        )}
        type="button"
        {...props}
      >
        <>
          {prefixEl && (
            <div className={cn(styles.prefix, customClassNames.prefix, colorSchema.prefix)}>
              {prefixEl}
            </div>
          )}
          <div className={cn(styles.content, colorSchema.content)}>{children}</div>
        </>
      </button>
    );
  },
);

export default Button;
