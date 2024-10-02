// EventGantt.tsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import GantComponent from "./GantComponent"; // Ajusta la ruta según tu estructura de carpetas
import { ActivityUtils } from "../../../../Class-activities/ActivityUtils";
import { ActivityState } from "../../../../enum/activities/activity.enum";
import { useSectorPositions } from "../../../../context/SectorPositionsProvider";

const events = [
  {
    startDate: "2024-10-15",
    endDate: "2024-10-30",
    sector: [4, 1],
    state: ActivityState.CONFIRMADO,
    openingDate: "2024-10-20",
    closingDate: "2024-10-27",
    name: "Expo IA",
    id:4
  },
  // {
  //   startDate: "2024-10-16",
  //   endDate: "2024-11-05",
  //   sector: [1],
  //   state: ActivityState.EN_PROCESO_DE_FIRMA,
  //   name: "Expo Jurassic",
  //   id:3

  
  // },
  {
    startDate: "2024-10-15",
    endDate: "2024-10-25",
    sector: [2],
    state: ActivityState.EN_PROCESO_DE_FIRMA,
    name: "Expo Jurassic",
    id:3

  },
];

interface EventGanttProps {
  year: number;
  month: number;
}

const EventGantt: React.FC<EventGanttProps> = ({ year, month }) => {
  const { sectorPositions } = useSectorPositions();
  // const [scrollY, setScrollY] = useState(0); // Estado para almacenar el desplazamiento en Y

  // const handleScroll = () => {
  //   setScrollY(window.scrollY); // Actualiza el desplazamiento en Y
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
      {events.map((event, index) => {
        const eventStartDate = new Date(event.startDate);
        const eventMonth = eventStartDate.getMonth(); // 0 = January
        const eventYear = eventStartDate.getFullYear();
        const startDayIndex = ActivityUtils.getStartDayIndex(event.startDate); // Ajustar para el índice basado en 0
        const eventDuration = ActivityUtils.calculateEventDuration(
          event.startDate,
          event.endDate
        );

        const isConfirmed = event.state === ActivityState.CONFIRMADO;
        const { assemblyDays, disassemblyDays } = isConfirmed
          ? ActivityUtils.calculateAssemblyAndDisassemblyDays(
              event.startDate || "",
              event.openingDate || "",
              event.closingDate || "",
              event.endDate || ""
            )
          : { assemblyDays: 0, disassemblyDays: 0 };

        // Solo renderizar el evento si está en el mes y año correctos
        if (year === eventYear && month === eventMonth + 1) {
          return (
            <>
              {event.sector.map((sectorId, sectorIndex) => {
                const topPosition = sectorPositions[sectorId] || 0; // Obtener la posición Y o 0 si no existe
                return (
                  <Box
                    key={`${index}-${sectorIndex}`} // Clave única para cada sector
                    sx={{
                      position: "absolute", // Mantener la posición absoluta
                      top: `${topPosition-300}px`, // Usar la posición original sin restar
                      left: `${startDayIndex * 43}px`, // Mantener la posición horizontal según el día de inicio
                      width: `${(eventDuration + 1) * 43}px`,
                    }}
                  >
                    <GantComponent
                      eventName={event.name}
                      state={event.state}
                      startDate={event.startDate}
                      openingDate={event.openingDate}
                      closingDate={event.closingDate}
                      endDate={event.endDate}
                      sector={event.sector}
                      isConfirmed={isConfirmed}
                      assemblyDays={assemblyDays}
                      disassemblyDays={disassemblyDays}
                      activityId={event.id}
                    />
                  </Box>
                );
              })}
            </>
          );
        }
        return null;
      })}
    </>
  );
};

export default EventGantt;
