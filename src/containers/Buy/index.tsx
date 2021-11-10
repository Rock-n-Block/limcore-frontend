import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';

import LinkImg from 'assets/img/icons/currency/limc.svg';
import UsdtImg from 'assets/img/icons/currency/usdt.svg';
import { Button, BuyInput, BuyModal, Currency, SuccessToast } from 'components';
import { useBuyModals } from 'hooks';

import style from './Buy.module.scss';

const tokenLimc = {
  symbol: 'LIMC',
};
const tokenUsdt = {
  symbol: 'USDT',
};
const data = {
  balance: 3933,
};

const Buy: React.FC = () => {
  const { t } = useTranslation();
  const { modals, handleOpenApproveStart } = useBuyModals();
  const [addressToSendValue, setAddressToSendValue] = useState<number | string>();

  React.useEffect(() => {
    toast(<SuccessToast text={t('buy.success')} />);
  }, [t]);

  const handlePaste = async () => {
    const clipboardContent = await navigator.clipboard.readText();
    setAddressToSendValue(clipboardContent);
  };

  return (
    <div className={style.buy}>
      <div className={cn(style.balance, 'text_sm')}>
        <div className={style.balance_text}>{t('buy.balance')}</div>
        <div className={cn(style.balance_content, 'text_blue')}>
          {data.balance} {tokenLimc.symbol}
        </div>
      </div>
      <BuyInput
        title={t('buy.input1')}
        placeholder="10"
        prefix={<Currency img={UsdtImg} symbol={tokenUsdt.symbol} />}
      />
      <BuyInput
        title={t('buy.input2')}
        readonly
        prefix={<Currency img={LinkImg} symbol={tokenLimc.symbol} bg="gray" />}
      />
      <BuyInput
        title={t('buy.input3')}
        isNumber={false}
        placeholder="0x0"
        value={addressToSendValue}
        prefix={
          <Button
            className={cn(style.pasteButton, 'text_blue', 'text_upper')}
            onClick={handlePaste}
          >
            {t('paste')}
          </Button>
        }
        onChange={(val: string | number) => setAddressToSendValue(val)}
      />
      <Button
        className={cn(style.buyButton, 'text_white', 'text_bold', 'text_upper')}
        onClick={handleOpenApproveStart}
      >
        {t('buy.btn')}
      </Button>
      {modals().map((modal) => (
        <BuyModal key={modal.title} {...modal} />
      ))}
    </div>
  );
};

export default Buy;
