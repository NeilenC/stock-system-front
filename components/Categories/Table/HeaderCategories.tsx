import React from 'react';
import { Grid } from '@mui/material';
import theme from '../../../themes/theme';
import useScreenSize from '../../../hooks/useScreenSize'; // Importamos el custom hook

const HeaderCategories = () => {
  const { screenSize, isTablet } = useScreenSize();


  const columnNames = {
      name: 'Nombre',
      
      };

  return (
    <Grid container spacing={1} sx={{ fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.dark, paddingBottom: 1, paddingTop: 2 }}>
      <Grid item xs={2} sm={11}>{columnNames.name}</Grid>
      
    </Grid>
  );
};

export default HeaderCategories;
