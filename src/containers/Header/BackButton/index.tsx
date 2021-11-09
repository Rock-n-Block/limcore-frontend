import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import arrowLeftIcon from 'assets/img/icons/arrow_left.svg';
import { Button } from 'components';
import { OptionalClassNameProp } from 'typings';

import styles from './back-button.module.scss';

type IBackButtonProps = OptionalClassNameProp;

const BackButton: React.FC<IBackButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <Button
        outline
        prefix={arrowLeftIcon}
        customClassNames={{ button: className, prefix: styles.icon }}
      >
        {t('back')}
      </Button>
    </Link>
  );
};

export default BackButton;
