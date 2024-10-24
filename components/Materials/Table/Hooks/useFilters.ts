// useFilters.ts
import { useState, useEffect } from 'react';

const useFilters = (onFilter: (filters: any) => void) => {
  const [code, setCode] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    onFilter({ code, category, description, weight, color, height, depth, stock, observations, price });
  }, [code, category, description, weight, color, height, depth, stock, observations, price, onFilter]);

  const clearFilters = () => {
    setCode('');
    setCategory('');
    setDescription('');
    setWeight('');
    setColor('');
    setHeight('');
    setDepth('');
    setStock('');
    setObservations('');
    setPrice('');
  };

  return {
    code,
    category,
    description,
    weight,
    color,
    height,
    depth,
    stock,
    observations,
    price,
    setCode,
    setCategory,
    setDescription,
    setWeight,
    setColor,
    setHeight,
    setDepth,
    setStock,
    setObservations,
    setPrice,
    clearFilters,
  };
};

export default useFilters;
