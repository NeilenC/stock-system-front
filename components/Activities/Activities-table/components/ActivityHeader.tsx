import React from 'react';
import { Grid } from '@mui/material';
import useScreenSize from '../../../../hooks/useScreenSize';
import theme from '../../../../themes/theme';

// Header names based on filters
const getHeaderNames = () => {
    const {isTablet} = useScreenSize()
  return isTablet
    ? {
        client_phone: 'Teléfono',
        client_email: 'Correo',
        activity_name: 'Nombre',
        type_activity: 'Tipo',
        state: 'Estado',
        type_of_contract: 'Contrato',
        cwa_number: 'CWA',
        responsible_name: 'Responsable',
        contact_rural: 'Rural',
        initial_date: 'Fecha Inicio',
        end_date: 'Fecha Fin'

      }
    : {
        client_phone: 'Teléfono del Cliente',
        client_email: 'Correo del Cliente',
        activity_name: 'Nombre',
        type_activity: 'Tipo de Actividad',
        state: 'Estado',
        type_of_contract: 'Tipo de Contrato',
        cwa_number: 'Número CWA',
        responsible_name: 'Responsable',
        contact_rural: 'Contacto Rural',
        initial_date: 'Fecha Inicio',
end_date: 'Fecha Fin'
      };
};

const ActivityTableHeader = () => {
  const { screenSize, isTablet } = useScreenSize();

  const columnNames = getHeaderNames();

  return (
    <Grid container spacing={1} sx={{ fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.dark, paddingBottom: 1, paddingTop: 2 }}>
      <Grid item xs={4} sm={2}>{columnNames.activity_name}</Grid>
      <Grid item xs={2} sm={1.2}>{columnNames.state}</Grid>
      <Grid item xs={2} sm={1.2}>{columnNames.type_activity}</Grid>
      <Grid item xs={2} sm={1.1}>{columnNames.cwa_number}</Grid>
      <Grid item xs={2} sm={1.2}>{columnNames.type_of_contract}</Grid>
      {/* <Grid item xs={2} sm={1.3}>{columnNames.contact_rural}</Grid> */}
      <Grid item xs={2} sm={1.3}>{columnNames.responsible_name}</Grid>
      <Grid item xs={2} sm={1.3}>{columnNames.initial_date}</Grid>
      <Grid item xs={2} sm={1.3}>{columnNames.end_date}</Grid>
    </Grid>
  );
};

export default ActivityTableHeader;
