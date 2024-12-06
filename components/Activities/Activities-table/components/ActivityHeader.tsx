import React from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../../hooks/useScreenSize";
import theme from "../../../../themes/theme";

const ActivityTableHeader = () => {
  const { isTablet } = useScreenSize();  

  const columnNames = isTablet
    ? {
        client_phone: "Teléfono",
        client_email: "Correo",
        activity_name: "Nombre",
        type_activity: "Tipo",
        state: "Estado",
        type_of_contract: "Contrato",
        sector: "Sector",
        cwa_number: "CWA",
        responsible_name: "Responsable",
        contact_rural: "Rural",
        initial_date: "Fecha Inicio",
        opening_date: "Apertura",
        closing_date: "Cierre",
        end_date: "Fecha Fin",
      }
    : {
        client_phone: "Teléfono del Cliente",
        client_email: "Correo del Cliente",
        activity_name: "Nombre",
        type_activity: "Tipo de Actividad",
        sector: "Sector",
        state: "Estado",
        type_of_contract: "Tipo de Contrato",
        cwa_number: "Número CWA",
        responsible_name: "Responsable",
        contact_rural: "Contacto Rural",
        initial_date: "Fecha Inicio/Armado",
        opening_date: "Fin Armado/Inicio Evento",
        closing_date: "Fin Evento/Inicio Desarmado",
        end_date: "Fin Desarmado",
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
      <Grid item xs={4} sm={1.5}>
        {columnNames.activity_name}
      </Grid>
      <Grid item xs={2} sm={1.5}>
        {columnNames.state}
      </Grid>
      <Grid item xs={2} sm={1.2}>
        {columnNames.type_activity}
      </Grid>
      <Grid item xs={2} sm={1.2}>
        {columnNames.sector}
      </Grid>
      <Grid item xs={2} sm={1.4}>
        {columnNames.initial_date}
      </Grid>
      <Grid item xs={2} sm={1.4}>
        {columnNames.opening_date}
      </Grid>
      <Grid item xs={2} sm={1.6}>
        {columnNames.closing_date}
      </Grid>
      <Grid item xs={2} sm={1}>
        {columnNames.end_date}
      </Grid>
    </Grid>
  );
};

export default ActivityTableHeader;
