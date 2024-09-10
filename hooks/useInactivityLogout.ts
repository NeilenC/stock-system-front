import axios from 'axios';
import { useEffect, useRef } from 'react';

export const useInactivityLogout = (logoutCallback: () => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityLimit =  7200000;  //miliseconds

  const startTimeout = () => {
  
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Config. new timeout
    timeoutRef.current = setTimeout(() => {
      logoutCallback(); 
    }, inactivityLimit);

  };

  useEffect(() => {
    startTimeout();

    const interceptorId = axios.interceptors.request.use((config) => {
      startTimeout(); 
      return config;
    });

  
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); 
      }
      axios.interceptors.request.eject(interceptorId); 
    };
  }, []);
};
