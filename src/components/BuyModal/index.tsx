import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { Modal, Button } from '..';

import style from './BuyModal.module.scss';

import RejectImg from 'assets/img/icons/status-reject.svg';
import ConfirmedImg from 'assets/img/icons/status-confimed.svg';
import PendingImg from 'assets/img/icons/status-pending.svg';

export interface IBuyModal {
  isVisible: boolean;
  handleClose: () => void;
  currentStep: number;
  allSteps: number;
  method: string;
  status: 'pending' | 'rejected' | 'confirmed';
  title: string;
  subtitle?: string | React.ReactElement;
  action?: () => void;
  btnText?: string;
}

const BuyModal: React.FC<IBuyModal> = ({
  isVisible,
  handleClose,
  currentStep,
  allSteps,
  method,
  status,
  title,
  subtitle,
  action,
  btnText,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isVisible={isVisible} handleClose={handleClose}>
      <div className={cn(style.head, 'h2 text_bold')}>
        <div className={cn(style.steps, 'text_blue')}>
          Шаг {currentStep} / {allSteps}
        </div>
        <div className={cn(style.method, 'text_upper')}>{method}</div>
      </div>
      <div className={style.status}>
        <div className={style.status_box}>
          {status === 'rejected' ? <img src={RejectImg} alt={t(status)} /> : null}
          {status === 'confirmed' ? <img src={ConfirmedImg} alt={t(status)} /> : null}
          {status === 'pending' ? (
            <img src={PendingImg} className={style.status_pending} alt={t(status)} />
          ) : null}
          {status === 'rejected' || status === 'pending' ? (
            <div className={cn(style.status_text, 'text_sm text_gray')}>{t(status)}</div>
          ) : null}
        </div>
      </div>
      <div className={cn(style.title, 'text_center text_blue h2 text_bold')}>{title}</div>
      {subtitle ? <div className={cn(style.subtitle, 'text_sm')}>{subtitle}</div> : null}
      {action && btnText ? (
        <Button onClick={action} className={style.btn}>
          {btnText}
        </Button>
      ) : null}
    </Modal>
  );
};

export default BuyModal;
