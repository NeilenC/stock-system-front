import React from 'react';
import { Grid } from '@mui/material';
import theme from '../../../themes/theme';
import useScreenSize from '../../../hooks/useScreenSize'; // Importamos el custom hook

const HeaderCategories = () => {
  const { screenSize, isTablet } = useScreenSize();


  const columnNames = {
      name: 'Nombre de la Categoría',
      actions: 'Acciones',
      
      };

  return (
    <Grid container  sx={{ fontWeight: 'bold', color: theme.palette.primary.dark, p:'16px 24px', border:'1px solid #E2E8F0'}}>
      <Grid item xs={2} sm={12}>{columnNames.name}</Grid>
      
    </Grid>
  );
};

export default HeaderCategories;
