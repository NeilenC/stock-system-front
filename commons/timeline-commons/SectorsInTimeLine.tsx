import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import useSalas from "../../hooks/useSalas";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import theme from "../../theme";
import IconToImage from "../styled-components/IconImages";
import sectors from '../../public/sectorIcon.png'
// Función para agrupar sectores por su campo "sector"
export const groupSectorsByCategory = (sectors: any) => {
  return sectors.reduce((acc: any, sector: any) => {
    const { sector: category } = sector;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(sector);
    return acc;
  }, {});
};

const eventos = [
  { id: 1, sectorId: 101, nombre: "Evento 1", fechaInicio: "2024-09-10", fechaFin: "2024-09-15" },
  { id: 2, sectorId: 102, nombre: "Evento 2", fechaInicio: "2024-09-12", fechaFin: "2024-09-18" },
  { id: 3, sectorId: 101, nombre: "Evento 3", fechaInicio: "2024-09-20", fechaFin: "2024-09-25" },
];



const SectorsInTimeLine = ({children}: any) => {
  const { salas } = useSalas();

  // Agrupar sectores por su campo "sector"
  const groupedSectors = groupSectorsByCategory(salas);

  // Estado para manejar qué categorías están abiertas
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [openSectors, setOpenSectors] = useState<{
    [category: string]: number[];
  }>({});
  // Función para alternar la categoría colapsada o expandida
  const handleToggleCategory = (category: string) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Función para alternar sectores; asegurarse de que solo un sector esté abierto a la vez
  const handleToggleSector = (category: string, sectorId: number) => {
    setOpenSectors((prevState) => {
      const isOpen = prevState[category]?.includes(sectorId);

      if (isOpen) {
        // Si el sector ya está abierto, lo eliminamos del array
        return {
          ...prevState,
          [category]: prevState[category].filter((id) => id !== sectorId),
        };
      } else {
        // Si el sector no está abierto, lo agregamos al array
        return {
          ...prevState,
          [category]: [...(prevState[category] || []), sectorId],
        };
      }
    });
  };
  return (
    <Box>
<Box
  sx={{
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingInline:'16px'
  }}
>
  <Typography variant="body2" sx={{ color:theme.palette.info.contrastText}}>
    Espacios
  </Typography>
  <IconButton sx={{ color: 'white', mr: 1 }}>
    <IconToImage icon={sectors} h={28} w={28} />
  </IconButton>
</Box>
<Box sx={{ minWidth: "310px" }}>
      {Object.keys(groupedSectors).map((category) => (
        <Box key={category}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.dark,
              paddingBlock: "8px",
              maxHeight: "40px",
              paddingInline: "16px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer", // Hacer el área clicable
            }}
            onClick={() => handleToggleCategory(category)} // Alterna la categoría al hacer click
          >
            <IconButton size="small" sx={{ color: "#fff", p: 0 }}>
              {openCategories[category] ? (
                <ArrowDropDownIcon />
              ) : (
                <ArrowRightIcon />
              )}
            </IconButton>
            <Typography
              variant="body1"
              sx={{ color: "#fff", fontWeight: "bold", pl: "12px" }}
            >
              {category}
            </Typography>
          </Box>

          {/* Collapse para mostrar u ocultar los sectores */}
          <Collapse in={openCategories[category]} timeout="auto" unmountOnExit>
            {groupedSectors[category].map((sector: any) => (
              <Box key={sector.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    paddingInline: "16px",
                    paddingBlock: "8px",
                    borderLeft: "7px solid #E1E6EF",
                    bgcolor: "#F5F5F5", // Fondo blanco
                    borderBottom: "1px solid #E1E6EF",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleSector(category, sector.id)} 
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ p: 0, justifyContent: "center" }}
                    >
                      {openSectors[category]?.includes(sector.id) && sector.description ? ( 
                        <ArrowDropDownIcon
                          sx={{ color: theme.palette.primary.dark }}
                        />
                      ) : (
                        <ArrowRightIcon sx={{ color: sector.description ? 'black' : "#F5F5F5" }} />
                      )}
                    </IconButton>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        pl: "8px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        {sector.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "12px" }}>
                        {sector.square_meters} m²
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Collapse interno para mostrar más información del sector */}

                {/* //Los eventos se van a tener que mapear por fecha  */}
                <Collapse
                  in={openSectors[category]?.includes(sector.id)} // Comprobar si el sector está en el array de sectores abiertos
                  timeout="auto"
                  unmountOnExit
                  sx={{ border: " 0px 1px 1px 1px solid #E1E6EF" }}
                >
                  <Box
                    sx={{
                      padding: "8px 72px 16px ",
                      bgcolor: "#ffff",
                      borderRadius: "4px",
                      alignContent: "center",
                      lineHeight: "24px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                      Descripción
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "15px" }}>
                      {sector.square_meters}
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </Collapse>
        </Box>
      ))}
    </Box>
    </Box>

  );
};

