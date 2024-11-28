import React, { createContext, useContext, useState } from "react";

interface OrderFiltersProps {
  material: string;
  orderDate: string;
  responsible: string;
  state: string;

  setmaterial: (value: string) => void;
  setOrderDate: (value: string) => void;
  setResponsible: (value: string) => void;
  setState: (value: string) => void;


  clearFilters: () => void;
}

const OrderFilters = createContext<OrderFiltersProps | undefined>(
  undefined
);

export const FiltersOrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [material, setmaterial] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const [responsible, setResponsible] = useState<string>("");
  const [state, setState] = useState<string>("");

  const clearFilters = () => {
    setmaterial("");
    setOrderDate("");
    setState("");
    setResponsible("");
  };

  return (
    <OrderFilters.Provider
      value={{
        material,
        orderDate,
        responsible,
        state,
        setmaterial,
        setOrderDate,
        setState,
        setResponsible,
        clearFilters,
      }}
    >
      {children}
    </OrderFilters.Provider>
  );
};

export const useOrderFiltersContext = () => {
  const context = useContext(OrderFilters);
  if (!context) {
    throw new Error("useOrderFiltersContext must be used within a FiltersProvider");
  }
  return context;
};
