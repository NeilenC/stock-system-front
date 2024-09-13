import { DrawerBookingProps } from "./models/DrawerBookingProps";
import React from "react";
import {
  Drawer,
  Box,
  Typography,

  Button,
  Grid,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import theme from "../../../theme";
import GeneralInfoContent from "./DrawerSections/GeneralInfo";
import LogisticsSection from "./DrawerSections/Logisticts";
import OperationalDetails from "./DrawerSections/OperationalDetails";
import ClientData from "./DrawerSections/ClientData";

const DrawerBooking: React.FC<DrawerBookingProps> = ({ isOpen, setIsOpen }) => {
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setIsOpen(false);
  };


  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMediumScreen ? "60%" : "35%",
          height: isMediumScreen ? "94vh " : "90vh",
          top: "70px",
          scrollBehavior: 'smooth',
          "&::-webkit-scrollbar": {
            width: "10px", // Ancho de la barra de scroll
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Color del "thumb" (la parte móvil)
            borderRadius: "8px", // Bordes redondeados para un aspecto más suave
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Color de fondo del scroller
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Color cuando el usuario pasa el mouse sobre el "thumb"
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          
        }}
        role="presentation"
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
            paddingBlock: "8px",
            borderBottom: "1px solid #E1E6EF",
            display: "flex",
            alignItems: "center",
            
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              fontSize: "18px",
              paddingInline: "16px",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginLeft: "15px",
              alignItems: "center",
            }}
          >
            Crear Reserva
          </Typography>
        </Box>
        <Box >
          <Box sx={{ paddingInline: "16px", paddingBottom: "100px" }}>
            {/* Sección: Información General */}
            <GeneralInfoContent />

            {/* Sección: Logística del Evento */}

            <LogisticsSection />

            {/* Detalles Operativos del Evento */}

            <OperationalDetails />

            {/* Información del cliente  */}

            <ClientData />
            
            {/* Botón para crear reserva */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: isMediumScreen ? "60%" : "35%",
          position: "fixed",
          bottom: 0,
          backgroundColor: "white",
          paddingBlock: "16px",
          zIndex: 1,
          borderTop: " 1.02px solid #E1E6EF",
        }}
      >
        <Box sx={{ paddingInline: "16px" }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              textTransform: "none",
              color: "#F9FAFB",
              fontSize: "15px",
              weight: 350,
            }}
          >
            Confirmar Reserva
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerBooking;
