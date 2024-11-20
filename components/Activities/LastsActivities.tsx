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
import { ActivityState } from "../../enum/activities/activity.enum";
import { ActivityColor } from "../../commons/activities-commons/DrawerBooking/enums";

const LastActivities = ({ activities }: any) => {
  const getNormalizedState = (state: string): string => {
    // Normaliza el texto del estado (puedes ajustarlo según tus necesidades)
    return state.trim().toUpperCase().replace(/\s+/g, "_");
  };

  return (
    <>
      <Grid container spacing={2} marginTop={2} sx={{ paddingInline: "20px" }}>
        {activities.map((activity: any, index: any) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card>
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
                <Typography variant="body2" color="text.secondary">
                  Tipo: {activity.type_activity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contrato: {activity.type_of_contract}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha inicial:{" "}
                  {new Date(activity.initial_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha de cierre:{" "}
                  {new Date(activity.closing_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Horario: {activity.activity_schedule_on_property}
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Responsable:
                  </Typography>
                  <Typography variant="body2">
                    {activity.responsible_name}
                  </Typography>
                  <Typography variant="body2">
                    Email: {activity.responsible_email}
                  </Typography>
                  <Typography variant="body2">
                    Tel: {activity.responsible_phone}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LastActivities;
