import React, { useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import ModalButtons from "../../../commons/modals/ModalButtons";
import CustomNumberInput from "../../../commons/styled-components/CustomNumberInput";
import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { useUserStore } from "../../../zustand/useAuthStore";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 400,
  bgcolor: "background.paper",
  border: "1px solid #0000001A",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const AdjustStock = ({
  isOpen,
  handleClose,
  material,
  adjustmentType,
}: any) => {
  const [quantity, setQuantity] = useState(0);
  const {email} = useUserStore()
console.log("mail", email)
  const handleStockAdjustmentConfirm = async () => {
    const userEmail = email; // Cambia por el email del usuario logueado
    const amount = quantity;

    // Determina URL en función del tipo de ajuste (agregar o remover)
    const url =
      adjustmentType === "add"
        ? `${process.env.NEXT_PUBLIC_API_BASE}/materials/${material.id}/increase-stock`
        : `${process.env.NEXT_PUBLIC_API_BASE}/materials/${material.id}/decrease-stock`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          userEmail,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al ajustar el stock");
      }

      const updatedMaterial = await response.json();
      handleClose(); // Cierra el modal
    } catch (error) {
      console.error("Error ajustando el stock:", error);
    }
  };

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyle}>
          <Typography variant="h6" align="center" sx={{m:1}}>
            {adjustmentType === "add" ? "Agregar Stock" : "Remover Stock"}
          </Typography>

        
        <Box sx={{ paddingInline: 2 }}>
          <FormLabelComponent>
            {`Ingrese la cantidad a ${
              adjustmentType === "add" ? "agregar" : "remover"
            }`}
            <CustomNumberInput
              label="Cantidad"
              value={quantity}
              onChange={(e: any) => setQuantity(Number(e.target.value))}
              fullWidth
              margin="normal"
            />
          </FormLabelComponent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
  <Typography variant="body1" fontWeight={600}>Material</Typography>
  <Typography variant="body1">{material.name}</Typography>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Typography variant="body1" fontWeight={600}>Stock actual</Typography>
  <Typography variant="body1">{material.actual_stock}</Typography>
</Box>

          </Box>



        <Box >
          <ModalButtons
            onCancel={handleClose}
            onSave={handleStockAdjustmentConfirm}
            text={adjustmentType === "add" ? "Agregar" : "Remover"}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AdjustStock;
