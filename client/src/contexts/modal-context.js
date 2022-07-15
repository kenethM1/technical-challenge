import React from 'react';

const ModalContext = React.createContext({
  showModal: false,
  showConfirmDeleteModal:false,
  closeModal: () => {},
});

export default ModalContext;
