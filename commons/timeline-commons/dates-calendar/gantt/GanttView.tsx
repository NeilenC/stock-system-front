import { useRef } from "react";
import useSectors from "../../../../hooks/useSectors";
import SectorsInTimeLine, { groupSectorsByCategory } from "../../SectorsInTimeLine";
import { Box } from "@mui/material";
import { MonthComponent } from "./CalendarComponent";

const GanttView = () => {
    const { salas } = useSectors();
    // const { year, month } = useDateContext(); // Asume que tienes un contexto para manejar la fecha actual
  
    // const containerRef = useRef(null);
    // const calendarRef = useRef(null);
  
    // // Agrupar sectores por su campo "sector"
    // const groupedSectors = groupSectorsByCategory(salas);
    
    // // Para sincronizar el scroll entre los sectores y las fechas
    // const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    //   if (calendarRef.current) {
    //     // calendarRef.current.scroll = event.currentTarget.scrollLeft;
    //   }
    // };
  
    // return (
    //   <Box sx={{ display: "flex", overflow: "hidden", height: "100vh" }}>
    //     {/* Columna de los sectores */}
    //     <Box sx={{ width: "300px", overflowY: "auto", borderRight: "1px solid #E1E6EF" }}>
    //       <SectorsInTimeLine />
    //     </Box>
  
    //     {/* Columna de la línea de tiempo (fechas) */}
    //     <Box
    //       sx={{ flex: 1, overflowX: "auto", position: "relative" }}
    //       onScroll={handleScroll}
    //       ref={containerRef}
    //     >
    //       <MonthComponent year={year} month={month} ref={calendarRef} />
  
    //       {/* Aquí irían los eventos en la grilla */}
    //       {groupedSectors.map((sector: any) => (
    //         <EventRow key={sector.id} sector={sector} />
    //       ))}
    //     </Box>
    //   </Box>
    // );
  };
  