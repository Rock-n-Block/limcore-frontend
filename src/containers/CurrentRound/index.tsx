import React from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';

import { Progress } from 'components';

import style from './CurrentRound.module.scss';

interface ICurrentRound {
  days: number;
  allTokens: number;
  soldTokens: number;
}

const CurrentRound: React.FC<ICurrentRound> = ({ days, allTokens, soldTokens }) => {
  console.log(
    +new BigNumber(new BigNumber(soldTokens).multipliedBy(100)).dividedBy(allTokens),
    '+new BigNumber(new BigNumber(soldTokens).multipliedBy(100)).dividedBy(allTokens)',
  );
  return (
    <div className={cn(style.container, 'box')}>
      <h2 className={cn(style.title, 'text_bold')}>№1</h2>
      <h3 className={cn(style.subtitle, 'text_blue')}>Текущий раунд</h3>
      <div className={cn(style.text, 'text_sm')}>{days} дней осталось</div>
      <div className={style.progress}>
        <Progress
          percent={+new BigNumber(new BigNumber(soldTokens).multipliedBy(100)).dividedBy(allTokens)}
          sectors={7}
        />
      </div>
      <div className={cn(style.tokens, 'text_md')}>
        {soldTokens} из {allTokens} токенов продано{' '}
      </div>
    </div>
  );
};

export default CurrentRound;
