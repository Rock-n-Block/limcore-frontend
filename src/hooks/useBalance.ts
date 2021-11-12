import React from 'react';

import { tokenNames } from 'config';
import { useWalletConnectorContext, WalletService } from 'services';

const useBalance = (
  userAddress: string,
  contract: tokenNames.USDT | tokenNames.LIMC,
): [string, () => Promise<any>] => {
  const {
    walletService: { connectWallet },
  } = useWalletConnectorContext();

  const [balance, setBalance] = React.useState('0');

  const method = React.useMemo(() => {
    if (contract === tokenNames.LIMC) {
      return 'balanceOfSum';
    }
    return 'balanceOf';
  }, [contract]);

  const handleGetBalance = React.useCallback(async () => {
    try {
      const result = await connectWallet.Contract(contract).methods[method](userAddress).call();
      setBalance(WalletService.weiToEth(result));
    } catch (err) {
      console.log(err, 'get balance');
    }
  }, [userAddress, connectWallet, contract, method]);

  React.useEffect(() => {
    if (userAddress) {
      handleGetBalance();
    }
  }, [handleGetBalance, userAddress]);

  return [balance, handleGetBalance];
};

export default useBalance;
