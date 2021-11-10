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
