export const getDaysFromSeconds = (seconds: number) => {
  return seconds / 60 / 60 / 24;
};

export const getDaysLeftUntilEndTime = (endTimestamp: number) => {
  const diffBetweenStartAndEndTimes = endTimestamp - Date.now() / 1e3;
  const daysLeftRaw = Math.floor(getDaysFromSeconds(diffBetweenStartAndEndTimes));
  const daysLeft = daysLeftRaw >= 0 ? daysLeftRaw : 0;
  return {
    daysLeft,
    daysLeftRaw,
  };
};
