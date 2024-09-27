// EventGantt.tsx
import React from "react";
import { Box } from "@mui/material";
import GantComponent from "./GantComponent"; // Ajusta la ruta según tu estructura de carpetas
import { ActivityUtils } from "../../../../Class-activities/ActivityUtils";
import { ActivityState } from "../../../../enum/activities/activity.enum";

const events = [
  //   {
  //   startDate: "2024-09-15",
  //   endDate: "2024-09-30",
  //   sector: "SALA A",
  //   state: ActivityState.RESERVA,
  //   name: "Expo IA",
  // },
  {
    startDate: "2024-09-15",
    endDate: "2024-09-30",
    sector: "SALA A",
    state: ActivityState.CONFIRMADO,
    openingDate: "2024-09-20",
    closingDate: "2024-09-27",
    name: "Expo IA",
  },
  {
    startDate: "2024-10-16",
    endDate: "2024-11-05",
    sector: "SALA A",
    state: ActivityState.EN_PROCESO_DE_FIRMA,
    name: "Expo IA",
  },
];

interface EventGanttProps {
  year: number;
  month: number;
}

const EventGantt: React.FC<EventGanttProps> = ({ year, month }) => {
  return (
    <>
      {events.map((event, index) => {
        const eventStartDate = new Date(event.startDate);
        const eventMonth = eventStartDate.getMonth(); // 0 = January
        const eventYear = eventStartDate.getFullYear();
        const startDayIndex = ActivityUtils.getStartDayIndex(event.startDate); // Adjust for 0-indexing
        const eventDuration = ActivityUtils.calculateEventDuration(
          event.startDate,
          event.endDate
        );
        // const   {assemblyDays, disassemblyDays} = ActivityUtils.calculateAssemblyAndDisassemblyDays(event.startDate, event.openingDate, event.closingDate, event.endDate)

        const isConfirmed = event.state === ActivityState.CONFIRMADO;
        const { assemblyDays, disassemblyDays } = isConfirmed
          ? ActivityUtils.calculateAssemblyAndDisassemblyDays(
              event.startDate || "",
              event.openingDate || "",
              event.closingDate || "",
              event.endDate || ""
            )
          : { assemblyDays: 0, disassemblyDays: 0 };

        console.log(assemblyDays, disassemblyDays);
        // Only render the event if it's in the correct month and year
        if (year === eventYear && month === eventMonth + 1) {
          return (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: "40px", // Adjust based on the height of the days
                left: `${startDayIndex * 43}px`, // Place the GantComponent according to the start day
                width: `${(eventDuration + 1) * 43}px`,
                // zIndex: 2, // Ensure it appears above other elements
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
