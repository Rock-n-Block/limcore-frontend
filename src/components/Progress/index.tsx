import React from 'react';
import nextId from 'react-id-generator';

import style from './Progress.module.scss';

interface IProgress {
  percent: number;
  sectors?: number;
}

const Progress: React.FC<IProgress> = ({ percent, sectors = 0 }) => {
  return (
    <div className={style.progress}>
      <div className={style.progress_thumb} style={{ width: `${percent}%` }} />
      <div className={style.sectors}>
        {new Array(sectors).fill(0).map(() => (
          <div className={style.sector} key={nextId()} />
        ))}
      </div>
    </div>
  );
};

export default Progress;
