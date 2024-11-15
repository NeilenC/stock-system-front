import CustomButton from "../../commons/buttons-commons/CustomButton";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import calendar from "../../public/calendar.png";
import add from "../../public/add_circle.png";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Divider,
  Box,
} from "@mui/material";

const Activities = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getActivities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/active`);
        if (!response.ok) {
          throw new Error("Error al obtener las actividades");
        }
        const activities = await response.json();
        setActivities(activities);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, []);

  const handleOpenModalToCreate = () => {
    console.log("Abrir modal para crear una nueva actividad");
  };

  return (
    <>
      <SectionComponent icon={calendar} text={"Actividades"}>
        <CustomButton icon={add} onClick={handleOpenModalToCreate} text={"Crear Reserva"} />
      </SectionComponent>
    <Box sx={{paddingInline:'20px'}}>
      {loading ? (
          <CircularProgress style={{ display: "block", margin: "20px auto" }} />
        ) : error ? (
            <Typography color="error" align="center" marginTop={2}>
          {error}
        </Typography>
      ) : activities.length === 0 ? (
          <Typography align="center" marginTop={2}>
          No hay actividades disponibles.
        </Typography>
      ) : (
          <Grid container spacing={2} marginTop={2}>
          {activities.map((activity, index) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {activity.activity_name}
                  </Typography>
                  <Chip
                    label={activity.state}
                    color={activity.state === "Pendiente de aprobacion" ? "warning" : "success"}
                    size="small"
                    style={{ marginBottom: "10px" }}
                    />
                  <Divider style={{ marginBottom: "10px" }} />
                  <Typography variant="body2" color="text.secondary">
                    Tipo: {activity.type_activity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contrato: {activity.type_of_contract}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha inicial: {new Date(activity.initial_date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de cierre: {new Date(activity.closing_date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Horario: {activity.activity_schedule_on_property}
                  </Typography>
                  <Divider style={{ margin: "10px 0" }} />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Responsable:
                    </Typography>
                    <Typography variant="body2">{activity.responsible_name}</Typography>
                    <Typography variant="body2">Email: {activity.responsible_email}</Typography>
                    <Typography variant="body2">Tel: {activity.responsible_phone}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
      </>
  );
};

export default Activities;
