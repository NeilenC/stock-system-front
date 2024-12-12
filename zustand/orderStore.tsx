import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OrderState {
  id: number;
  responsible: string;
  materials: any[];
  state: string;
  orderDate: string;
}

interface OrderStore {
  updatedOrder: OrderState | null;
  orders: OrderState[];
  setOrder: (order: any | null) => void;
  setOrders: (orders: OrderState[]) => void;
  fetchOrderById: (id: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderStore>()(
  devtools((set) => ({
    updatedOrder: null,
    orders: [],
    setOrder: (order) => set({ updatedOrder: order }),
    setOrders: (orders) => set({ orders }),
    fetchOrderById: async (id: number) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/activity-order/${id}`
        );
        const data: OrderState = await response.json();
        set({ updatedOrder: data });
      } catch (error) {
        console.error("Error fetching Order by ID:", error);
      }
    },

    fetchOrders: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/activity-order`
        );
        const data: OrderState[] = await response.json();
        set({ orders: data });
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    },
  }))
);
