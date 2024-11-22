import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import {
  ActivityColor,
  ActivityState,
} from "../../commons/activities-commons/DrawerBooking/enums";
import theme from "../../themes/theme";
interface LastActivitiesProps {
  activities: Array<any>;
}
const LastActivities: React.FC<LastActivitiesProps> = ({ activities }) => {
  const getNormalizedState = (state: string): string => {
    return state
      .trim()
      .normalize("NFD") // Descompone caracteres con acento
      .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
      .replace(/[^a-zA-Z0-9\s]/g, "") // Elimina caracteres especiales como /
      .toUpperCase()
      .replace(/\s+/g, "_"); // Reemplaza espacios con guiones bajos
  };

  console.log("Estado recibido:", activities[1].state);
  console.log("Estado normalizado:", getNormalizedState(activities[1].state));
  console.log(
    "Color asociado:",
    ActivityColor[getNormalizedState(activities[1].state) as keyof typeof ActivityColor]
  );
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Título alineado dentro del contenedor */}
        <Typography variant="h5" fontWeight="bold" sx={{ p: "20px" }}>
          Próximos Eventos
        </Typography>

        {/* Contenedor de las actividades */}
        <Grid container sx={{ paddingInline: "20px", maxWidth: "1300px" }}>
          {activities.map((activity: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card
                sx={{
                  maxWidth: "350px",
                  bgcolor: theme.palette.secondary.contrastText,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {activity.activity_name}
                  </Typography>
                  <Chip
                    label={
                      ActivityState[
                        activity.state as keyof typeof ActivityState
                      ] || activity.state
                    }
                    size="small"
                    style={{
                      marginBottom: "10px",
                      backgroundColor:
                        ActivityColor[
                          getNormalizedState(
                            activity.state
                          ) as keyof typeof ActivityColor
                        ] || "white",

                      color: "black",
                    }}
                  />
                  <Divider style={{ marginBottom: "10px" }} />

                  {/* Campos con su valor alineado */}
                  <Grid container spacing={1} marginBottom={2}>
                    <Grid item xs={5}>
                      <Typography variant="body2" color="text.secondary">
                        Tipo de Actividad
                      </Typography>
                    </Grid>
                    <Grid item xs={7} textAlign="right">
                      <Typography variant="body2" color="text.secondary">
                        {activity.type_activity}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} marginBottom={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Tipo de Contrato
                      </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body2" color="text.secondary">
                        {activity.type_of_contract}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} marginBottom={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Fecha inicial
                      </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body2" color="text.secondary">
                        {new Date(activity.initial_date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} marginBottom={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Fecha de cierre
                      </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body2" color="text.secondary">
                        {new Date(activity.closing_date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} marginBottom={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Horario
                      </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body2" color="text.secondary">
                        {activity.activity_schedule_on_property}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default LastActivities;
