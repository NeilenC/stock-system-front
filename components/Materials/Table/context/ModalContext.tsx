// ModalContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  openModalCreate: boolean;
  handleOpenModalCreate: () => void;
  handleCloseModalCreate: () => void;
  setOpenModalCreate:  (open: boolean) => void;
}

// Asegúrate de que ModalProvider acepte children como propiedad
interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleOpenModalCreate = () => setOpenModalCreate(true);
  const handleCloseModalCreate = () => setOpenModalCreate(false);

  return (
    <ModalContext.Provider value={{ openModalCreate, handleOpenModalCreate, handleCloseModalCreate, setOpenModalCreate }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
