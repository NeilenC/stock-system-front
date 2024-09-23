import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

  // Función para alternar la categoría colapsada o expandida
  const handleToggleCategory = (category: string) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <Box sx={{ width: "310px", pt: '42px' }}>
      {Object.keys(groupedSectors).map((category) => (
        <Box key={category}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.dark,
              paddingBlock: '9px',
              paddingInline: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer', // Hacer el área clicable
            }}
            onClick={() => handleToggleCategory(category)} // Alterna la categoría al hacer click
          >
            <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
              {category}
            </Typography>
            <IconButton size="small" sx={{ color: "#fff" }}>
              {openCategories[category] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* Collapse para mostrar u ocultar los sectores */}
          <Collapse in={openCategories[category]}>
            {groupedSectors[category].map((sector: any) => (
              <Box
                key={sector.id}
                sx={{
                  display: "flex",
                  flexDirection: 'column',
                  alignItems: "start",
                  paddingBlock: '6px',
                  paddingInline: '24px',
                  bgcolor: theme.palette.primary.main,
                  border: "1px solid #E1E6EF",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: '12px' }}>
                  {sector.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                  {sector.square_meters} m²
                </Typography>
              </Box>
            ))}
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default SectorsInTimeLine;
