import { createContext, useContext, ReactNode, useState } from 'react';
import { MaterialProps } from '../../materialsProps';
import useMaterialsFilter from '../Hooks/useMaterialsFilter';

type MaterialsContextProps = ReturnType<typeof useMaterialsFilter> | undefined;

const MaterialsContext = createContext<MaterialsContextProps>(undefined);

export const MaterialsProvider = ({
  children,
  materials,
}: {
  children: ReactNode;
  materials: MaterialProps[];
}) => {
  const materialsFilter = useMaterialsFilter(materials);
  return (
    <MaterialsContext.Provider value={materialsFilter}>
      {children}
    </MaterialsContext.Provider>
  );
};

export const useMaterialsContext = () => {
  const context = useContext(MaterialsContext);
  if (!context) {
    throw new Error("useMaterialsContext must be used within a MaterialsProvider");
  }
  return context;
};
