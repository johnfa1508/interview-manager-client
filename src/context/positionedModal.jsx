/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const PositionedModalContext = createContext();

const PositionedModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);

  const openModal = (component) => {
    setModalComponent(component);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const value = {
    isOpen,
    openModal,
    closeModal,
    setModalComponent,
    modalComponent
  };

  return (
    <PositionedModalContext.Provider value={value}>{children}</PositionedModalContext.Provider>
  );
};

export { PositionedModalContext, PositionedModalProvider };
