import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, FormLabel } from "@mui/material";
import ModalButtons from "../../../commons/modals/ModalButtons";
import CustomNumberInput from "../../../commons/styled-components/CustomNumberInput";
import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { useUserStore } from "../../../zustand/useAuthStore";
import IconToImage from "../../../commons/styled-components/IconImages";
import stock from "../../../public/stock.png";
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
  onStockUpdate, 
}: any) => {
  const [quantity, setQuantity] = useState(0);
const userEmailLocalStorage = localStorage.getItem("email")
const [updatedMaterial, setUpdatedMaterial] = useState(material);




  const handleStockAdjustmentConfirm = async () => {
    const userEmail = userEmailLocalStorage; 
    const amount = quantity;

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
      onStockUpdate(updatedMaterial.actual_stock);
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ pt: 3 }}
        >
          <IconToImage icon={stock} w={20} h={20} />
          <Typography sx={{ fontSize: "18px" }}>
            {adjustmentType === "add" ? "Agregar Stock" : "Remover Stock"}
          </Typography>
        </Box>

        <Box sx={{ paddingInline: 2 }}>
          <FormLabel>
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
          </FormLabel>
          <Box
  sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}
>
  <Typography sx={{ fontSize: "15px" }}>Material</Typography>
  <Typography
    sx={{
      fontSize: "15px",
      textAlign: "right",  
      whiteSpace: "pre-wrap", 
      wordWrap: "break-word", 
      maxWidth: "75%", 
    }}
  >
    {material.name}
  </Typography>
</Box>

<Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
  <Typography sx={{ fontSize: "15px" }}>Stock actual</Typography>
  <Typography
    sx={{
      fontSize: "15px",
      textAlign: "right",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      maxWidth: "60%",
    }}
  >
    {material.actual_stock}
  </Typography>
</Box>

        </Box>

        <Box>
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
