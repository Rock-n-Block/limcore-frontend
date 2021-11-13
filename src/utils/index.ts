import { BigNumber } from 'bignumber.js/bignumber';

/**
 * Converts value to BigNumber. If it's `undefined` returns `new BigNumber(0)`
 *
 * If `nullable` is `true` return null when input equals to `null`
 */
export function toBigNumber(value: string | number | BigNumber | undefined): BigNumber;
export function toBigNumber(
  value: string | number | BigNumber | undefined | null,
  nullable: true,
): BigNumber | null;
export function toBigNumber(
  value: string | number | BigNumber | undefined | null,
): BigNumber | null {
  if (value === null) return null;
  if (value === undefined) return new BigNumber(0);
  if (BigNumber.isBigNumber(value)) return value;
  return new BigNumber(value);
}

export const getPercents = (
  amount: BigNumber | number | string,
  totalAmount: BigNumber | number | string,
  decimalsToRound = 0,
) => {
  const percents = toBigNumber(amount).multipliedBy(100).div(toBigNumber(totalAmount));
  const percentsRounded = percents.toFixed(decimalsToRound);
  return { percents, percentsRounded };
};

export const BIG_ZERO = new BigNumber(0);
export const BIG_TEN = new BigNumber(10);

export const unixToDaysHoursMinutesSeconds = (unixTimestamp: number | null) => {
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (unixTimestamp) {
    const date = new Date(unixTimestamp * 1e3);
    days = date.getUTCDate();
    hours = date.getUTCHours();
    minutes = date.getUTCMinutes();
    seconds = date.getUTCSeconds();
  }

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
};

export const getDaysFromSeconds = (seconds: number): number => {
  return seconds / 60 / 60 / 24;
};

export const secondsToDaysHoursMinutesSeconds = (secondsRaw: number | null) => {
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (secondsRaw) {
    days = Math.floor(getDaysFromSeconds(secondsRaw));
    const secondsAfterDaysLeft = secondsRaw - days * 60 * 60 * 24;
    hours = Math.floor(secondsAfterDaysLeft / 60 / 60);
    const secondsAfterHoursLeft = secondsAfterDaysLeft - hours * 60 * 60;
    minutes = Math.floor(secondsAfterHoursLeft / 60);
    seconds = secondsRaw % 60;
  }

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
};

/**
 * Can be negative (just timestamp1 (date.now) - timestamp2)
 */
export const getDiffBetweenStartAndEndTimes = (endTimestamp: number): number =>
  endTimestamp - Date.now() / 1e3;

export const getDaysLeftUntilEndTime = (
  endTimestamp: number,
): { daysLeft: number; daysLeftRaw: number } => {
  const diffBetweenStartAndEndTimes = getDiffBetweenStartAndEndTimes(endTimestamp);
  const daysLeftRaw = Math.floor(getDaysFromSeconds(diffBetweenStartAndEndTimes));
  const daysLeft = daysLeftRaw >= 0 ? daysLeftRaw : 0;
  return {
    daysLeft,
    daysLeftRaw,
  };
};
