import { createContext, ReactNode } from 'react';
import { useInactivityLogout } from '../hooks/useInactivityLogout';
import { useRouter } from 'next/router';

const InactivityContext = createContext(null);

export const InactivityProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/'); 
  };

  if (router.pathname !== '/') {
    useInactivityLogout(handleLogout);
  }

  return (
    <InactivityContext.Provider value={null}>
      {children}
    </InactivityContext.Provider>
  );
};
