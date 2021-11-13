import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';

import { Progress, SuccessToast } from 'components';
import { getDaysFromSeconds, getDiffBetweenStartAndEndTimes, getPercents } from 'utils';

import style from './CurrentRound.module.scss';
// import { getBalanceAmountBN } from 'utils/bigNumberFormatters';

interface ICurrentRound {
  paused?: boolean;
  stage: number;
  endTime?: number;
  soldTokens: BigNumber;
  allTokens: BigNumber;
}

interface ITimeleftProps {
  paused?: boolean;
  endTime: number;
}

const Timeleft: React.FC<ITimeleftProps> = React.memo(({ paused, endTime }) => {
  const { t } = useTranslation();

  const timeLeft = useMemo(() => getDiffBetweenStartAndEndTimes(endTime), [endTime]);

  const isRoundEnd = timeLeft <= 0;

  useEffect(() => {
    if (isRoundEnd) {
      toast(<SuccessToast text={t('round.ended')} />, {
        autoClose: false,
      });
    }
  }, [isRoundEnd, t]);

  if (isRoundEnd) {
    return <>{t('round.ended')}</>;
  }

  if (paused) {
    return <>{t('round.paused')}</>;
  }

  const daysLeft = Math.floor(getDaysFromSeconds(timeLeft));

  if (!daysLeft) {
    return <>{t('round.less than day')}</>;
  }

  return <>{t('round.text2', { days: daysLeft })}</>;
});

const CurrentRound: React.FC<ICurrentRound> = ({
  paused,
  stage,
  endTime,
  soldTokens,
  allTokens,
}) => {
  const { t } = useTranslation();

  const soldTokensAsString = useMemo(() => soldTokens.toFixed(0), [soldTokens]);
  const allTokensAsString = useMemo(() => allTokens.toFixed(0), [allTokens]);

  const { percents } = getPercents(soldTokens.toNumber(), allTokens.toNumber());

  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>№{stage}</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>{t('round.text1')}</h3>
      <div className={cn(style.text, 'text_sm')}>
        {endTime !== undefined && <Timeleft paused={paused} endTime={endTime} />}
      </div>
      <div className={style.progress}>
        <Progress disabled={paused} percent={percents.toNumber()} sectors={7} />
      </div>
      <div className={cn(style.tokens, 'text_md')}>
        {t('round.text3', { soldTokens: soldTokensAsString, allTokens: allTokensAsString })}
      </div>
    </div>
  );
};

export default CurrentRound;
