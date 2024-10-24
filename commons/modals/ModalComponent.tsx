import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";
import { ModalComponentProps } from "./modal-model";
import CustomButton from "../buttons-commons/CustomButton";

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  handleClose,
  title,
  children,
  width = "500px",
  height = "auto",
  hideActions = false,
  error,
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
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width,
        bgcolor: "background.paper",
        boxShadow: 24,
        paddingInline: 4,
        pt:2,
        borderRadius: 2,
        overflowY: "auto",
      }}
    >
      <Box sx={{ padding: "5px",  }}>
        {title && (
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{textAlign:'center'}}
          >
            {title}
          </Typography>
        )}
  
        <Box id="modal-description" sx={{ mb: 3 }}>
          {children}
        </Box>
  
        {/* {!hideActions && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <CustomButton
              onClick={handleClose}
              sx={{ color: "black" }}
              text="Cancelar"
            />
            {handleSave && (
              <CustomButton onClick={handleSave} text="Guardar" />
            )}
          </Box>
        )} */}
      </Box>
      {error && <>{error}</>}
    </Box>
  </Modal>
  
  );
};

export default ModalComponent;
