import React from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { Progress } from 'components';

import style from './CurrentRound.module.scss';

interface ICurrentRound {
  days: number;
  allTokens: number;
  soldTokens: number;
}

const CurrentRound: React.FC<ICurrentRound> = ({ days, allTokens, soldTokens }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>№1</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>{t('round.text1')}</h3>
      <div className={cn(style.text, 'text_sm')}>{t('round.text2', { days })}</div>
      <div className={style.progress}>
        <Progress
          percent={+new BigNumber(new BigNumber(soldTokens).multipliedBy(100)).dividedBy(allTokens)}
          sectors={7}
        />
      </div>
      <div className={cn(style.tokens, 'text_md')}>
        {t('round.text3', { allTokens, soldTokens })}
      </div>
    </div>
  );
};

export default CurrentRound;
