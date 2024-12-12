import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import theme from "../../../../themes/theme";
import { DrawerBookingProps } from "./models/DrawerBookingProps";
import useEventStore from "../activity-hook/useEventStore";
import GeneralInfoContent from "./GeneralInfo";
import LogisticsSection from "./Logisticts";
import ClientData from "./ClientData";
import { useActivitiesContext } from "../../../../components/Activities/Activities-table/context/useActivitiesContext";
import Toast from "../../../Toast";

const DrawerBooking: React.FC<DrawerBookingProps> = ({ isOpen, setIsOpen }) => {
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const eventData = useEventStore.getState().eventData;
  const resetForm = useEventStore.getState().resetForm;
  const { fetchActivities } = useActivitiesContext();
  const [errors, setErrors] = useState<Record<string, string>>({}); 

  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "",
  });

  const showToastMessage = (
    messageLeft: string,
    messageRight: string,
    bgcolor: string,
    color: string
  ) => {
    setToastProps({ messageLeft, messageRight, bgcolor, color });
    setShowToast(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
    setErrors({});
  };
  // const clientIdFromStore = useEventStore(
  //   (state) => state.eventData.logistics.clientData.client.clientId
  // );
  const sectors = useEventStore(
    (state) => state.eventData.logistics.detailsLogistics.sectors
  );

  // Crea el payload que se ajusta a tu DTO `CreateMemoActivityDto`
  const createMemoActivityDto = {
    // //Datos del cliente
    // client_id: clientIdFromStore,
    client_name: eventData.logistics.clientData.client.clientName,
    client_phone: eventData.logistics.clientData.client.phoneNumber,
    client_email: eventData.logistics.clientData.client.email,
    activity_name: eventData.generalInfo.details.nameEvent,
    type_activity: eventData.generalInfo.details.typeEvent,
    initial_date: eventData.generalInfo.details.initialDate,
    initial_time: eventData.generalInfo.details.initialTime,
    opening_date: eventData.generalInfo.details.openingDate,
    opening_time: eventData.generalInfo.details.openingTime,
    closing_date: eventData.generalInfo.details.closingDate,
    closing_time: eventData.generalInfo.details.closingTime,
    end_date: eventData.generalInfo.details.endDate,
    end_time: eventData.generalInfo.details.endTime,
    state: eventData.generalInfo.details.state,
    sector_activities_ids: eventData.logistics.detailsLogistics.sectors?.map(
      (sector) => ({
        sector_id: sector.sector_id,
        is_partially_rented:
          sector.toggle_partially_rented
            ? true
            : sector.is_partially_rented,
        square_meters_rented: sector.square_meters_rented || 0,
      })
    ),
    notes: eventData.logistics.detailsLogistics.notes,
  };

  
  const validateCreateMemoActivityDto = (dto: typeof createMemoActivityDto) => {
    const errors: Record<string, string> = {};

    // if (!dto.client_name) errors.client_name = "*";
    // if (!dto.client_email) errors.client_email = "*";
    // if (!dto.client_phone) errors.client_phone = "*";
    if (!dto.activity_name) errors.activity_name = "*";
    if (!dto.state) errors.state = "*";
    if (!dto.type_activity) errors.type_activity = "*";
    if (!dto.initial_date) errors.initial_date = "*";
    if (!dto.opening_date) errors.opening_date = "*";
    if (!dto.closing_date) errors.closing_date = "*";
    if (!dto.end_date) errors.end_date = "*";
    if (!dto.initial_time) errors.initial_time = "*";
    if (!dto.sector_activities_ids?.length) {
      errors.sector_activities_ids = "*";
    }

    return errors;
  };

  // Función para enviar los datos al backend
  const [scrolling, setScrolling] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // Type the ref as HTMLDivElement

  const handleScroll = () => {
    if (contentRef.current) {
      setScrolling(contentRef.current.scrollTop > 1); // Now TypeScript knows contentRef.current is a div
    }
  };

  useEffect(() => {
    const currentRef = contentRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleConfirmBooking = async () => {
    const errors = validateCreateMemoActivityDto(createMemoActivityDto);

    if (Object.keys(errors).length > 0) {
      showToastMessage(
        "Por favor, completa los campos obligatorios.",
        "",
        theme.palette.error.light,
        "white"
      );

      // Aquí puedes actualizar el estado de errores en los componentes específicos
      setErrors(errors); // Usa `setErrors` de cada sección
      return;
    }
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
      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: ${
            data.message || "Error al confirmar el evento"
          }`
        );
      }
      setErrors({}); 
      await fetchActivities();
      handleClose();
      resetForm();
      showToastMessage(
        "¡ Creaste una nueva Evento !",
        "",
        theme.palette.success.light,
        "white"
      );
      console.log("Evento confirmad:", data);
    } catch (error) {
      showToastMessage(
        "Error al crear la Evento",
        "Intente de nuevo",
        theme.palette.error.light,
        "white"
      );
    }
  };
  console.log("errorrs", errors);
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      BackdropProps={{
        onClick: (e) => e.stopPropagation(),
      }}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMediumScreen ? "60%" : "35%",
          height: isMediumScreen ? "94vh" : "91vh",
          top: "82px",
          display: "flex",
          flexDirection: "column",
        },
        zIndex: 3,
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
          boxShadow: scrolling ? "0px 2px 10px rgba(0, 0, 0, 0.9)" : "none", // Sombra condicional
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
          Crear Evento
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
        <GeneralInfoContent inputErrors={errors} />

        {/* Sección: Logística del Evento */}
        <LogisticsSection  inputErrors={errors} />

        {/* Detalles Operativos del Evento */}
        {/* <OperationalDetails /> */}

        {/* Información del cliente */}
        <ClientData  />
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
              width: 1,
            }}
            onClick={handleConfirmBooking}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
      {showToast && (
        <Toast
          messageLeft={toastProps.messageLeft}
          messageRight={toastProps.messageRight}
          bgcolor={toastProps.bgcolor}
          color={toastProps.color}
          onClose={() => setShowToast(false)}
        />
      )}
    </Drawer>
  );
};

export default DrawerBooking;
