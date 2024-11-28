import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MaterialProps } from "../materialsProps";
import theme from "../../../themes/theme";
import LastActualization from "./LastActualization";

interface StockMovement {
  changeAmount: number;
  changeDate: string;
  previousStock: number;
  material: MaterialProps;
  email: string;
  id: number;
  user: any;
  sector: any;
  actualStock:number,
  message:string,
}

const StockMovemments = ({ materialId }: { materialId: number }) => {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const getLastActualization = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/stockchange/material/${materialId}`
      );
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setStockMovements(data); // Almacena todos los movimientos
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    getLastActualization();
  }, [materialId]);
console.log("stockMovements",stockMovements)


  return (
    <Box sx={{  }}>
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
          <Typography >
            Movimientos de Stock
          </Typography>
        </Box>
        <TableContainer component={Paper} sx={{ }}>
        <Table>
          <TableHead sx={{fontWeight:'bold', bgcolor:theme.palette.secondary.light}}>
            <TableRow >
              <TableCell align="center" >Indice</TableCell>
              <TableCell align="center" >Fecha del Cambio</TableCell>
              <TableCell align="center">Cantidad Actualizada</TableCell>
              <TableCell align="center">Cantidad Actual <br/>(En depósito)</TableCell>
              <TableCell align="center">Cantidad Anterior <br/>(En depósito)</TableCell>
              <TableCell align="center">Depósito</TableCell>
              <TableCell align="center">Responsable</TableCell>
              <TableCell align="center">Motivo del Cambio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockMovements.map((movement, index) => (
              <TableRow key={movement.id}
              sx={{ bgcolor: index % 2 === 0 ? "#ffffff" : "#f0f0f0" }}>
                <TableCell align="center">{index+1}</TableCell>
                <TableCell align="center">{new Date(movement.changeDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">{movement.changeAmount > 0 ? `+${movement.changeAmount}` : movement.changeAmount}</TableCell>
                <TableCell align="center">{movement.actualStock}</TableCell>
                <TableCell align="center">{movement.previousStock}</TableCell>
                <TableCell align="center">{movement.sector?.name}</TableCell>
                <TableCell align="center">{movement.user?.username || 'N/C'}</TableCell>
                <TableCell align="center">{movement.message || 'Ajuste Stock'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockMovemments;
