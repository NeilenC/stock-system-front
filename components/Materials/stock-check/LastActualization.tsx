import { Box, Typography } from "@mui/material";
import theme from "../../../themes/theme";
import { useEffect, useState } from "react";
import { MaterialProps } from "../materialsProps";
import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";

// Define la interfaz para el tipo LastStockUpdateProps
interface LastStockUpdate {
  changeAmount: number;
  changeDate: string;
  previousStock: number;
  material: MaterialProps;
  user: {
    email: string;
    username: string;
  };
  sector: {
    name: string;
  }
}

interface LastActualizationProps {
  materialId: number;
}

const LastActualization: React.FC<LastActualizationProps> = ({
  materialId,
}) => {
  const [lastStockUpdate, setLastStockUpdate] =
    useState<LastStockUpdate | null>(null);

  const getLastActualization = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/stockchange/material/${materialId}`
      );
      const data = await response.json();
      if (response.ok && data.length > 0) {
        const lastUpdate = data.at(0); // Toma el último elemento del array
        setLastStockUpdate(lastUpdate);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    getLastActualization();
  }, [materialId]);
  console.log("lastStockUpdate", lastStockUpdate)

  return (
    <Box sx={{ display: "flex",}}>
      <Box
        sx={{
          width: 1,
          bgcolor: "#FFFF",
          borderRadius: 2,
        }}
      >
        {/* Title Section */}
        <Box
          sx={{
            bgcolor: theme.palette.primary.dark,
            color: "white",
            padding: "15px",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            paddingInline: "24px",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Ultima actualización
          </Typography>
        </Box>

        <Box sx={{ bgcolor: theme.palette.secondary.light, p: "7px 24px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            {lastStockUpdate?.material?.name}
          </Typography>
        </Box>

        <Box sx={{ p: "18px 24px" }}>
          {lastStockUpdate && (
            <Box>
              <FormLabelComponent>
                Cantidad Cambiada
                <Typography sx={{ p: 1 }}>
                  {lastStockUpdate.changeAmount}
                </Typography>
              </FormLabelComponent>
              <FormLabelComponent>
                Cantidad Anterior
                <Typography sx={{ p: 1 }}>
                  {lastStockUpdate.previousStock}
                </Typography>
              </FormLabelComponent>
              <FormLabelComponent>
                Depósito Afectado
                <Typography sx={{ p: 1 }}>
                  {lastStockUpdate.sector?.name}
                </Typography>
              </FormLabelComponent>
              <FormLabelComponent>
                Fecha del Cambio
                <Typography sx={{ p: 1 }}>
                  {new Date(lastStockUpdate.changeDate).toLocaleDateString()}
                </Typography>
              </FormLabelComponent>
            </Box>
          )}
        </Box>
        <Box sx={{ bgcolor: theme.palette.secondary.light, p: "7px 24px" }}>
          <Typography sx={{ fontSize: "18px" }}>Responsable</Typography>
        </Box>

        <Box sx={{ p: "18px 24px" }}>
          {lastStockUpdate && (
            <Box>
              <FormLabelComponent>
                Nombre de Usuario
                <Typography sx={{ p: 1 }}>
                  {lastStockUpdate.user?.username|| 'N/C'}
                </Typography>
              </FormLabelComponent>
              <FormLabelComponent>
                Email
                <Typography sx={{ p: 1 }}>
                  {lastStockUpdate.user?.email || 'N/C'} 
                </Typography>
              </FormLabelComponent>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LastActualization;
