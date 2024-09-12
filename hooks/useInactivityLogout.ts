import axios from 'axios';
import { useEffect, useRef } from 'react';

export const useInactivityLogout = (logoutCallback: () => void, isActive: boolean) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityLimit = 7200000; // 2 horas en milisegundos

  const startTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Configura el nuevo timeout solo si está activo
    if (isActive) {
      timeoutRef.current = setTimeout(() => {
        logoutCallback();
      }, inactivityLimit);
    }
  };

  useEffect(() => {
    if (isActive) {
      startTimeout(); // Solo inicia el timeout si la condición es activa

      // Interceptor de Axios para resetear el timeout en cada request
      const interceptorId = axios.interceptors.request.use((config) => {
        startTimeout(); // Reinicia el timeout cada vez que haya una solicitud
        return config;
      });

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Limpia el timeout al desmontar el componente
        }
        axios.interceptors.request.eject(interceptorId); // Elimina el interceptor de Axios
      };
    }
  }, [isActive, logoutCallback]); // Dependencia a isActive para ejecutar el hook solo cuando es true
};
