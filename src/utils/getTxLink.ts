import { is_production } from 'config';

export default (hash: string) => {
  if (is_production) {
    return `https://bscscan.com/tx/${hash}`;
  }
  return `https://testnet.bscscan.com/tx/${hash}`;
};
