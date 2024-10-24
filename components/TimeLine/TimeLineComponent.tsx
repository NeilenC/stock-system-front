import React, { useState } from "react";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import PrincipalIcon from "../../public/timeline-icon.png";
import iconButton from "../../public/plus-icon.png";
import infoIcon from "../../public/info-icon-black.png";
import { Box } from "@mui/material";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import DrawerBooking from "../../commons/activities-commons/DrawerBooking/DrawerBooking";
import useWindowSize from "../../hooks/useWindowSize";
import SectorsInTimeLine from "../../commons/timeline-commons/SectorsInTimeLine";
import CalendarComponent from "../../commons/timeline-commons/dates-calendar/gantt/CalendarComponent";
import MainFiltersBar from "../../commons/timeline-commons/filters-bar/MainFiltersBar";
import EventGantt from "../../commons/timeline-commons/dates-calendar/gantt/EventGantt";
import { useSectorPositions } from "../../context/SectorPositionsProvider";

const TimeLineComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width, height } = useWindowSize();

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box>
      <SectionComponent
        icon={PrincipalIcon}
        secondaryIcon={infoIcon}
        text="Línea de Tiempo"
      >
        <CustomButton
          icon={iconButton}
          text={"Crear Reserva"}
          onClick={handleOpenDrawer}
        />
      </SectionComponent>

      {/* Aquí se usa el DrawerBooking */}
      <DrawerBooking
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen} // Pasar la función para cerrar el Drawer
      />
      <MainFiltersBar />
      <Box
        sx={{
          paddingInline: "16px",
          paddingBottom: "16px",
        }}
      >
        {/* <EventGantt year={2024} month={9}/> */}

        <Box
          sx={{
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            display: "flex",
            flexDirection: "row",
            zIndex: 1,
            overflow: "hidden", // Asegura que el contenido se ajuste dentro del marco
          }}
        >
          <SectorsInTimeLine />
          <CalendarComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default TimeLineComponent;
