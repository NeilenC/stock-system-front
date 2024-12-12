import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
  Button,
} from "@mui/material";
import {
  ActivityColor,
  ActivityState,
} from "../../commons/activities-commons/DrawerBooking/enums";
import ModalComponent from "../../commons/modals/ModalComponent";
import ActivityEditForm from "./Activities-table/components/ActivityEditForm";
import { useActivityStore } from "../../zustand/activityStore";

interface NextActivities {
  activities: Array<any>;
}
const NextActivities: React.FC<NextActivities> = ({ activities }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const { activityToUpdate } =
    useActivityStore();

  const getNormalizedState = (state: string): string => {
    return state
      .trim()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-zA-Z0-9\s]/g, "") 
      .toUpperCase()
      .replace(/\s+/g, "_"); 
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Contenedor de las eventos */}
        <Grid
          container
          sx={{ paddingInline: "20px", maxWidth: "1300px", pt: 3}}
        >
          {activities.map((activity: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id} >
              <Card
                sx={{
                  maxWidth: "350px",
                  bgcolor: 'white',
                  borderRadius:'15px ' ,
                  paddingBottom:'0px !important'
                }}
              >
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {activity.activity_name}
                    </Typography>
                    <Button
                      sx={{ bgcolor: "secondary.main", width: "30px" }}
                      onClick={() => {
                        setSelectedActivity(activity.id);
                        setEditModalOpen(true);
                      }}
                    >
                      Editar
                      {/* <ImageToIcon icon={edit} w={20} h={20} /> */}
                    </Button>
                  </Box>
                  {/* <Divider style={{ marginBottom: "10px" }} /> */}

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

                  {/* Campos con su valor alineado */}
                  <Grid container spacing={1} marginBottom={2}>
                    <Grid item xs={5}>
                      <Typography variant="body2" color="text.secondary">
                        Tipo de Evento
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
                        Horario Apertura
                      </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                      <Typography variant="body2" color="text.secondary">
                        {activity.opening_time}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ width: 1, paddingBlock: 3 }} />
        {isEditModalOpen && (
          <ModalComponent
            title="Editar Evento"
            onSubmit={() => {}}
            isOpen={isEditModalOpen}
            handleClose={() => setEditModalOpen(false)}
            textButton="Guardar"
          >
            <ActivityEditForm activityId={selectedActivity} />
          </ModalComponent>
        )}
      </Box>
    </>
  );
};

export default NextActivities;
