import { Modal, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { ModalComponentProps } from './modal-model';
import { BorderClear } from '@mui/icons-material';

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  handleClose,
  title,
  children,
  handleSave,
  width = '500px',
  height = 'auto',
  hideActions = false,
  error
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto',
        }}
      >
        <Box
        sx={{padding: '10px'}}>

        {title && (
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
        )}

        <Box id="modal-description" sx={{ mb: 3 }}>
          {children}
        </Box>

        {!hideActions && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="outlined" sx={{color:'red'}}>
              Cancel
            </Button>
            {handleSave && (
              <Button onClick={handleSave} variant="contained">
                Save
              </Button>
            )}

          </Box>
        )}
      </Box>
        {error && <>{error}</>}
      </Box>

    </Modal>
  );
};

export default ModalComponent;
