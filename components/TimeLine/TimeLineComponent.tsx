import React, { useState } from 'react';
import SectionComponent from '../From-Nabvar/Navbar/Section-page/SectionComponent';
import PrincipalIcon from '../../public/timeline-icon.png'; 
import SecondaryIcon from '../../public/navbar/info-icon.png'; 
import iconButton from '../../public/plus-icon.png';
import infoIcon from '../../public/info-icon-black.png';
import { Box } from '@mui/material';
import CustomButton from '../../commons/buttons-commons/CustomButton';
import DrawerBooking from '../../commons/activities-commons/DrawerBooking/DrawerBooking';
import { Stack } from '@mui/material';
import { SelectPicker } from 'rsuite';
import useWindowSize from '../../hooks/useWindowSize';
import SectorsInTimeLine from '../../commons/timeline-commons/SectorsInTimeLine';
import CalendarComponent from '../../commons/timeline-commons/dates-calendar/CalendarComponent';
import InfiniteScrollCalendar from '../../commons/timeline-commons/dates-calendar/CalendarComponent';
// const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
//   item => ({ label: item, value: item })
// );

const data: any = [
  { label: 'Sector 1', value: 'sector1' },
  { label: 'Sector 2', value: 'sector2' },
  { label: 'Sector 3', value: 'sector3' },
];
const TimeLineComponent = () => {
  // Estado para controlar la apertura del Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width, height } = useWindowSize();
  // Función para manejar la apertura del Drawer
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Función para manejar el cierre del Drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  console.log("width, height ", width, height )

  return (
    <Box>
      <SectionComponent
        icon={PrincipalIcon}
        secondaryIcon={infoIcon}
        text="Línea de Tiempo"
        children={
          <CustomButton
            icon={iconButton}
            text={'Crear Reserva'}
            onClick={handleOpenDrawer} // Llama a la función para abrir el Drawer
          />
        }
      />



      {/* Aquí se usa el DrawerBooking */}
      <DrawerBooking
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen} // Pasar la función para cerrar el Drawer
      />


      {/* <SectorsInTimeLine/> */}
      <InfiniteScrollCalendar />

    </Box>
  );
};

export default TimeLineComponent;
