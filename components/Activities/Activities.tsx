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
import DrawerBooking from "../../commons/activities-commons/DrawerBooking/DrawerSections/DrawerBooking";
import { ActivityState } from "../../enum/activities/activity.enum";
import { ActivityColor } from "../../commons/activities-commons/DrawerBooking/enums";
import LastActivities from "./LastsActivities";
import TableActivities from "./TableActivities";
import { useActivitiesContext } from "./Activities-table/context/useActivitiesContext";

const Activities = () => {
  const {activities, setActivities } = useActivitiesContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDrawer, setoOpenDrawer] = useState(false);

  useEffect(() => {
    const getActivities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity/active`
        );
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

  const handleOpenDrawer = () => {
    setoOpenDrawer(true);
  };

  const getNormalizedState = (state: string): string => {
    // Normaliza el texto del estado (puedes ajustarlo según tus necesidades)
    return state.trim().toUpperCase().replace(/\s+/g, "_");
  };

  return (
    <>
      <SectionComponent icon={calendar} text={"Actividades"}>
              {/* Botón para limpiar filtros */}

        <CustomButton
          icon={add}
          onClick={handleOpenDrawer}
          text={"Crear Reserva"}
        />
      </SectionComponent>
      <Box sx={{ paddingInline: "20px" }}>
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
          <LastActivities activities={activities} />
        )}
      </Box>
      <TableActivities/>
      {openDrawer && (
        <DrawerBooking isOpen={openDrawer} setIsOpen={setoOpenDrawer} />
      )}
    </>
  );
};

export default Activities;
