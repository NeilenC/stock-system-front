import React from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";
import theme from "../../../themes/theme";

// El componente OrderHeaders es ahora el lugar donde se llama al hook useScreenSize
const OrderHeaders = () => {
  const { isTablet } = useScreenSize(); // Aquí usamos el hook dentro del componente

  // Las cabeceras dependen del tamaño de la pantalla, por lo que las generamos dentro del componente
  const columnNames = isTablet
    ? {
        id: "Nro de pedido",
        initialDate: "Fecha Inicio",
        endDate: "Fecha fin",

        activity: "Evento",
        orderDate: "Creación",
        state: "Estado",
        responsible: "Responsable",
      }
    : {
        id: "Número de pedido",
        initialDate: "Fecha Inicio Evento",
        endDate: "Fecha fin Evento",

        activity: "Evento",
        orderDate: "Fecha de Creación",
        responsible: "Responsable",
        state: "Estado de la Solicitud",
      };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        fontWeight: "bold",
        textAlign: "center",
        color: theme.palette.primary.dark,
        paddingBottom: 1,
        paddingTop: 2,
      }}
    >
      <Grid item xs={2} sm={isTablet ? 1 : 1.4}>
        {columnNames.id}
      </Grid>
      <Grid item xs={2} sm={1.2}>
        {columnNames.orderDate}
      </Grid>
      

      <Grid item xs={2} sm={1.5}>
        {columnNames.activity}
      </Grid>

      <Grid item xs={2} sm={1.7}>
        {columnNames.initialDate}
      </Grid>
      <Grid item xs={2} sm={1.6}>
        {columnNames.endDate}
      </Grid>


      <Grid item xs={2} sm={1.2}>
        {columnNames.state}
      </Grid>
      <Grid item xs={4} sm={1.2}>
        {columnNames.responsible}
      </Grid>
    </Grid>
  );
};

export default OrderHeaders;
