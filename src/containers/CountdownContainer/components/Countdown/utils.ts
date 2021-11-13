import { getDaysFromSeconds } from 'utils';

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
