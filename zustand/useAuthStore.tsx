import { create } from 'zustand';

interface UserState {
  accessToken: string | null;
  email: string | null; // Agrega el campo email
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setEmail: (email: string) => void; // Método para establecer el email
  clearEmail: () => void; // Método para limpiar el email
}

export const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  email: null, // Inicializa el email en null
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  setEmail: (email) => set({ email }), // Implementa el método para establecer el email
  clearEmail: () => set({ email: null }), // Implementa el método para limpiar el email
}));
