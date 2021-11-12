import { useCallback } from 'react';

import { useContracts } from 'hooks';

export interface ILimCoreContractViewMethods {
  currentStage: () => any;
  stageUnlockTime: (stageIndex: string) => any;
  locks: (address: string, stageIndex: string) => any;
}

const useLimcoreContract = () => {
  const { getContractMethods } = useContracts();

  const contractMethods = useCallback(() => {
    return getContractMethods<ILimCoreContractViewMethods>('LIMC');
  }, [getContractMethods]);

  const getCurrentStage = useCallback(
    (): Promise<string> => contractMethods()?.currentStage().call(),
    [contractMethods],
  );

  const getStageUnlockTime = useCallback(
    (stageIndex: string): Promise<string> => contractMethods()?.stageUnlockTime(stageIndex).call(),
    [contractMethods],
  );

  const getLocks = useCallback(
    (address: string, stageIndex: string): Promise<{ amount: string; buyTime: string }> =>
      contractMethods()?.locks(address, stageIndex).call(),
    [contractMethods],
  );

  return {
    contractMethods,

    getCurrentStage,
    getStageUnlockTime,
    getLocks,

    // TBD ?? а надо ли?
  };
};

export default useLimcoreContract;
