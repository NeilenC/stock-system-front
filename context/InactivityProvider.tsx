import { createContext, ReactNode } from 'react';
import { useInactivityLogout } from '../hooks/useInactivityLogout';
import { useRouter } from 'next/router';

const InactivityContext = createContext(null);

export const InactivityProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/'); 
  };

  // Llama al hook siempre, pero controla la lógica dentro de él
  useInactivityLogout(handleLogout, router.pathname !== '/');

  return (
    <InactivityContext.Provider value={null}>
      {children}
    </InactivityContext.Provider>
  );
};
