import React, { createContext, useContext, useState } from "react";

interface OrderFiltersProps {
  material: string;
  orderDate: string;
  responsible: string;
  state: string;
  activity:string;

  setmaterial: (value: string) => void;
  setOrderDate: (value: string) => void;
  setResponsible: (value: string) => void;
  setState: (value: string) => void;
  setActivity:  (value: string) => void;

  clearFilters: () => void;
}

const OrderFilters = createContext<OrderFiltersProps | undefined>(
  undefined
);

export const FiltersOrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [material, setmaterial] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [orderDate, setOrderDate] = useState<string>("");
  const [responsible, setResponsible] = useState<string>("");
  const [state, setState] = useState<string>("");

  const clearFilters = () => {
    setmaterial("");
    setOrderDate("");
    setState("");
    setResponsible("");
    setActivity("");
  };

  return (
    <OrderFilters.Provider
      value={{
        activity,
        material,
        orderDate,
        responsible,
        state,
        setActivity,
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
