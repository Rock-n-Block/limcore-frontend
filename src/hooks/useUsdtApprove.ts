import React from 'react';

import { useWalletConnectorContext } from 'services';
import { tokenNames, contracts, is_production } from 'config';
import { TNullable } from 'typings';

export default (
  address: string,
  tokenAmount: TNullable<string | number>,
  handleOpenApproveStart: () => void,
  handleCloseApproveStart: () => void,
  handleOpenApproveRejected: () => void,
  actionAfterApprove: () => void,
) => {
  const { walletService } = useWalletConnectorContext();

  const [allowance, setAllowance] = React.useState(false);
  const [isApproving, setApproving] = React.useState(false);

  const handleCheckUsdtAllowance = React.useCallback(async () => {
    if (tokenAmount && address) {
      try {
        const result = await walletService.checkTokenAllowance(
          tokenNames.USDT,
          18,
          +tokenAmount,
          contracts.params.SALE[is_production ? 'mainnet' : 'testnet'].address,
          address,
        );
        setAllowance(result);
      } catch (err) {
        console.log(err, 'check allowance');
      }
    }
  }, [address, tokenAmount, walletService]);

  const handleApprove = React.useCallback(async () => {
    try {
      setApproving(true);
      handleOpenApproveStart();
      await walletService.approveToken(
        tokenNames.USDT,
        18,
        contracts.params.SALE[is_production ? 'mainnet' : 'testnet'].address,
        address,
      );
      setAllowance(true);
      setApproving(false);
      handleCloseApproveStart();
      actionAfterApprove();
    } catch (err) {
      setApproving(false);
      handleCloseApproveStart();
      handleOpenApproveRejected();
      console.log(err, 'approve');
    }
  }, [
    handleOpenApproveStart,
    handleOpenApproveRejected,
    walletService,
    address,
    handleCloseApproveStart,
    actionAfterApprove,
  ]);

  return { allowance, handleCheckUsdtAllowance, handleApprove, isApproving };
};
