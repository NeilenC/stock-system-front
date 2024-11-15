import React from 'react';
import { Grid } from '@mui/material';
import theme from '../../../themes/theme';
import useScreenSize from '../../../hooks/useScreenSize'; // Importamos el custom hook

const TableHeader = () => {
  const { screenSize, isTablet } = useScreenSize();


  const columnNames = isTablet
    ? {
        code: 'Cód',
        category: 'Cat',
        description: 'Desc',
        weight: 'Peso',
        color: 'Color',
        height: 'Alt',
        depth: 'Prof',
        quantity: 'Cant',
        width: 'Anch',
        observations: 'Obs',
        price: 'Precio',
      }
    : {
        code: 'Código',
        category: 'Categoría',
        description: 'Descripción',
        weight: 'Peso',
        color: 'Color',
        height: 'Altura',
        depth: 'Prof.',
        quantity: 'Cant.',
        width: 'Ancho',
        observations: 'Observaciones',
        price: 'Precio',
      };

  return (
    <Grid container spacing={1} sx={{ fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.dark, paddingBottom: 1, paddingTop: 2 }}>
      <Grid item xs={2} sm={1.2}>{columnNames.code}</Grid>
      <Grid item xs={2} sm={1.2}>{columnNames.category}</Grid>
      <Grid item xs={4} sm={1.5}>{columnNames.description}</Grid>
      <Grid item xs={2} sm={1}>{columnNames.weight}</Grid>
      <Grid item xs={2} sm={1}>{columnNames.color}</Grid>
      <Grid item xs={2} sm={0.95}>{columnNames.height}</Grid>
      <Grid item xs={3} sm={0.6}>{columnNames.depth}</Grid>
      <Grid item xs={2} sm={1}>{columnNames.quantity}</Grid>
      <Grid item xs={2} sm={0.5}>{columnNames.width}</Grid>
      <Grid item xs={4} sm={1.5}>{columnNames.observations}</Grid>
      <Grid item xs={2} sm={0.5}>{columnNames.price}</Grid>
    </Grid>
  );
};

export default TableHeader;
