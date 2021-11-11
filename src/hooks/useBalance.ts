import React from 'react';
import { useWalletConnectorContext, WalletService } from 'services';

const useBalance = (userAddress: string, contract: 'USDT' | 'LIMC') => {
  const {
    walletService: { connectWallet },
  } = useWalletConnectorContext();

  const [balance, setBalance] = React.useState('0');

  const handleGetBalance = React.useCallback(async () => {
    try {
      const result = await connectWallet.Contract(contract).methods.balanceOf(userAddress).call();
      setBalance(WalletService.weiToEth(result));
    } catch (err) {
      console.log(err, 'get balance');
    }
  }, [userAddress, connectWallet, contract]);

  React.useEffect(() => {
    if (userAddress) {
      handleGetBalance();
    }
  }, [handleGetBalance, userAddress]);

  return [balance, handleGetBalance];
};

export default useBalance;
