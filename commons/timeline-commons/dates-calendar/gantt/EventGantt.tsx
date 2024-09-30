// EventGantt.tsx
import React from "react";
import { Box } from "@mui/material";
import GantComponent from "./GantComponent"; // Ajusta la ruta según tu estructura de carpetas
import { ActivityUtils } from "../../../../Class-activities/ActivityUtils";
import { ActivityState } from "../../../../enum/activities/activity.enum";
import { useSectorPositions } from "../../../../context/SectorPositionsProvider";

const events = [
  {
    startDate: "2024-09-15",
    endDate: "2024-09-30",
    sector: [4,2],
    state: ActivityState.CONFIRMADO,
    openingDate: "2024-09-20",
    closingDate: "2024-09-27",
    name: "Expo IA",
  },
  {
    startDate: "2024-10-16",
    endDate: "2024-11-05",
    sector: [1],
    state: ActivityState.EN_PROCESO_DE_FIRMA,
    name: "Expo IA",
  },
];

interface EventGanttProps {
  year: number;
  month: number;
}

const EventGantt: React.FC<EventGanttProps> = ({ year, month }) => {
  const { sectorPositions } = useSectorPositions();

  console.log("sectorPositions ---------", sectorPositions);

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
          const sectorId = event.sector[0]; // Asumiendo que quieres el primer sector ID
          const topPosition = sectorPositions[sectorId] || 0; // Obtiene la posición Y o 0 si no existe

          return (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: `${topPosition - 32}px`, // Usar la posición desde sectorPositions
                left: `${startDayIndex * 43}px`, // Colocar el componente GantComponent según el día de inicio
                width: `${(eventDuration + 1) * 43}px`,
                zIndex: 2, // Asegúrate de que aparezca sobre otros elementos
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
              />
            </Box>
          );
        }
        return null;
      })}
    </>
  );
};

export default EventGantt;
