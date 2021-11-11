import React, { useCallback, useLayoutEffect, useState } from 'react';
import cn from 'classnames';

import { LogoSvg } from 'assets/img/icons';
import Icon from 'components/Icon';

import BackButton from './BackButton';
import HeaderRightBlock from './HeaderRightBlock';

import styles from './header.module.scss';

const useHeaderIntersecting = () => {
  const [isIntersecting, changeIntersecting] = useState(false);

  const intersectingGap = 20;

  const handleScroll = useCallback(() => {
    const { scrollY } = window;
    const newIsIntersecting = scrollY > intersectingGap;

    if (newIsIntersecting !== isIntersecting) {
      changeIntersecting(newIsIntersecting);
    }
  }, [isIntersecting]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isIntersecting };
};

const Header: React.FC = () => {
  const isPrevious = true;

  const { isIntersecting } = useHeaderIntersecting();

  return (
    <header
      className={cn(styles.header, {
        [styles['header-scroll']]: isIntersecting,
      })}
    >
      <div className={cn(styles.container, 'container')}>
        <div className={styles.leftBlock}>
          {isPrevious && <BackButton className={styles.backButton} />}
          <a href="/">
            <Icon>{LogoSvg}</Icon>
          </a>
        </div>

        <HeaderRightBlock className={styles.rightBlock} />
      </div>
    </header>
  );
};

export default Header;
