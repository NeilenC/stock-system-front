import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export interface FiltersOrderState {
  creation_date: string;
  activity: string;
  materials: string;
  responsible: string;
  state: string;
}

type OrderContextType = {
  order: FiltersOrderState[];
  currentOrder: FiltersOrderState[];
  addOrder: (material: FiltersOrderState) => void;
  setOrder: React.Dispatch<React.SetStateAction<FiltersOrderState[]>>;
  // addActiv: (material: FiltersOrderState) => void;
  fetchOrder: () => void;
  handleFilter: (filter: any) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  updateItemsPerPage: (items: number) => void;
};

const initialFilters = {
  materials: "",
  activity: "",
  orderDate: "",
  state: "",
  responsible: "",
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState<FiltersOrderState[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Add a function to update items per page
  const updateItemsPerPage = (items: number) => {
    setItemsPerPage(items);
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/activity-order`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const addOrder = (order: FiltersOrderState) => {
    setOrder((prevOrder) => [...prevOrder, order]);
  };

  const filteredOrder = useMemo(() => {
    let filtered = order;
    if (filters.materials) {
      filtered = filtered.filter((order) =>
        order.materials.toLowerCase().includes(filters.materials.toLowerCase())
      );
    }

    if (filters.responsible) {
      filtered = filtered.filter((order) =>
        order?.responsible
          ?.toLowerCase()
          .includes(filters.responsible.toLowerCase())
      );
    }
    if (filters.orderDate) {
      filtered = filtered.filter((order) =>
        String(order.creation_date)?.includes(filters.orderDate)
      );
    }

    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1);
    }

    return filtered;
  }, [order, filters, currentPage, itemsPerPage]);

  const currentOrder = useMemo(() => {
    return filteredOrder.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredOrder, currentPage, itemsPerPage]);

  const totalItems = filteredOrder.length;

  const handleFilter = (newFilters: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        currentOrder,
        fetchOrder,
        setOrder,
        addOrder,
        handleFilter,
        handlePageChange,
        currentPage,
        itemsPerPage,
        totalItems,
        updateItemsPerPage,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within a OrderProvider");
  return context;
};
