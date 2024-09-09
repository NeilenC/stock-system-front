import React from 'react';
import SectionComponent from '../From-Nabvar/Navbar/Section-page/SectionComponent';
import PrincipalIcon from '../../public/timeline-icon.png'; 
import SecondaryIcon from '../../public/navbar/info-icon.png'; 
import iconButton from '../../public/plus-icon.png'
import infoIcon from '../../public/info-icon-black.png'
import { Box } from '@mui/material';
import CustomButton from '../../commons/buttons-commons/CustomButton';

const TimeLineComponent = () => {
  return (
    <Box>
      <SectionComponent
        icon={PrincipalIcon} 
        secondaryIcon={infoIcon}
        text="Línea de Tiempo" 
        button={<CustomButton icon={iconButton} text={'Crear Reserva'}/>} 
      />
    asdasd
    </Box>
  );
};

export default TimeLineComponent;
