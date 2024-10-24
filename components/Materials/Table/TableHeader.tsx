import Grid from '@mui/material/Grid'
import theme from '../../../themes/theme';


const TableHeader = () => (
  <Grid container spacing={1} sx={{ fontWeight: 'bold', textAlign: 'center', bgcolor: theme.palette.primary.main, color:theme.palette.primary.dark, paddingBlock:2 }}>
    <Grid item xs={1}>Código</Grid>
    <Grid item xs={1.5}>Categoría</Grid>
    <Grid item xs={1.5}>Descripción</Grid>
    <Grid item xs={1}>Peso</Grid>
    <Grid item xs={1}>Color</Grid>
    <Grid item xs={1}>Altura</Grid>
    <Grid item xs={1}>Produndidad</Grid>
    <Grid item xs={1}>Cantidad</Grid>
    <Grid item xs={1.5}>Observaciones</Grid>

    <Grid item xs={1}>Precio</Grid>
  </Grid>
);

export default TableHeader;
