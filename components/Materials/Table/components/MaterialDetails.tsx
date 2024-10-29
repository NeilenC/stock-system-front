import { Box, Grid, Typography } from "@mui/material";
import { MaterialProps } from "../../materialsProps";

const MaterialDetails = ({ material }: { material: MaterialProps }) => {
    return (
        <Box sx={{ padding: " 10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Código
            </Typography>
            <Typography>{material.code}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Nombre
            </Typography>
            <Typography>{material.name}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Color
            </Typography>
            <Typography>{material.color}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Peso
            </Typography>
            <Typography>{material.weight}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Stock Actual
            </Typography>
            <Typography>{material.actual_stock}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Altura
            </Typography>
            <Typography>{material.height}</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 600 }}
            >
              Descripción
            </Typography>
            <Typography>{material.description}</Typography>
          </Grid>
        </Grid>
      </Box>
    )
}

export default MaterialDetails;