import React from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";
import theme from "../../../themes/theme";

const getHeaderNames = () => {
  const { isTablet } = useScreenSize();
  return isTablet
    ? {
        material: "Materiales",
        orderDate: "Creación",
        state: "Estado",
        responsible: "Responsable",
      }
    : {
        material: "Materiales",
        orderDate: "Fecha de Creación",
        responsible: "Responsable",
        state: "Estado",
      };
};

const OrderHeaders = () => {
  const { screenSize, isTablet } = useScreenSize();

  const columnNames = getHeaderNames();

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
      <Grid item xs={2} sm={1.2}>
        {columnNames.orderDate}
      </Grid>
      <Grid item xs={2} sm={1.4}>
        {columnNames.material}
      </Grid>
      <Grid item xs={2} sm={1.5}>
        {columnNames.state}
      </Grid>
      <Grid item xs={4} sm={1.5}>
        {columnNames.responsible}
      </Grid>
    </Grid>
  );
};

export default OrderHeaders;
