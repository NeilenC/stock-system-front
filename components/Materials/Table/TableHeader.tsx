import Grid from '@mui/material/Grid'
import theme from '../../../themes/theme';


const TableHeader = () => (
  <Grid container spacing={1} sx={{ fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.dark, paddingBottom: 1, paddingTop: 2 }}>
    <Grid item xs={2} sm={1.1}>Código</Grid>
    <Grid item xs={2} sm={1.2}>Categoría</Grid>
    <Grid item xs={4} sm={1.5}>Descripción</Grid>
    <Grid item xs={2} sm={1}>Peso</Grid>
    <Grid item xs={2} sm={1}>Color</Grid>
    <Grid item xs={2} sm={0.98}>Altura</Grid>
    <Grid item xs={3} sm={0.65}>Profundidad</Grid>
    <Grid item xs={2} sm={0.9}>Cantidad</Grid>
    <Grid item xs={2} sm={0.6}>Ancho</Grid>
    <Grid item xs={4} sm={1.5}>Observaciones</Grid>
    <Grid item xs={2} sm={0.8}>Precio</Grid>
  </Grid>

);

export default TableHeader;
