import React from 'react';
import { useTranslation } from 'react-i18next';

import arrowLeftIcon from 'assets/img/icons/arrow_left.svg';
import { Button } from 'components';
import { OptionalClassNameProp } from 'typings';

import styles from './back-button.module.scss';

type IBackButtonProps = OptionalClassNameProp;

const BackButton: React.FC<IBackButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  const goBack = React.useCallback(() => {
    window.history.back();
  }, []);

  return (
    <Button
      className={className}
      outline
      color="primary"
      prefix={arrowLeftIcon}
      customClassNames={{ prefix: styles.icon }}
      onClick={goBack}
    >
      {t('back')}
    </Button>
  );
};

export default BackButton;
