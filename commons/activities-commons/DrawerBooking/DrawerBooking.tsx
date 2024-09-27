import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import theme from "../../../theme";
import GeneralInfoContent from "./DrawerSections/GeneralInfo";
import LogisticsSection from "./DrawerSections/Logisticts";
import OperationalDetails from "./DrawerSections/OperationalDetails";
import ClientData from "./DrawerSections/ClientData";
import { DrawerBookingProps } from "./models/DrawerBookingProps";
import useEventStore, { EventData } from "./activity-hook/useEventStore";

const DrawerBooking: React.FC<DrawerBookingProps> = ({ isOpen, setIsOpen }) => {
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const eventData = useEventStore.getState().eventData;
  // const { eventData } = useEventStore();

  const handleClose = () => {
    setIsOpen(false);
  };

  // Crea el payload que se ajusta a tu DTO `CreateMemoActivityDto`
  const createMemoActivityDto = {
    // Datos del cliente
    client_id: eventData.logistics.clientData.client.clientId, // Asigna el client_id
    client_phone: eventData.logistics.clientData.client.phoneNumber,
    client_email: eventData.logistics.clientData.client.email,

    // Nombre del evento y tipo de contrato
    activity_name: eventData.generalInfo.details.nameEvent,
    type_activity: eventData.generalInfo.details.typeEvent, // Mapea el tipo de actividad
    type_of_contract: eventData.generalInfo.details.typeContract,

    // Datos de CWA
    cwa_name: eventData.generalInfo.details.CWAname,
    cwa_number: parseInt(eventData.generalInfo.details.CWAnumber, 10), // Convierte a número si es necesario

    // Fechas y horarios del evento
    initial_date: eventData.generalInfo.details.dateEvent,
    opening_date: eventData.generalInfo.details.dateEvent,
    opening_time: eventData.generalInfo.details.timeEvent,
    closing_date: eventData.logistics.dismantling.initialDateDismantling,
    closing_time: eventData.logistics.dismantling.initialTimeDismantling,
    end_date: eventData.logistics.dismantling.initialDateDismantling,


    // Datos logísticos - armado
    entry_place_assembly: eventData.logistics.assembly.entryPlaceAssembly,
    initial_date_assembly: eventData.logistics.assembly.initialDateAssembly,
    initial_time_assembly: eventData.logistics.assembly.initialTimeAssembly,
    property_activity_schedule: eventData.logistics.detailsLogistics.timeActivity,
    // Datos logísticos - desmontaje
    entry_place_dismantling:
      eventData.logistics.dismantling.entryPlaceDismantling,
    initial_date_dismantling:
      eventData.logistics.dismantling.initialDateDismantling,
    initial_time_dismantling:
      eventData.logistics.dismantling.initialTimeDismantling,

    // Sectores
    sector_activities: Array.isArray(
      eventData.logistics.detailsLogistics.sectors
    )
      ? eventData.logistics.detailsLogistics.sectors.map((sector) => ({
          sector_name: sector,
        }))
      : [],

    // Detalles logísticos adicionales
    activity_date_on_property: eventData.logistics.detailsLogistics.dateActivity,
    activity_schedule_on_property: eventData.logistics.detailsLogistics.timeActivity, 
    entry_point: eventData.logistics.detailsLogistics.entryPoint,
    notes: eventData.logistics.detailsLogistics.notes,

    // Detalles operativos
    expositors_quantity:
      eventData.logistics.operationalDetails.information.expositorsQuantity,
    ticket_value:
      eventData.logistics.operationalDetails.ticketOffice.ticketValue,
    // area: eventData.logistics.operationalDetails.ticketOffice.area,
    schedule_ticketoffice:
      eventData.logistics.operationalDetails.ticketOffice.schedule,
    ticketOfficeLocation:
      eventData.logistics.operationalDetails.ticketOffice.ticketOfficeLocation,

    // Director técnico
    technical_director_name:
      eventData.logistics.clientData.technicalDirector.techDirectorName.toString(),
    technical_director_phone:
      eventData.logistics.clientData.technicalDirector.phoneNumber,
    technical_director_email:
      eventData.logistics.clientData.technicalDirector.email,

    // Responsable
    responsible_name:
      eventData.logistics.clientData.organizerOrResponsible.responsibleName.toString(),
    responsible_phone:
      eventData.logistics.clientData.organizerOrResponsible.phoneNumber,
    responsible_email:
      eventData.logistics.clientData.organizerOrResponsible.email,

    // Administrador
    administrator_name:
      eventData.logistics.clientData.administrator.administratorName.toString(),
    administrator_phone:
      eventData.logistics.clientData.administrator.phoneNumber,
    administrator_email: eventData.logistics.clientData.administrator.email,
  };

  // console.log("cliente id --",  eventData.logistics.clientData.client.clientId)
  // console.log("createMemoActivityDto --", createMemoActivityDto)
  // console.log("Datos enviados --", JSON.stringify(createMemoActivityDto));

  // Función para enviar los datos al backend
  const handleConfirmBooking = async () => {
    // console.log("createMemoActivityDto justo antes de enviar:", createMemoActivityDto);
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createMemoActivityDto),
        }
      );
  
      const data = await response.json();
      console.log("Respuesta del backend:", data);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${data.message || "Error al confirmar la reserva"}`);
      }
  
      console.log("Reserva confirmada:", data);
    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
    }
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
          display: "flex",
          flexDirection: "column",
        },
        zIndex: 0
      }}
    >
      {/* Encabezado - Fijo en la parte superior */}
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

      {/* Contenido con scroll */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Activar scroll solo en este contenedor
          p: "24px 16px ",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        {/* Sección: Información General */}
        <GeneralInfoContent />

        {/* Sección: Logística del Evento */}
        <LogisticsSection />

        {/* Detalles Operativos del Evento */}
        <OperationalDetails />

        {/* Información del cliente */}
        <ClientData />
      </Box>

      {/* Botón Fijo en la parte inferior */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          paddingBlock: "16px",
          zIndex: 1,
          borderTop: "1.02px solid #E1E6EF",
        }}
      >
        <Box sx={{ paddingInline: "16px" }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              color: "#F9FAFB",
              fontSize: "15px",
              fontWeight: 350,
            }}
            onClick={handleConfirmBooking}
          >
            Confirmar Reserva
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerBooking;
