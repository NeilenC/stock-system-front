import React from 'react';
import { Grid } from '@mui/material';
import theme from '../../../themes/theme';
import useScreenSize from '../../../hooks/useScreenSize'; // Importamos el custom hook

const TableHeader = () => {
  const { screenSize, isTablet } = useScreenSize();


  const columnNames = isTablet
    ? {
        code: 'Cód',
        name: 'Nom.',
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
      name: 'Nombre',
        category: 'Categoría',
        description: 'Desc.',
        weight: 'Peso',
        color: 'Color',
        height: 'Altura',
        depth: 'Prof.',
        quantity: 'Cant.',
        width: 'Ancho',
        observations: 'Obs.',
        price: 'Precio',
      };

  return (
    <Grid container spacing={1} sx={{ fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.dark, paddingBottom: 1, paddingTop: 2 }}>
      <Grid item xs={2} sm={1.5}>{columnNames.code}</Grid>
      <Grid item xs={2} sm={1}>{columnNames.name}</Grid>
      <Grid item xs={1} sm={1.3}>{columnNames.category}</Grid>
      {/* <Grid item xs={4} sm={1.5}>{columnNames.description}</Grid> */}
      <Grid item xs={2} sm={0.8}>{columnNames.weight}</Grid>
      <Grid item xs={2} sm={1}>{columnNames.color}</Grid>
      <Grid item xs={2} sm={0.95}>{columnNames.height}</Grid>
      <Grid item xs={3} sm={0.7}>{columnNames.depth}</Grid>
      <Grid item xs={2} sm={1}>{columnNames.quantity}</Grid>
      <Grid item xs={2} sm={0.5}>{columnNames.width}</Grid>
      <Grid item xs={4} sm={1.6}>{columnNames.observations}</Grid>
      <Grid item xs={2} sm={0.9}>{columnNames.price}</Grid>
    </Grid>
  );
};

export default TableHeader;
