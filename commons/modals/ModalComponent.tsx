import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";
import { ModalComponentProps } from "./modal-model";
import CustomButton from "../buttons-commons/CustomButton";
import theme from "../../themes/theme";
import ModalButtons from "./ModalButtons";

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  handleClose,
  onSubmit,
  title,
  textButton,
  children,
  width = "700px",
  fromDelete,
  loading,
  error,
}:any) => {
  return (
    <Modal
      open={isOpen}
      // onClose={handleClose}
      onSubmit={onSubmit}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={(event, reason) => {
        if (reason === "backdropClick") {
          return; // Evitar cerrar el modal al hacer clic fuera
        }
        handleClose; // Permitir cerrar en otros casos
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        {/* Title Section */}
        {title && (
          <Box
            sx={{
              bgcolor: theme.palette.primary.dark,
              color: "white",
              padding: "15px",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              paddingInline:'24px'
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Box>
        )}

        {/* Content Section */}
        <Box  sx={{ p:3}}>
          {children}
        </Box>

        {error && <Box sx={{ color: 'red', mt: 2 }}>{error}</Box>}
        <ModalButtons
        // text="Eliminar"
        text={textButton}
        onCancel={handleClose} 
        onSave={onSubmit} 
        // loading={loading}
      />
      </Box>
    </Modal>
  );
};

export default ModalComponent;
