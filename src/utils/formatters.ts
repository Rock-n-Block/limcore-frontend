export const addressShortener = (
  address: string,
  config: {
    leftCharsCount?: number;
    rightCharsCount?: number;
    delimiter?: string;
  } = {},
): string => {
  const { leftCharsCount = 10, rightCharsCount = 4, delimiter = '...' } = config;

  const addressAsArray = address.split('').slice(2);
  addressAsArray.splice(
    leftCharsCount,
    addressAsArray.length - (leftCharsCount + rightCharsCount),
    delimiter,
  );
  return `0x${addressAsArray.join('')}`;
};
