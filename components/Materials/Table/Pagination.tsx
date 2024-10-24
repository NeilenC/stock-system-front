import { Pagination as MuiPagination, Grid } from '@mui/material';

const Pagination = ({ page, onPageChange }:any) => (
  <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
    <MuiPagination count={10} page={page} onChange={(e, value) => onPageChange(value)} />
  </Grid>
);

export default Pagination;
