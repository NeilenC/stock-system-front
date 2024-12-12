import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface Activity {
  activity_name: string;
  initial_date: string;
  end_date: string;
}

interface OrderFiltersProps {
  orderId: string;
  initialDate: string;
  endDate: string;
  material: string;
  orderDate: string;
  responsible: string;
  state: string;
  activity: Partial<Activity>;
  setOrderId: (value: string) => void;
  setInitialDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setmaterial: (value: string) => void;
  setOrderDate: (value: string) => void;
  setResponsible: (value: string) => void;
  setState: (value: string) => void;
  setActivity: Dispatch<SetStateAction<Partial<Activity>>>; 
  clearFilters: () => void;
}

const OrderFilters = createContext<OrderFiltersProps | undefined>(undefined);

export const FiltersOrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orderId, setOrderId] = useState<string>("");
  const [material, setmaterial] = useState<string>("");
  const [activity, setActivity] = useState<Partial<Activity>>({
    activity_name: "",
    initial_date: "",
    end_date: "",
  });
  const [orderDate, setOrderDate] = useState<string>("");
  const [responsible, setResponsible] = useState<string>("");
  const [initialDate, setInitialDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [state, setState] = useState<string>("");

  const clearFilters = () => {
    setOrderId("")
    setInitialDate("");
    setEndDate("");
    setmaterial("");
    setOrderDate("");
    setState("");
    setResponsible("");
    setActivity({
      activity_name: "",
      initial_date: "",
      end_date: "",
    });
  };

  return (
    <OrderFilters.Provider
      value={{
        orderId,
        activity,
        material,
        orderDate,
        responsible,
        state,
        initialDate,
        endDate,
        setOrderId,
        setActivity,
        setmaterial,
        setOrderDate,
        setState,
        setResponsible,
        clearFilters,
        setInitialDate,
        setEndDate,
      }}
    >
      {children}
    </OrderFilters.Provider>
  );
};

export const useOrderFiltersContext = () => {
  const context = useContext(OrderFilters);
  if (!context) {
    throw new Error(
      "useOrderFiltersContext must be used within a FiltersProvider"
    );
  }
  return context;
};
