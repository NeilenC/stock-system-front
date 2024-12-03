// FiltersContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FiltersContextProps {
  code: string;
  name:string;
  category: string;
  description: string;
  weight: string;
  color: string;
  height: string;
  depth: string;
  stock: string;
  observations: string;
  price: string;
  width:string;
  setCode: (value: string) => void;
  setName: (value: string) => void;
  setCategory: (value: string) => void;
  setDescription: (value: string) => void;
  setWeight: (value: string) => void;
  setColor: (value: string) => void;
  setHeight: (value: string) => void;
  setDepth: (value: string) => void;
  setStock: (value: string) => void;
  setObservations: (value: string) => void;
  setPrice: (value: string) => void;
  setWidth: (value: string) => void;
  clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [code, setCode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [width, setWidth] = useState<string>('');

  const clearFilters = () => {
    setCode('');
    setName('');
    setCategory('');
    setDescription('');
    setWeight('');
    setColor('');
    setHeight('');
    setDepth('');
    setStock('');
    setObservations('');
    setPrice('');
    setWidth('');
  };

  return (
    <FiltersContext.Provider
      value={{
        code,
        name,
        category,
        description,
        weight,
        color,
        height,
        depth,
        stock,
        observations,
        price,
        width,
        setCode,
        setName,
        setCategory,
        setDescription,
        setWeight,
        setColor,
        setHeight,
        setDepth,
        setStock,
        setObservations,
        setPrice,
        setWidth,
        clearFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
};
