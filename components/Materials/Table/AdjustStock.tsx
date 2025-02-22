import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ModalButtons from "../../../commons/modals/ModalButtons";
import CustomNumberInput from "../../../commons/styled-components/CustomNumberInput";
import { useUserStore } from "../../../zustand/useAuthStore";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import stock from "../../../public/stock.png";
import useSectors from "../../../hooks/useSectors";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 300,
  bgcolor: "background.paper",
  border: "1px solid #0000001A",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  padding: 0.5,
};

const AdjustStock = ({
  isOpen,
  handleClose,
  material,
  updatedMaterial,
  adjustmentType,
  onStockUpdate,
}: any) => {
  const { storageSectors } = useSectors();
  const [quantity, setQuantity] = useState(0);
  const userEmailStore = useUserStore((store) => store.email);
  const [sectorId, setSectorId] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleStockAdjustmentConfirm = async () => {
    const userEmail = userEmailStore;
    const amount = quantity;
    const material_location_in_sector = sectorId;
console.log("userEmail", userEmail)
console.log("amount", amount)
console.log("material_location_in_sector", material_location_in_sector)
    const url =
      adjustmentType === "add"
        ? `${process.env.NEXT_PUBLIC_API_BASE}/materials/${material.id}/increase-stock`
        : `${process.env.NEXT_PUBLIC_API_BASE}/materials/${material.id}/decrease-stock`;

    setLoading(true); // Activamos el loading

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          userEmail,
          material_location_in_sector,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al ajustar el stock");
      }

      const updatedMaterial = await response.json();
      onStockUpdate(updatedMaterial?.actual_stock);
      handleClose(); // Cierra el modal
      setErrorMessage(''); // Limpiar mensajes de error
    } catch (error) {
      const errorMessage = (error as Error).message || "Error desconocido";
      setErrorMessage(errorMessage); // Mostrar mensaje de error
    } finally {
      setLoading(false); // Desactivamos el loading
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [material, isOpen]);

  return (
    <Modal open={isOpen || false} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ pt: 2 }}
        >
          <ImageToIcon icon={stock} w={20} h={20} />
          <Typography sx={{ fontSize: "18px", pb: 1.5 }}>
            {adjustmentType === "add" ? "Agregar Stock" : "Remover Stock"}
          </Typography>
        </Box>

        <Box sx={{ paddingInline: 2, pb: 1 }}>
          {errorMessage && (
            <Typography color="error" sx={{ mb: 2, fontSize: '13px' }}>
              {errorMessage}
            </Typography>
          )}
          <FormLabel sx={{ mb: 1 }}>
            {`Ingrese la cantidad a ${adjustmentType === "add" ? "agregar" : "remover"}`}
          </FormLabel>
          <CustomNumberInput
            label="Cantidad"
            value={quantity}
            onChange={(e: any) => setQuantity(Number(e.target.value))}
            fullWidth
            margin="normal"
          />

          <FormLabel sx={{}}>Seleccione un Depósito</FormLabel>
          <Select
            fullWidth
            value={sectorId || ''}
            sx={{ height: "47px", mt: 1.8 }}
            onChange={(event: any) => setSectorId(event.target.value)}
          >
            {storageSectors.map((sector, index) => (
              <MenuItem key={index} value={sector.id}>
                {sector.name}
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography sx={{ fontSize: "16px" }}>Material</Typography>
            <Typography
              sx={{
                fontSize: "16px",
                textAlign: "right",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                maxWidth: "75%",
              }}
            >
              {material.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 1 }}>
            <Typography sx={{ fontSize: "16px" }}>Stock actual</Typography>
            <Typography
              sx={{
                fontSize: "16px",
                textAlign: "right",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                maxWidth: "60%",
              }}
            >
              {updatedMaterial?.actual_stock}
            </Typography>
          </Box>
        </Box>

        <Box>
          <ModalButtons
            onCancel={handleClose}
            onSave={handleStockAdjustmentConfirm}
            text={adjustmentType === "add" ? "Agregar" : "Remover"}
            loading={loading} 
          />
        </Box>

        {/* Mostrar el loader mientras está cargando */}
       
      </Box>
    </Modal>
  );
};

export default AdjustStock;
