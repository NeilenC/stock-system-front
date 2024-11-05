// useFilters.ts
import { useState, useEffect } from 'react';

const useFilters = (onFilter?: (filters: any) => void) => {
  const [code, setCode] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    onFilter &&
    onFilter({ code, category, description, weight, color, height, depth, stock, observations, price, width });
  }, [code, category, description, weight, color, height, depth, stock, observations, price, width, onFilter]);

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
    setWidth('');
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
    width,
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
    setWidth,
    clearFilters,
  };
};

export default useFilters;
