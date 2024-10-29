import React from 'react';
import { Box } from '@mui/material';
import CustomButton from '../buttons-commons/CustomButton';

interface ModalButtonsProps {
  onCancel: () => void; 
  onSave: () => void;  
  text: string
}

const ModalButtons: React.FC<ModalButtonsProps> = ({ onCancel, onSave, text }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: ' 16px 24px', borderTop:'1px solid #ccc' }}>
      <CustomButton
        text="Cancelar"
        onClick={onCancel}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.01)', 
          border: '1px solid rgba(0, 0, 0, 0.1)', 
          color: '#6e6e6e', 
          padding: '8px 16px', 
          fontSize: '16px', 
          fontWeight: '500', 
          cursor: 'pointer', 
        }}
      />
      <CustomButton
        text={text}
        onClick={onSave}
          
          sx={{fontSize: '16px', }}
      />
    </Box>
  );
};

export default ModalButtons;
