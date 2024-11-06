import React from "react";
import { Box } from "@mui/material";
import CustomButton from "../buttons-commons/CustomButton";

interface ModalButtonsProps {
  onCancel?: () => void;
  onSave?: () => void;
  text: string;
  loading?: boolean;  // Nueva propiedad loading
}

const ModalButtons: React.FC<ModalButtonsProps> = ({
  onCancel,
  onSave,
  text,
  loading = false,  // Valor predeterminado en false
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: text === "Agregar" || text === "Remover" ? "16px" : " 16px 24px",
        borderTop: "1px solid #ccc",
        gap: 2,
      }}
    >
      {text && text === "Guardar Cambios" ? (
        <></>
      ) : (
        <CustomButton
          text="Cancelar"
          onClick={onCancel}
          disabled={loading}  // Deshabilitar si está en carga
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.01)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            color: "#6e6e6e",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        />
      )}
      <CustomButton
        text={text}
        onClick={onSave}
        disabled={loading}  // Deshabilitar si está en carga
        sx={{ fontSize: "16px", marginLeft: "auto" }}
      />
    </Box>
  );
};

export default ModalButtons;
