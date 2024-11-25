import React, { useEffect } from 'react';
import IconToImage from './styled-components/IconImages';
import cancel from '../public/close-white.png'
import { Box, Button, Typography } from '@mui/material';
interface ToastProps {
  messageLeft: string;
  messageRight: string;
  color: string;
  bgcolor: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ messageLeft, messageRight, color,bgcolor, onClose }) => {
  useEffect(() => {
    // Configura el timeout para cerrar el Toast después de 3 segundos
    const timer = setTimeout(onClose,4000);
    return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
  }, [onClose]);

  return (
    <Box
    sx={{
      backgroundColor: bgcolor,
      color: color,
      padding: '14px 16px',
      borderRadius: '5px',
      display: 'flex',
      zIndex: 9999,
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      width: '647px',
      position: 'fixed',
      top: '88px', // puedes ajustar la distancia desde el borde superior
      left: '50%',
      transform: 'translateX(-50%)', // centra horizontalmente
      textAlign: 'center',
    }}
  >
    <Typography variant='body1'>{messageLeft}</Typography>
    {messageRight != "" ? 
    <Button sx={{bgcolor:bgcolor, maxWidth:'128px', color: color}} onClick={()=> onClose()}>{messageRight}</Button> :
    <IconToImage icon={cancel} w={25} h={25} onClick={()=> onClose()}/>
    }
  </Box>
  
  );
};

export default Toast;
