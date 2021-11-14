import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';

import LinkImg from 'assets/img/icons/currency/limc.svg';
import UsdtImg from 'assets/img/icons/currency/usdt.svg';
import { Button, BuyInput, BuyModal, Currency, SuccessToast } from 'components';
import { contracts, is_production, tokenNames } from 'config';
import { useBalance, useBuyModals, useUsdtApprove } from 'hooks';
import { TNullable } from 'typings';
import { useWalletConnectorContext, WalletService } from 'services';

import style from './Buy.module.scss';

const tokenLimc = {
  symbol: tokenNames.LIMC,
};
const tokenUsdt = {
  symbol: tokenNames.USDT,
};

interface IBuy {
  availableTokens: BigNumber;
}

const Buy: React.FC<IBuy> = ({ availableTokens }) => {
  const { address, walletService, isContractsExists } = useWalletConnectorContext();
  const { t } = useTranslation();

  const [txHash, setTxHash] = React.useState('');

  const {
    modals,
    handleOpenApproveStart,
    handleOpenApproveRejected,
    handleCloseApproveStart,
    isTriggerApprove,
    handleOpenSendStart,
    handleOpenSendEnd,
    handleOpenSendRejected,
    handleCloseSendStart,
    isTriggerBuy,
    handleCloseSendEnd,
  } = useBuyModals(txHash);

  const [limcBalance, updateLimcBalance] = useBalance(address, tokenNames.LIMC);
  const [usdtBalance, updateUsdtBalance] = useBalance(address, tokenNames.USDT);

  const [usdtAmount, setUsdtAmount] = React.useState<TNullable<number | string>>(null);
  const [limcAmount, setLimcAmount] = React.useState<TNullable<number | string>>(null);
  const [receiverAddress, setReceiverAddress] = useState<number | string>();

  const [limcPrice, setLimcPrice] = React.useState(0);

  const [isPaused, setPaused] = React.useState(true);

  const handleBuy = React.useCallback(() => {
    if (usdtAmount) {
      handleOpenSendStart();

      walletService
        .createTransaction(
          'buy',
          [
            contracts.params[tokenNames.USDT][is_production ? 'mainnet' : 'testnet'].address,
            WalletService.calcTransactionAmount(usdtAmount, 18),
            receiverAddress || address,
          ],
          'SALE',
        )
        .on('transactionHash', (hash: string) => {
          setTxHash(hash);
          handleCloseSendStart();
          handleOpenSendEnd();
        })
        .then(() => {
          updateLimcBalance();
          updateUsdtBalance();
          handleCloseSendEnd();
          toast(<SuccessToast text={t('buy.success')} />);
          setUsdtAmount(null);
          setLimcAmount(null);
        })
        .catch((err: any) => {
          handleCloseSendStart();
          handleCloseSendEnd();
          handleOpenSendRejected();
          console.log(err, 'buy');
        });
    }
  }, [
    updateLimcBalance,
    updateUsdtBalance,
    handleOpenSendStart,
    t,
    address,
    handleCloseSendStart,
    handleOpenSendEnd,
    handleOpenSendRejected,
    usdtAmount,
    receiverAddress,
    handleCloseSendEnd,
    walletService,
  ]);

  const { allowance, handleCheckUsdtAllowance, handleApprove, isApproving } = useUsdtApprove(
    address,
    usdtAmount,
    handleOpenApproveStart,
    handleCloseApproveStart,
    handleOpenApproveRejected,
    handleBuy,
  );

  const handleChangeUsdtAmount = React.useCallback(
    (value: string | number) => {
      setUsdtAmount(value);
      setLimcAmount(new BigNumber(value).dividedBy(limcPrice).toFixed(18).toString());
    },
    [limcPrice],
  );

  const handleChangeLimcAmount = React.useCallback(
    (value: string | number) => {
      setLimcAmount(value);
      setUsdtAmount(new BigNumber(value).multipliedBy(limcPrice).toFixed(18).toString());
    },
    [limcPrice],
  );

  const handleChangeReceiverAddress = React.useCallback((value: string | number) => {
    setReceiverAddress(value);
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (allowance) {
      handleBuy();
    } else {
      handleApprove();
    }
  }, [allowance, handleApprove, handleBuy]);

  const handleGetLimcPrice = React.useCallback(async () => {
    try {
      const result = await walletService.connectWallet.Contract('SALE').methods.price().call();

      setLimcPrice(+WalletService.weiToEth(result));
    } catch (err) {
      console.log(err, 'get price');
    }
  }, [walletService.connectWallet]);

  const handleGetPause = React.useCallback(async () => {
    try {
      const result = await walletService.connectWallet.Contract('SALE').methods.paused().call();
      setPaused(result);
    } catch (err) {
      console.log(err, 'get pause');
    }
  }, [walletService.connectWallet]);

  React.useEffect(() => {
    if (isTriggerApprove) {
      handleApprove();
    }
  }, [isTriggerApprove, handleApprove]);

  React.useEffect(() => {
    if (isTriggerBuy) {
      handleBuy();
    }
  }, [isTriggerBuy, handleBuy]);

  React.useEffect(() => {
    handleCheckUsdtAllowance();
  }, [handleCheckUsdtAllowance]);

  React.useEffect(() => {
    if (isContractsExists) {
      handleGetLimcPrice();
    }
  }, [handleGetLimcPrice, isContractsExists]);

  React.useEffect(() => {
    if (isContractsExists) {
      handleGetPause();
    }
  }, [handleGetPause, isContractsExists]);

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
        onChange={handleChangeUsdtAmount}
        value={usdtAmount || ''}
      />
      <BuyInput
        title={t('buy.input2')}
        prefix={<Currency img={LinkImg} symbol={tokenLimc.symbol} bg="gray" />}
        onChange={handleChangeLimcAmount}
        placeholder="10"
        value={limcAmount || ''}
      />
      <BuyInput
        title={t('buy.input3')}
        isNumber={false}
        placeholder="0x0"
        value={receiverAddress}
        onChange={handleChangeReceiverAddress}
      />
      <Button
        className={cn(style.buyButton, 'text_white', 'text_bold', 'text_upper')}
        onClick={handleSubmit}
        disabled={
          !usdtAmount ||
          !limcAmount ||
          isPaused ||
          !availableTokens.isGreaterThan(limcAmount) ||
          !new BigNumber(usdtBalance).isGreaterThan(usdtAmount)
        }
        loading={isApproving}
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
