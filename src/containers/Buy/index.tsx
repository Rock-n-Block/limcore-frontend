import React from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import LinkImg from 'assets/img/icons/currency/limc.svg';
import UsdtImg from 'assets/img/icons/currency/usdt.svg';
import { Button, BuyInput, Currency, BuyModal, SuccessToast } from 'components';
import { useBuyModals } from 'hooks';

import style from './Buy.module.scss';

const Buy: React.FC = () => {
  const { t } = useTranslation();
  const { modals, handleOpenApproveStart } = useBuyModals();

  React.useEffect(() => {
    toast(<SuccessToast text={t('buy.success')} />);
  }, [t]);

  return (
    <div className={style.buy}>
      <div className={cn(style.balance, 'text_sm')}>
        <div className={style.balance_text}>{t('buy.balance')}</div>
        <div className={cn(style.balance_content, 'text_blue')}>3933 LIMC</div>
      </div>
      <BuyInput
        title={t('buy.input1')}
        placeholder="10"
        prefix={<Currency img={UsdtImg} symbol="USDT" />}
      />
      <BuyInput
        title={t('buy.input2')}
        readonly
        prefix={<Currency img={LinkImg} symbol="limc" bg="gray" />}
      />
      <BuyInput title={t('buy.input3')} isNumber={false} placeholder="0x0" />
      <Button className={style.btn} onClick={handleOpenApproveStart}>
        {t('buy.btn')}
      </Button>
      {modals().map((modal) => (
        <BuyModal {...modal} />
      ))}
    </div>
  );
};

export default Buy;
