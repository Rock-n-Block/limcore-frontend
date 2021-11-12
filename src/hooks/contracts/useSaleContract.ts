import { useCallback } from 'react';

import { useContracts } from 'hooks';

export interface ISaleContractViewMethods {
  LIMC: () => any;
  endTime: () => any;
  owner: () => any;
  paused: () => any;
  paymentAvaliable: (address: string) => any;
  price: () => any;
  sold: () => any;
  toSell: () => any;
}

export interface ISaleContractWriteMethods {
  buy: (payment: string, amount: string, recipient: string) => any;
  pause: () => any;
  renounceOwnership: () => any;
  setEndTime: (_endTime: string) => any;
  setPrice: (_price: string) => any;
  setToSell: (_toSell: string) => any;
  startRound: (amount: string, _endTime: string, _price: string, _toSell: string) => any;
  transferOwnership: (newOwner: string) => any;
  unpause: () => any;
  withdraw: (_token: string) => any;
}

const useSaleContract = () => {
  const { getContractMethods } = useContracts();

  const contractMethods = useCallback(() => {
    return getContractMethods<ISaleContractViewMethods & ISaleContractWriteMethods>('SALE');
  }, [getContractMethods]);

  const getLimc = useCallback(
    (): Promise<string> => contractMethods()?.LIMC().call(),
    [contractMethods],
  );
  const getEndTime = useCallback(
    (): Promise<string> => contractMethods()?.endTime().call(),
    [contractMethods],
  );
  const getOwner = useCallback(
    (): Promise<string> => contractMethods()?.owner().call(),
    [contractMethods],
  );
  const getPaused = useCallback(
    (): Promise<string> => contractMethods()?.paused().call(),
    [contractMethods],
  );
  const getPaymentAvailable = useCallback(
    (address: string): Promise<string> => contractMethods()?.paymentAvaliable(address).call(),
    [contractMethods],
  );
  const getPrice = useCallback(
    (): Promise<string> => contractMethods()?.price().call(),
    [contractMethods],
  );
  const getSold = useCallback(
    (): Promise<string> => contractMethods()?.sold().call(),
    [contractMethods],
  );
  const getToSell = useCallback(
    (): Promise<string> => contractMethods()?.toSell().call(),
    [contractMethods],
  );

  return {
    contractMethods,

    getLimc,
    getEndTime,
    getOwner,
    getPaused,
    getPaymentAvailable,
    getPrice,
    getSold,
    getToSell,

    // TBD ?? а надо ли?
  };
};

export default useSaleContract;
