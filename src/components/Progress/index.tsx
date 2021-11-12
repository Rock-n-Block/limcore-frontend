import React from 'react';
import nextId from 'react-id-generator';
import cn from 'classnames';

import style from './Progress.module.scss';

interface IProgress {
  percent: number;
  sectors?: number;
  disabled?: boolean;
}

const Progress: React.FC<IProgress> = ({ percent, sectors = 0, disabled = false }) => {
  return (
    <div className={style.progress}>
      <div
        className={cn(style.progress_thumb, {
          [style.progress_thumb__disabled]: disabled,
        })}
        style={{ width: `${percent}%` }}
      />
      <div className={style.sectors}>
        {new Array(sectors).fill(0).map(() => (
          <div className={style.sector} key={nextId()} />
        ))}
      </div>
    </div>
  );
};

export default Progress;
