import { Grid, Typography } from "@mui/material"

const SectorDetails = ({sector}: any) => {
  console.log("SECTOR ACA", sector)
return (    <Grid container spacing={4}>
    <Grid item xs={6} md={6}>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ fontWeight: 600 }}
      >
        Nombre
      </Typography>
      <Typography>{sector.name}</Typography>
    </Grid>
    <Grid item xs={6} md={6}>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ fontWeight: 600 }}
      >
        Categoría
      </Typography>
      <Typography>{sector.sector}</Typography>

      
    </Grid>

    <Grid item xs={6} md={6}>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ fontWeight: 600 }}
      >
        Metros cuadrados
      </Typography>
      <Typography>{sector.square_meters} m²</Typography>

      
    </Grid>

    <Grid item xs={6} md={6}>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ fontWeight: 600 }}
      >
        Cantidad de baños
      </Typography>
      <Typography>{sector.number_of_bathrooms} </Typography>

      
    </Grid>
    
    <Grid item xs={6} md={12}>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ fontWeight: 600 }}
      >
        Descripción
      </Typography>
      <Typography>{sector.description}</Typography>

      
    </Grid>
  </Grid>)
}

export default SectorDetails;