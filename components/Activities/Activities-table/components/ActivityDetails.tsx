import { Box, Grid, Typography } from "@mui/material";

interface ActivityDetailsProps {
  activity: {
    activity_name: string;
    type_activity: string;
    type_of_contract: string;
    state: string;
    client_email: string;
    client_phone: string;
    responsible_name: string;
    responsible_email: string;
    responsible_phone: string;
    expositors_quantity: number;
    ticket_value: number;
    ticketOfficeLocation: string;
    schedule_ticketoffice: string;
    entry_place_assembly: string;
    entry_place_dismantling: string;
    entry_point: string;
    initial_date: string;
    end_date: string;
    initial_date_assembly: string;
    initial_date_dismantling: string;
    initial_time_assembly: string;
    initial_time_dismantling: string;
    opening_date: string;
    opening_time: string;
    closing_date: string;
    closing_time: string;
    is_active: boolean;
    cwa_name: string;
    cwa_number: number;
    activity_date_on_property: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ActivityDetails = ({ activity }: ActivityDetailsProps) => {
  return (
    <Box sx={{ padding: "10px 20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Nombre de la Actividad
          </Typography>
          <Typography>{activity.activity_name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Tipo de Actividad
          </Typography>
          <Typography>{activity.type_activity}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Contrato
          </Typography>
          <Typography>{activity.type_of_contract}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Estado
          </Typography>
          <Typography>{activity.state}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Email del Cliente
          </Typography>
          <Typography>{activity.client_email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Teléfono del Cliente
          </Typography>
          <Typography>{activity.client_phone}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Responsable
          </Typography>
          <Typography>{activity.responsible_name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Email del Responsable
          </Typography>
          <Typography>{activity.responsible_email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Teléfono del Responsable
          </Typography>
          <Typography>{activity.responsible_phone}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Cantidad de Expositores
          </Typography>
          <Typography>{activity.expositors_quantity}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            Valor de la Entrada
          </Typography>
          <Typography>{activity.ticket_value}</Typography>
        </Grid>
        {/* Agrega más campos de manera similar */}
      </Grid>
    </Box>
  );
};

export default ActivityDetails;
