import React from 'react';
import { useTranslation } from 'react-i18next';

import { IBuyModal } from 'components/BuyModal';
import getTxLink from 'utils/getTxLink';

const useBuyModals = (txHash: string) => {
  const { t } = useTranslation();
  const [isApproveStart, setApproveStart] = React.useState(false);
  const [isApproveRejected, setApproveRejected] = React.useState(false);

  const [isSendStart, setSendStart] = React.useState(false);
  const [isSendRejected, setSendRejected] = React.useState(false);
  const [isSendEnd, setSendEnd] = React.useState(false);

  const [isTriggerApprove, setTriggerApprove] = React.useState(false);
  const [isTriggerBuy, setTriggerBuy] = React.useState(false);

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

  const handleTriggerApprove = React.useCallback(() => {
    handleCloseApproveRejected();
    setTriggerApprove(true);
    setTimeout(() => {
      setTriggerApprove(false);
    }, 100);
  }, [handleCloseApproveRejected]);

  const handleTriggerBuy = React.useCallback(() => {
    handleCloseSendRejected();
    setTriggerBuy(true);
    setTimeout(() => {
      setTriggerBuy(false);
    }, 100);
  }, [handleCloseSendRejected]);

  const modals: () => Array<IBuyModal> = React.useCallback(
    () => [
      {
        currentStep: 1,
        allSteps: 2,
        method: t('approve'),
        status: 'pending',
        title: t('buy.modals.approve.pending.title'),
        subtitle: (
          <>
            {t('buy.modals.approve.pending.subtitle1')}
            <br />
            {t('buy.modals.approve.pending.subtitle2')}
            <br />
            {t('buy.modals.approve.pending.subtitle3')}
          </>
        ),
        isVisible: isApproveStart,
        handleClose: handleCloseApproveStart,
      },
      {
        currentStep: 1,
        allSteps: 2,
        method: t('approve'),
        status: 'rejected',
        title: t('buy.modals.approve.rejected.title'),
        subtitle: (
          <>
            {t('buy.modals.approve.pending.subtitle1')}
            <br />
            {t('buy.modals.approve.pending.subtitle2')}
            <br />
            {t('buy.modals.approve.pending.subtitle3')}
          </>
        ),
        isVisible: isApproveRejected,
        handleClose: handleCloseApproveRejected,
        btnText: t('buy.modals.approve.rejected.btn'),
        action: handleTriggerApprove,
      },
      {
        currentStep: 1,
        allSteps: 2,
        method: t('send'),
        status: 'pending',
        title: t('buy.modals.send.pending.title'),
        subtitle: t('buy.modals.send.pending.subtitle'),
        isVisible: isSendStart,
        handleClose: handleCloseSendStart,
      },
      {
        currentStep: 1,
        allSteps: 2,
        method: t('send'),
        status: 'rejected',
        title: t('buy.modals.send.rejected.title'),
        isVisible: isSendRejected,
        handleClose: handleCloseSendRejected,
        btnText: t('buy.modals.send.rejected.btn'),
        action: handleTriggerBuy,
      },
      {
        currentStep: 2,
        allSteps: 2,
        method: t('send'),
        status: 'confirmed',
        title: t('buy.modals.send.confirmed.title'),
        subtitle: t('buy.modals.send.confirmed.subtitle'),
        isVisible: isSendEnd,
        handleClose: handleCloseSendEnd,
        link: getTxLink(txHash),
        btnText: t('buy.modals.send.tx'),
      },
    ],
    [
      t,
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
      handleTriggerApprove,
      txHash,
      handleTriggerBuy,
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
    isTriggerApprove,
    isTriggerBuy,
  };
};

export default useBuyModals;
