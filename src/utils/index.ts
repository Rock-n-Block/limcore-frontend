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
