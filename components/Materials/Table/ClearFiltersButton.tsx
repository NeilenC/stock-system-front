import { Button, Grid } from "@mui/material"

const CrearFilters = ({clearFilters} : {clearFilters: () => void}) => {
    return (
        <Grid item xs={1}>
        <Button variant="contained" fullWidth onClick={clearFilters}>
          Restablecer Filtros
        </Button>
      </Grid>
    )
}

export default CrearFilters;