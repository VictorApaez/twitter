"use client";
import React, { useState, createContext, ReactNode, useCallback } from "react";

export interface ModalContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  toggleModal: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export const AuthModalProvider: React.FC<ModalProviderProps> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prevState) => !prevState);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
