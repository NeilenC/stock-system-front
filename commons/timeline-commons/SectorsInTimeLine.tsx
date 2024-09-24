import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useSalas from "../../hooks/useSalas";
import theme from "../../theme";

// Función para agrupar sectores por su campo "sector"
const groupSectorsByCategory = (sectors: any) => {
  return sectors.reduce((acc: any, sector: any) => {
    const { sector: category } = sector;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(sector);
    return acc;
  }, {});
};

const SectorsInTimeLine = () => {
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
    <Box sx={{ minWidth: "310px", pt: "71px" }}>
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
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
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
                    borderLeft: "7px solid #e0e0e0",
                    bgcolor: "#F5F5F5", // Fondo blanco
                    borderBottom: "1px solid #E1E6EF",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleSector(category, sector.id)} // Alterna el sector al hacer click>
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
                      sx={{ color: "black", p: 0, justifyContent: "center" }}
                    >
                      {openSectors[category] === sector.id ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
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
                  sx={{ border: "1px solid #E1E6EF" }}
                >
                  <Box
                    sx={{
                      padding: "8px 72px 16px ",
                      bgcolor: "#ffff",
                      borderRadius: "4px",
                      alignContent: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: "12px" }}>
                      Descripción: {sector.description}
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default SectorsInTimeLine;
