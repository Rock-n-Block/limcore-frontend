import React from 'react';

import { IBuyModal } from 'components/BuyModal';

const useBuyModals = () => {
  const [isApproveStart, setApproveStart] = React.useState(false);
  const [isApproveRejected, setApproveRejected] = React.useState(false);

  const [isSendStart, setSendStart] = React.useState(false);
  const [isSendRejected, setSendRejected] = React.useState(false);
  const [isSendEnd, setSendEnd] = React.useState(false);

  const handleOpenApproveStart = React.useCallback(() => {
    setApproveStart(true);
  }, []);

  const handleOpenApproveRejected = React.useCallback(() => {
    setApproveRejected(true);
  }, []);

  const handleOpenSendStart = React.useCallback(() => {
    setSendStart(true);
  }, []);

  const handleOpenSendRejected = React.useCallback(() => {
    setSendRejected(true);
  }, []);

  const handleOpenSendEnd = React.useCallback(() => {
    setSendEnd(true);
  }, []);

  const handleCloseApproveStart = React.useCallback(() => {
    setApproveStart(false);
  }, []);

  const handleCloseApproveRejected = React.useCallback(() => {
    setApproveRejected(false);
  }, []);

  const handleCloseSendStart = React.useCallback(() => {
    setSendStart(false);
  }, []);

  const handleCloseSendRejected = React.useCallback(() => {
    setSendRejected(false);
  }, []);

  const handleCloseSendEnd = React.useCallback(() => {
    setSendEnd(false);
  }, []);

  const modals: () => Array<IBuyModal> = React.useCallback(
    () => [
      {
        currentStep: 1,
        allSteps: 2,
        method: 'approve',
        status: 'pending',
        title: 'Нажмите кнопку «Approve» в расширении Метамаска',
        subtitle: (
          <>
            ERC20 tokens are deployed with functionality that allows other smart contracts to move
            tokens.
            <br /> By approving the smart contracts, it now has permission to execute the peer to
            peer swapping behavior on your behalf.
            <br /> The Spend Limit permission is the total amount of tokens that are able to move
            when using MetaMask Swap.
          </>
        ),
        isVisible: isApproveStart,
        handleClose: handleCloseApproveStart,
      },
      {
        currentStep: 1,
        allSteps: 2,
        method: 'approve',
        status: 'rejected',
        title:
          'Вы отклонили транзакцию «Approve» в расширении Metamask. Если хотите попробовать еще раз, нажмите на кнопку approve еще раз. Или закройте это окно.',
        subtitle: (
          <>
            ERC20 tokens are deployed with functionality that allows other smart contracts to move
            tokens.
            <br /> By approving the smart contracts, it now has permission to execute the peer to
            peer swapping behavior on your behalf.
            <br /> The Spend Limit permission is the total amount of tokens that are able to move
            when using MetaMask Swap.
          </>
        ),
        isVisible: isApproveRejected,
        handleClose: handleCloseApproveRejected,
        btnText: 'Approve again',
        action: handleCloseApproveRejected,
      },
      {
        currentStep: 1,
        allSteps: 2,
        method: 'Отправить',
        status: 'pending',
        title: 'Нажмите кнопку «Send» в расширении Metamask',
        subtitle: 'Your ETH will be transferred from your wallet to the contract address',
        isVisible: isSendStart,
        handleClose: handleCloseSendStart,
      },
      {
        currentStep: 1,
        allSteps: 2,
        method: 'Отправить',
        status: 'rejected',
        title:
          'Вы отклонили транзакцию «Send» в расширении Metamask. Если хотите попробовать еще раз, нажмите на кнопку «отправить снова». Или закройте это окно.',
        isVisible: isSendRejected,
        handleClose: handleCloseSendRejected,
        btnText: 'Отправить еще раз',
        action: handleCloseSendRejected,
      },
      {
        currentStep: 2,
        allSteps: 2,
        method: 'Отправить',
        status: 'confirmed',
        title: 'Отправлено',
        subtitle: 'It takes some time for transaction to get confirmed.',
        isVisible: isSendEnd,
        handleClose: handleCloseSendEnd,
      },
    ],
    [
      isApproveRejected,
      handleCloseApproveRejected,
      isApproveStart,
      handleCloseApproveStart,
      isSendStart,
      handleCloseSendStart,
      isSendRejected,
      handleCloseSendRejected,
      isSendEnd,
      handleCloseSendEnd,
    ],
  );

  return {
    modals,
    isApproveStart,
    handleOpenApproveStart,
    handleCloseApproveStart,
    isApproveRejected,
    handleOpenApproveRejected,
    handleCloseApproveRejected,
    isSendStart,
    handleOpenSendStart,
    handleCloseSendStart,
    isSendRejected,
    handleOpenSendRejected,
    handleCloseSendRejected,
    isSendEnd,
    handleOpenSendEnd,
    handleCloseSendEnd,
  };
};

export default useBuyModals;