export default SectorsInTimeLine;




// import { Box, Typography, Collapse, IconButton } from "@mui/material";
// import { useState } from "react";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import useSalas from "../../hooks/useSalas";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import theme from "../../theme";
// import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";

// // Función para agrupar sectores por su campo "sector"
// export const groupSectorsByCategory = (sectors: any) => {
//   return sectors.reduce((acc: any, sector: any) => {
//     const { sector: category } = sector;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(sector);
//     return acc;
//   }, {});
// };

// const eventos = [
//   { id: 1, sectorId: 101, nombre: "Evento 1", fechaInicio: "2024-09-10", fechaFin: "2024-09-15" },
//   { id: 2, sectorId: 102, nombre: "Evento 2", fechaInicio: "2024-09-12", fechaFin: "2024-09-18" },
//   { id: 3, sectorId: 101, nombre: "Evento 3", fechaInicio: "2024-09-20", fechaFin: "2024-09-25" },
// ];



// const SectorsInTimeLine = ({ year, month, sectors }: any) => {
//   const startDate = startOfMonth(new Date(year, month - 1));
//   const endDate = endOfMonth(new Date(year, month - 1));
//   const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
//   const numberOfDays = daysInMonth.length;
// const {salas} = useSalas()
//   return (
//     <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
//       {/* Casillas de sectores */}
//       <Box sx={{ minWidth: 200, borderRight: "1px solid #E1E6EF" }}>
//         {salas.map((sector: any) => (
//           <Box
//             key={sector.id}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               borderBottom: "1px solid #E1E6EF",
//               padding: "8px",
//               backgroundColor: "#F5F5F5",
//               height: "40px",
//             }}
//           >
//             <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//               {sector.name}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* Fechas */}
//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//         {/* Casillas de los días en el mes */}
//         <Box sx={{ display: "flex", minWidth: numberOfDays * 43.5 }}>
//           {daysInMonth.map((day, index) => {
//             const dayOfWeek = day.getDay(); // 0 = Domingo, 6 = Sábado
//             const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
//             return (
//               <Box
//                 key={index}
//                 sx={{
//                   width: "42px",
//                   height: "38px",
//                   borderRight: "1px solid #E1E6EF",
//                   backgroundColor: isWeekend ? "#F5F5F5" : "#FFF",
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   sx={{ fontSize: "12px", lineHeight: "18px" }}
//                 >
//                   {format(day, "EEE").charAt(0).toUpperCase()}
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                     lineHeight: "18px",
//                   }}
//                 >
//                   {format(day, "dd")}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>

//         {/* Grid con sectores y fechas */}
//         <Box sx={{ display: "flex" }}>
//           {daysInMonth.map((day, dayIndex) => (
//             <Box
//               key={dayIndex}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 width: "42px",
//                 borderRight: "1px solid #E1E6EF",
//               }}
//             >
//               {salas.map((sector:any, sectorIndex:any) => (
//                 <Box
//                   key={sectorIndex}
//                   sx={{
//                     height: "38px",
//                     borderBottom: "1px solid #E1E6EF",
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   {/* Aquí puedes renderizar los eventos basados en el sector y fecha */}
//                 </Box>
//               ))}
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SectorsInTimeLine;