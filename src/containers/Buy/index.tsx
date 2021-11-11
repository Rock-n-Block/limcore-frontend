import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';
import BigNumber from 'bignumber.js/bignumber';

import LinkImg from 'assets/img/icons/currency/limc.svg';
import UsdtImg from 'assets/img/icons/currency/usdt.svg';
import { Button, BuyInput, BuyModal, Currency, SuccessToast } from 'components';
import { useBuyModals, useBalance } from 'hooks';
import { useWalletConnectorContext, WalletService } from 'services';
import { tokenNames, contracts, is_production } from 'config';
import { TNullable } from 'typings';

import style from './Buy.module.scss';

const tokenLimc = {
  symbol: tokenNames.LIMC,
};
const tokenUsdt = {
  symbol: tokenNames.USDT,
};

const Buy: React.FC = () => {
  const { address, walletService } = useWalletConnectorContext();
  const { t } = useTranslation();
  const { modals, handleOpenApproveStart } = useBuyModals();

  const [limcBalance] = useBalance(address, 'LIMC');
  const [usdtBalance] = useBalance(address, 'USDT');

  const [tokenAmount, setTokenAmount] = React.useState<TNullable<number | string>>(null);
  const [receiverAddress, setReceiverAddress] = useState<number | string>();

  const [allowance, setAllowance] = React.useState(false);
  const [limcPrice, setLimcPrice] = React.useState(0);

  React.useEffect(() => {
    toast(<SuccessToast text={t('buy.success')} />);
  }, [t]);

  const handlePaste = React.useCallback(async () => {
    const clipboardContent = await navigator.clipboard.readText();
    setReceiverAddress(clipboardContent);
  }, []);

  const handleChangeTokenAmount = React.useCallback((value: string | number) => {
    setTokenAmount(value);
  }, []);

  const handleChangeReceiverAddress = React.useCallback((value: string | number) => {
    setTokenAmount(value);
  }, []);

  const handleCheckUsdtAllowance = React.useCallback(async () => {
    if (tokenAmount && address) {
      try {
        const result = await walletService.checkTokenAllowance(tokenNames.USDT, 18, +tokenAmount);
        setAllowance(result);
      } catch (err) {
        console.log(err, 'check allowance');
      }
    }
  }, [address, tokenAmount, walletService]);

  const handleApprove = React.useCallback(async () => {
    try {
      handleOpenApproveStart();
      await walletService.approveToken(
        tokenNames.USDT,
        18,
        contracts.params.SALE[is_production ? 'mainnet' : 'testnet'].address,
        address,
      );
    } catch (err) {
      console.log(err, 'approve');
    }
  }, [handleOpenApproveStart, walletService, address]);

  const handleBuy = React.useCallback(() => {
    if (allowance) {
      console.log('buy');
    } else {
      handleApprove();
    }
  }, [allowance, handleApprove]);

  const handleGetLimcPrice = React.useCallback(async () => {
    try {
      const result = await walletService.connectWallet.Contract('SALE').methods.price().call();

      setLimcPrice(+WalletService.weiToEth(result));
    } catch (err) {
      console.log(err, 'get price');
    }
  }, [walletService.connectWallet]);

  const limcAmount = React.useMemo(() => {
    if (tokenAmount && limcPrice) {
      return new BigNumber(tokenAmount).dividedBy(limcPrice).toFixed(18).toString();
    }
    return 0;
  }, [tokenAmount, limcPrice]);

  React.useEffect(() => {
    handleCheckUsdtAllowance();
  }, [handleCheckUsdtAllowance]);

  React.useEffect(() => {
    handleGetLimcPrice();
  }, [handleGetLimcPrice]);

  return (
    <div className={style.buy}>
      <div className={cn(style.balance, 'text_sm')}>
        <div className={style.balance_text}>{t('buy.balance', { currency: tokenLimc.symbol })}</div>
        <div className={cn(style.balance_content, 'text_blue')}>
          {limcBalance} {tokenLimc.symbol}
        </div>
      </div>
      <div className={cn(style.balance, 'text_sm')}>
        <div className={style.balance_text}>{t('buy.balance', { currency: tokenUsdt.symbol })}</div>
        <div className={cn(style.balance_content, 'text_blue')}>
          {usdtBalance} {tokenUsdt.symbol}
        </div>
      </div>
      <BuyInput
        title={t('buy.input1')}
        placeholder="10"
        prefix={<Currency img={UsdtImg} symbol={tokenUsdt.symbol} />}
        onChange={handleChangeTokenAmount}
        value={tokenAmount || ''}
      />
      <BuyInput
        title={t('buy.input2')}
        readonly
        prefix={<Currency img={LinkImg} symbol={tokenLimc.symbol} bg="gray" />}
        value={limcAmount}
      />
      <BuyInput
        title={t('buy.input3')}
        isNumber={false}
        placeholder="0x0"
        value={receiverAddress}
        prefix={
          <Button
            className={cn(style.pasteButton, 'text_blue', 'text_upper')}
            onClick={handlePaste}
          >
            {t('paste')}
          </Button>
        }
        onChange={handleChangeReceiverAddress}
      />
      <Button
        className={cn(style.buyButton, 'text_white', 'text_bold', 'text_upper')}
        onClick={handleBuy}
        disabled={!tokenAmount}
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
