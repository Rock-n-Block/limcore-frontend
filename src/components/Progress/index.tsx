import React from 'react';

import style from './Progress.module.scss';

interface IProgress {
  percent: number;
  sectors?: number;
}

const Progress: React.FC<IProgress> = ({ percent, sectors }) => {
  return (
    <div className={style.progress}>
      <div className={style.progress_thumb} style={{ width: `${percent}%` }} />
      <div className={style.sectors}>
        {new Array(sectors).fill(0).map(() => (
          <div className={style.sector} />
        ))}
      </div>
    </div>
  );
};

export default Progress;
