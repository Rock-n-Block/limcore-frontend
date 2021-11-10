import { useEffect, useState } from 'react';

export const useCountdownTimer = ({
  startTime,
  period,
  endTime = Date.now(),
}: {
  startTime: number; // unix timestamp as seconds
  period?: number; // unix timestamp as seconds
  endTime?: number; // unix timestamp as seconds
}): {
  secondsRemaining: number | null;
} => {
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [currentSeconds, setCurrentSeconds] = useState(startTime);

  const tick = () => {
    setCurrentSeconds((prevSeconds) => prevSeconds + 1);
  };

  useEffect(() => {
    let endTimeValidated: number; // if period presented -> find endTime by period, OR use endTime
    if (period) {
      endTimeValidated = startTime + period;
    } else {
      endTimeValidated = endTime;
    }

    const secondsRemainingCalc = endTimeValidated - currentSeconds;
    const hasTimerFinished = secondsRemainingCalc > 0;
    const timerIntervalId = setTimeout(() => tick(), 1000);
    if (hasTimerFinished) {
      setSecondsRemaining(secondsRemainingCalc);
    } else {
      clearTimeout(timerIntervalId);
    }

    return () => clearTimeout(timerIntervalId);
  }, [startTime, endTime, period, currentSeconds, setSecondsRemaining]);

  return { secondsRemaining };
};
