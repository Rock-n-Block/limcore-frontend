import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';

import { Progress } from 'components';
import { getPercents } from 'utils';

import style from './CurrentRound.module.scss';
// import { getBalanceAmountBN } from 'utils/bigNumberFormatters';

interface ICurrentRound {
  paused?: boolean;
  stage: number;
  days: number;
  soldTokens: BigNumber;
  allTokens: BigNumber;
}

const CurrentRound: React.FC<ICurrentRound> = ({ paused, stage, days, soldTokens, allTokens }) => {
  const { t } = useTranslation();

  const soldTokensAsString = useMemo(() => soldTokens.toFixed(0), [soldTokens]);
  const allTokensAsString = useMemo(() => allTokens.toFixed(0), [allTokens]);

  const { percents } = getPercents(soldTokens.toNumber(), allTokens.toNumber());

  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>№{stage}</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>{t('round.text1')}</h3>
      <div className={cn(style.text, 'text_sm')}>
        {paused ? t('round.paused') : t('round.text2', { days })}
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
