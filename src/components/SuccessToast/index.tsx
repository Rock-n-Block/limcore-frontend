import React from 'react';
import cn from 'classnames';

import ConfirmedImg from 'assets/img/icons/status-confimed.svg';

import style from './SuccessToast.module.scss';

interface ISuccessToast {
  text: string;
}

const SuccessToast: React.FC<ISuccessToast> = ({ text }) => {
  return (
    <div className={cn(style.stoast, 'box_toast')}>
      <img className={style.img} src={ConfirmedImg} alt="" />
      <span className={cn(style.text, 'text_sm')}>{text}</span>
    </div>
  );
};

export default SuccessToast;
