// src/zustand/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  accessToken: string | null;
  email: string | null;
  username: string | null;
  phonenumber: string | null;
  setAccessToken: (token: string) => void;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPhoneNumber: (phonenumber: string) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: null,
      email: null,
      username: null,
      phonenumber: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setEmail: (email) => set({ email }),
      setUsername: (username) => set({ username }),
      setPhoneNumber: (phonenumber) => set({ phonenumber }),
      clearUserData: () => set({ accessToken: null, email: null, username: null, phonenumber: null }),
    }),
    {
      name: "user-storage", // Nombre clave para localStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        email: state.email,
        username: state.username,
        phonenumber: state.phonenumber,
      }), // Persistir token, email, username y phonenumber
    }
  )
);
