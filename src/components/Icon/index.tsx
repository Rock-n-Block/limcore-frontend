import React from 'react';
// import cn from 'classnames';
import { OptionalClassNameProp } from 'typings';

type IIconProps = OptionalClassNameProp;

const Icon: React.FC<IIconProps> = ({ className, children }) => {
  const isIconJsx = React.isValidElement(children);

  if (isIconJsx) {
    return <>{children}</>;
  }

  if (typeof children === 'string') {
    return <img className={className} src={children} alt="" />;
  }
  return null;
};

export default Icon;
