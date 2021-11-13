import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { SuccessToast } from 'components';
import { BuyWrapper, CountdownContainer, CurrentPrice, CurrentRound, Preview } from 'containers';
import ContractsAddresses from 'containers/ContractsAddresses';
import { useLimcoreContract, useSaleContract } from 'hooks';
import { Precisions } from 'typings';
import { getDaysFromSeconds, getDaysLeftUntilEndTime, toBigNumber } from 'utils';
import { getBalanceAmountBN } from 'utils/bigNumberFormatters';
import { useWalletConnectorContext } from 'services';

import style from './main.module.scss';

interface IStageData {
  currentStage?: string;
  endTimestamp?: string;
  sold?: string;
  toSell?: string;
  isPaused?: string;

  price?: string;
}

const useFetchStageData = () => {
  const { getPrice, getEndTime, getSold, getToSell, getPaused } = useSaleContract();
  const { getCurrentStage } = useLimcoreContract();

  const fetchStageData = useCallback(async () => {
    const promises = [
      getCurrentStage(),
      getEndTime(),
      getSold(),
      getToSell(),
      getPaused(),

      getPrice(),
    ];
    const settledPromises = await Promise.allSettled(promises);

    const resolvedData = settledPromises.map((item, index) => {
      const { status } = item;

      switch (status) {
        case 'rejected': {
          const { reason } = item;
          console.log(reason, `request.method.index = ${index}`);
          return undefined;
        }
        case 'fulfilled':
        default:
          return item.value;
      }
    });

    const [currentStage, endTimestamp, sold, toSell, isPaused, price] = resolvedData;
    return {
      currentStage,
      endTimestamp,
      sold,
      toSell,
      isPaused,
      price,
    } as IStageData;
  }, [getPrice, getEndTime, getSold, getToSell, getCurrentStage, getPaused]);

  return {
    fetchStageData,
  };
};

const Main: React.FC = () => {
  const { t } = useTranslation();
  const { address } = useWalletConnectorContext();
  const [currentStage, setCurrentStage] = useState<number>(-1);
  const [endTime, setEndTime] = useState(0);
  const [tokensSold, setTokensSold] = useState('0');
  const [tokensToSell, setTokensToSell] = useState('0');
  const [isPaused, setIsPaused] = useState(false);
  const [locksBuyTime, setLocksBuyTime] = useState(0);
  const { isContractsExists } = useWalletConnectorContext();

  const [price, setPrice] = useState('0');
  const [stageUnlockTime, setStageUnlockTime] = useState(0);

  const { fetchStageData } = useFetchStageData();

  useEffect(() => {
    const fetchData = async () => {
      const stageData = await fetchStageData();

      if (stageData.currentStage !== undefined) {
        setCurrentStage(Number(stageData.currentStage));
      }
      if (stageData.endTimestamp !== undefined) {
        setEndTime(Number(stageData.endTimestamp));
      }
      if (stageData.sold !== undefined) {
        setTokensSold(stageData.sold);
      }
      if (stageData.toSell !== undefined) {
        setTokensToSell(stageData.toSell);
      }
      if (stageData.isPaused !== undefined) {
        setIsPaused(JSON.parse(stageData.isPaused));
      }

      if (stageData.price !== undefined) {
        setPrice(stageData.price);
      }
    };

    if (isContractsExists) {
      fetchData();
    }
  }, [fetchStageData, isContractsExists]);

  const { getStageUnlockTime, getLocks } = useLimcoreContract();

  const fetchStageUnlockTime = useCallback(async () => {
    if (currentStage !== -1) {
      try {
        const stageUnlockTimeRaw = await getStageUnlockTime(String(currentStage));
        setStageUnlockTime(Number(stageUnlockTimeRaw));
      } catch (err) {
        console.log(err, 'getStageUnlockTime');
      }
    }
  }, [currentStage, getStageUnlockTime]);

  const fetchLocks = useCallback(async () => {
    if (currentStage !== -1 && Boolean(address)) {
      try {
        const locks = await getLocks(address, String(currentStage));
        setLocksBuyTime(Number(locks.buyTime));
      } catch (err) {
        console.log(err, 'getLocks');
      }
    }
  }, [address, currentStage, getLocks]);

  useEffect(() => {
    fetchStageUnlockTime();
  }, [fetchStageUnlockTime]);

  useEffect(() => {
    fetchLocks();
  }, [fetchLocks]);

  useEffect(() => {
    if (isPaused) {
      toast(<SuccessToast text={t('stage currently unavailable. paused')} />);
    }
  }, [isPaused, t]);

  const { daysLeft: daysLeftUntilRoundEnd } = useMemo(
    () => getDaysLeftUntilEndTime(endTime),
    [endTime],
  );

  const unlockTimeDays = useMemo(() => {
    return Number(getDaysFromSeconds(stageUnlockTime).toFixed());
  }, [stageUnlockTime]);

  const unlockEndTime = useMemo(() => {
    return locksBuyTime + stageUnlockTime;
  }, [locksBuyTime, stageUnlockTime]);

  const priceAsString = useMemo(() => {
    return getBalanceAmountBN(toBigNumber(price)).toFixed(Precisions.fiat);
  }, [price]);

  const tokensSoldBN = useMemo(() => {
    return getBalanceAmountBN(toBigNumber(tokensSold));
  }, [tokensSold]);
  const tokensToSellBN = useMemo(() => {
    return getBalanceAmountBN(toBigNumber(tokensToSell));
  }, [tokensToSell]);

  const hasConnectedWallet = useMemo(() => Boolean(address), [address]);
  const hasLockedTokens = useMemo(() => Boolean(locksBuyTime), [locksBuyTime]);

  return (
    <div className={style.main}>
      <Preview />
      <div className={cn(style.container, 'container')}>
        <div className={cn(style.box_mini, style.box)}>
          <CurrentRound
            paused={isPaused}
            stage={currentStage + 1}
            days={daysLeftUntilRoundEnd}
            soldTokens={tokensSoldBN}
            allTokens={tokensToSellBN}
          />
          <CurrentPrice price={priceAsString} unlockTimeDays={unlockTimeDays} />
          {hasConnectedWallet && hasLockedTokens && <CountdownContainer endTime={unlockEndTime} />}
        </div>
        <div className={cn(style.box_big, style.box)}>
          <BuyWrapper />
          <ContractsAddresses />
        </div>
      </div>
    </div>
  );
};

export default Main;
