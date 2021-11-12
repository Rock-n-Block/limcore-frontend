import { useCallback } from 'react';

import { IContractsNames } from 'config';
import { useWalletConnectorContext } from 'services';

const useContracts = () => {
  const { walletService } = useWalletConnectorContext();

  const getContract = useCallback(
    (contractName: IContractsNames) => {
      return walletService.connectWallet.Contract(contractName);
    },
    [walletService.connectWallet],
  );

  const getContractMethods = useCallback(
    function getContractMethods<T>(contractName: IContractsNames) {
      return getContract(contractName)?.methods as T | undefined;
    },
    [getContract],
  );

  const getContracts = useCallback(
    (contractsNames: IContractsNames[]) => {
      return contractsNames.map((contractName) => {
        return getContract(contractName);
      });
    },
    [getContract],
  );

  return { getContracts, getContract, getContractMethods };
};

export default useContracts;
