import React from "react";
import { Button, Box } from "@mui/material";
import { StaticImageData } from "next/image";
import theme from "../../theme";
import IconToImage from "../styled-components/IconImages";

interface CustomButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: StaticImageData;
  text: string;
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
      borderRadius: "8px",
      height: "40px",
      ...sx, // Combina los estilos adicionales
    }}
  >
    {icon && (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconToImage icon={icon} w={20} h={20} />
      </Box>
    )}
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "4px" }}>
      {text}
    </Box>
  </Button>
);

export default CustomButton;
