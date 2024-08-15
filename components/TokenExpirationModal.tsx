import { Button, Modal, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

const isTokenExpired = (expiresOn: any) => {
  const expirationDate = new Date(expiresOn);
  return new Date() > expirationDate;
};

const TokenExpirationModal = ({ expiresOn, onLogout, onRefresh }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired(expiresOn)) {
        setIsOpen(true);
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000 * 60); 
    return () => clearInterval(interval);
  }, [expiresOn]);

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4 
      }}>
        <h2>Sesión Expirada</h2>
        <p>Tu token ha expirado. ¿Qué deseas hacer?</p>
        <Button onClick={onLogout}>Salir</Button>
        <Button onClick={() => { setIsOpen(false); onRefresh(); }}>Renovar Sesión</Button>
      </Box>
    </Modal>
  );
};

export default TokenExpirationModal;
