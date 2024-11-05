import React from "react";
import { Button, Box } from "@mui/material";
import { StaticImageData } from "next/image";
import theme from "../../themes/theme";
import IconToImage from "../styled-components/IconImages";

interface CustomButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: StaticImageData;
  text?: string;
  sx?: object; // add aditional styles
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, text, icon, sx }) => (
  <Button
    variant="contained"
    onClick={onClick}
    fullWidth
    sx={{
      backgroundColor: theme.palette.secondary.main,
      color: '#FFFF',
      textTransform: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
            fontSize: "16px",
      borderRadius: "8px",
      height: "40px",
      ...sx, // Combina los estilos adicionales
    }}
  >
    {icon && (
      <Box sx={{ display: "flex", alignItems: "center",pt:1 }}>
        <IconToImage icon={icon} w={text === 'Exportar a Excel' ? 27 : 20} h={text === 'Exportar a Excel' ? 27 : 20} />
      </Box>
    )}
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "4px" }}>
      {text}
    </Box>
  </Button>
);

export default CustomButton;
