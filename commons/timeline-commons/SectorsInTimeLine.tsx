import { Box, Typography } from "@mui/material";
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
  console.log("sector", salas);

  // Agrupar sectores por su campo "sector"
  const groupedSectors = groupSectorsByCategory(salas);

  return (
    <Box sx={{ maxWidth: "450px" }}>
      {Object.keys(groupedSectors).map((category) => (
        <Box key={category} >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.dark,
              paddingBlock: '8px',
              paddingInline:'16px',
               alignItems:'center'
            }}
          >
            <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" ,}}>
              {category}
            </Typography>
          </Box>

          {groupedSectors[category].map((sector: any) => (
            <Box
              key={sector.id}
              sx={{
                display: "flex",
                flexDirection:'column',
                alignItems: "start",
                paddingBlock: '6px',
                paddingInline:'24px',
                bgcolor: theme.palette.primary.main,
                border: "1px solid #E1E6EF",

              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", }}
              >
                {sector.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ }}>
                {sector.square_meters} m²
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default SectorsInTimeLine;
