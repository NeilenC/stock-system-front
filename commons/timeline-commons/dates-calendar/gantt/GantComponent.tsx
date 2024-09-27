import React, { useEffect, useState } from "react";
import { Box, Chip, Typography, IconButton } from "@mui/material";
import IconToImage from "../../../styled-components/IconImages";
import { getStateColor, getStateIcon } from "../enum/StatesEnum";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GantProps } from "./props/GantProps";
import { ActivityUtils } from "../../../../Class-activities/ActivityUtils";
import { ActivityState } from "../../../../enum/activities/activity.enum";

const GantComponent: React.FC<GantProps> = ({
  eventName,
  state,
  startDate,
  endDate,
  openingDate,
  closingDate,
  sector,
  isConfirmed,
  assemblyDays,
  disassemblyDays,
}) => {
  const [activities, setActivities] = useState<any[]>([]);
  const eventDuration = ActivityUtils.calculateEventDuration(
    startDate,
    endDate
  );

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/memo-activity`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        } else {
          console.error("Error fetching activities:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const componentWidth = eventDuration * 42.5;
  console.log("EVENTO DURA", eventDuration);

  console.log(activities);

  const stateColor = getStateColor(state);
  const stateIcon = getStateIcon(state);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "2px solid",
        borderColor: stateColor,
        borderRadius: "8px",
        padding: "2px 16px 5px 7px",
        marginBottom: "10px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        maxHeight: "49px",
        position: "relative",
        bgcolor: isConfirmed ? stateColor : null,
        zIndex: 3,
        // Aplica un fondo verde si está confirmado, otro si no lo está
      }}
    >
      {isConfirmed && (
        <Box
        sx={{
          paddingInlineStart: assemblyDays ? `${assemblyDays }px` : null,
          backgroundColor: "rgba(144, 238, 144, 0.3)", // Verde claro con opacidad
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.5) 0px,
            rgba(255, 255, 255, 0.5) 1px,
            transparent 1px,
            transparent 6px
          )`, // Líneas diagonales
          backgroundSize: "10px 10px", // Ajusta el tamaño del patrón
          borderRadius: "8px", // Opcional: bordes redondeados
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Box sx={{ color:'black', bgcolor:'white', borderRadius:'8px'}}>
          {assemblyDays}d

          </Box>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ marginRight: isConfirmed ? "0px" : "8px" }}>
          {/* Icono del evento según el estado */}
          <IconToImage icon={stateIcon} w="29" h="29" />
        </Box>
        <Box sx={{ lineHeight: "18px" }}>
          {/* Nombre del evento */}
          <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
            {eventName}
          </Typography>
          {/* Estado del evento */}
          <Chip
            label={state}
            sx={{
              borderRadius: "25px",
              fontWeight: 350,
              paddingBlock: 0,
              height: "17px",
              fontSize: "14px",
            }}
          />
        </Box>
      </Box>
      {/* Fechas del evento */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textTransform: "none", fontSize: "14px" }}
      >
        {startDate} - {endDate}
      </Typography>

      {/* Mostrar los días de armado y desarmado solo si está confirmado */}
      {/* {isConfirmed && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "14px", marginRight: "8px" }}>
              {assemblyDays}d
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>{disassemblyDays}d</Typography>
          </Box>
        )} */}
      {/* Icono de menú de tres puntos verticales */}
      <IconButton
        sx={{
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

export default GantComponent;
