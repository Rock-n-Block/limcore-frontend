import React from 'react';
import Dialog from 'rc-dialog/lib';
import { IDialogPropTypes } from 'rc-dialog/lib/IDialogPropTypes';

import './Modal.scss';

import closeIcon from 'assets/img/icons/modal-close.svg';

interface IModal extends IDialogPropTypes {
  handleClose: () => void;
  isVisible: boolean;
}

const Modal: React.FC<IModal> = ({ children, handleClose, isVisible }) => {
  return (
    <Dialog
      zIndex={1000}
      destroyOnClose
      prefixCls="modal"
      closeIcon={<img src={closeIcon} alt="close" />}
      className="box"
      visible={isVisible}
      onClose={handleClose}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
