import React from 'react';
import { Button, Box } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import theme from '../../theme';

interface CustomButtonProps {
  icon?: StaticImageData;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, icon }) => (
  <Button
    variant="contained"
    sx={{
      backgroundColor: theme.palette.secondary.main,
      textTransform: 'none',
      maxWidth: '175px',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: '8px',
      height: '40px'
    }}
  >
    {icon && (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src={icon} alt="Icon" width={20} height={20}  />
      </Box>
    )}
    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
      {text}
    </Box>
  </Button>
);

export default CustomButton;
