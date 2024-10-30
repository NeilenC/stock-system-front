import { create } from 'zustand';
import { useEffect } from 'react';

interface UserState {
  accessToken: string | null;
  email: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

// Estado inicial sin acceso a localStorage
export const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  email: null,
  setAccessToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("accessToken", token);
    }
    set({ accessToken: token });
  },
  clearAccessToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("accessToken");
    }
    set({ accessToken: null });
  },
  setEmail: (email) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("email", email);
    }
    set({ email });
  },
  clearEmail: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("email");
    }
    set({ email: null });
  },
}));

// Hook para cargar el estado desde localStorage en el cliente
export const useInitializeUserStore = () => {
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setEmail = useUserStore((state) => state.setEmail);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");

    if (token) setAccessToken(token);
    if (email) setEmail(email);
  }, [setAccessToken, setEmail]);
};
