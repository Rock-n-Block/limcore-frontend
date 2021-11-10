import React from 'react';
import cn from 'classnames';
import Tooltip from 'rc-tooltip/lib';

import { CopySvg } from 'assets/img/icons';
import { Button, Icon } from 'components';
import { useCopy } from 'hooks';
import { OptionalClassNameProp } from 'typings';

import 'rc-tooltip/assets/bootstrap.css';
import styles from './CopyButton.module.scss';

interface ICopyButtonProps extends OptionalClassNameProp {
  text: string | number;
}

const CopyButton: React.FC<ICopyButtonProps> = ({ className, text }) => {
  const { visibleCopiedTooltip, copy } = useCopy();

  const onCopy = () => {
    copy(String(text));
  };

  return (
    <Tooltip
      visible={visibleCopiedTooltip}
      // animation="zoom"
      // trigger={[]}
      // overlayStyle={{ zIndex: 1000 }}
      overlay={<span>Copied!</span>}
      placement="top"
    >
      <Button className={cn(className, styles.button)} onClick={onCopy}>
        <div className={styles.inner}>
          <Icon>{CopySvg}</Icon>
        </div>
      </Button>
    </Tooltip>
  );
};

export default CopyButton;
