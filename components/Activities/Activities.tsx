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
  Select,
  MenuItem,
} from "@mui/material";
import DrawerBooking from "../../commons/activities-commons/DrawerBooking/DrawerSections/DrawerBooking";
import NextActivities from "./NextActivities";
import TableActivities from "./TableActivities";
import { useActivitiesContext } from "./Activities-table/context/useActivitiesContext";

const Events = () => {
  const { activities , itemsPerPage, updateItemsPerPage} = useActivitiesContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDrawer, setoOpenDrawer] = useState(false);
  const handleItemsPerPageChange = (event: any) => {
    const value = parseInt(event.target.value, 10); // 
    updateItemsPerPage(value); 
  };

const nextConfirmedActivities = activities.filter((act) => act.state === 'Confirmado')
  useEffect(() => {
    if (activities && activities.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [activities]); 
  
  const handleOpenDrawer = () => {
    setoOpenDrawer(true);
  };

  return (
    <>
      <SectionComponent icon={calendar} text={"Eventos"}>
        {/* Botón para limpiar filtros */}

        <CustomButton
          icon={add}
          onClick={handleOpenDrawer}
          text={"Crear Evento"}
        />
      </SectionComponent>
      <Box sx={{ }}>
        {loading ? (
          <CircularProgress style={{ margin: "20px auto" }} />
        ) : error ? (
          <Typography color="error" align="center" marginTop={2}>
            {error}
          </Typography>
        ) : activities.length === 0 ? (
          <Typography align="center" marginTop={2}>
            No hay Eventos disponibles.
          </Typography>
        ) : (
          <NextActivities activities={nextConfirmedActivities.slice(0, 3)} />
        )}
      </Box>
      <Box sx={{ p: "10px 0px 0px  16px" , display:'flex',}}>
        <Select
          labelId="items-per-page-label"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          label="Items por página"
          sx={{ height: '45px' }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant='body1'sx={{alignContent:'center', pl:2}}>Registros por página</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          paddingBlock: "10px",
          paddingInline: "16px",
        }}
      >
      <Box
          sx={{
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >

      <TableActivities />
      </Box>
      </Box>
      {openDrawer && (
        <DrawerBooking isOpen={openDrawer} setIsOpen={setoOpenDrawer} />
      )}
    </>
  );
};

export default Events;
