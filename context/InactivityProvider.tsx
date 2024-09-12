import { createContext, ReactNode, useState } from 'react';
import { useInactivityLogout } from '../hooks/useInactivityLogout';
import { useRouter } from 'next/router';
import { useMsal } from '@azure/msal-react';

const InactivityContext = createContext(null);

export const InactivityProvider = ({ children }: { children: ReactNode }) => {
  const { instance, accounts } = useMsal();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const handleLogout = async () => {
    try {
      await instance.logoutPopup({
        postLogoutRedirectUri: '/',  // Redirige al usuario a la página principal después del logout
        account: accounts[0]         // Usa la cuenta actual para cerrar sesión
      });

      // Limpiar el token y el estado del usuario
      setUserToken(null);
      setError(null);
      localStorage.clear();  // Limpia el localStorage si es necesario
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError("Ocurrió un error al intentar cerrar sesión. Intente de nuevo.");
    }
  };

  // Llama al hook siempre, pero controla la lógica dentro de él
  useInactivityLogout(handleLogout, router.pathname !== '/');

  return (
    <InactivityContext.Provider value={null}>
      {children}
    </InactivityContext.Provider>
  );
};
