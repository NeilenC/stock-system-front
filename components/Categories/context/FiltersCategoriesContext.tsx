// FiltersContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FiltersContextProps {
  name:string;

  setName: (value: string) => void;
  clearFilters: () => void;
 
}

const FiltersCategoriesContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersCategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>('');


  const clearFilters = () => {
    setName('');
   
  };

  return (
    <FiltersCategoriesContext.Provider
      value={{
        name,
       
        setName,
       
        clearFilters,
      }}
    >
      {children}
    </FiltersCategoriesContext.Provider>
  );
};

export const useFiltersCategoriesContext = () => {
  const context = useContext(FiltersCategoriesContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
};
