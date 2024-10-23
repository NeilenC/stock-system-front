import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import useSectors from "../../hooks/useSectors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import theme from "../../themes/theme";
import IconToImage from "../styled-components/IconImages";
import sectors from "../../public/sectorIcon.png";
import { useSectorPositions } from "../../context/SectorPositionsProvider";
import EditIcon from "@mui/icons-material/Edit"; // Asegúrate de tener esta línea
import EditSectorModal from "../../components/sectors/SectorFormEdit";

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

const SectorsInTimeLine = ({ children }: any) => {
  const { salas } = useSectors();
  const { sectorPositions, setSectorPositions } = useSectorPositions();
  const sectorRefs = useRef<{ [sectorId: number]: HTMLDivElement | null }>({});
  const prevPositionsRef = useRef<{ [sectorId: number]: number }>({});
  const groupedSectors = groupSectorsByCategory(salas);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSectorId, setEditingSectorId] = useState(null);

  // Inicializar todas las categorías como abiertas
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>(
    Object.keys(groupedSectors).length > 0
      ? Object.keys(groupedSectors).reduce((acc, category) => {
          acc[category] = true; // Inicializa cada categoría como abierta
          return acc;
        }, {} as { [key: string]: boolean })
      : {}
  );

  const [openSectors, setOpenSectors] = useState<{
    [category: string]: number[];
  }>({});

  const handleToggleCategory = (category: string) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleEditSector = (sectorId: any) => {
    setEditingSectorId(sectorId); // Guarda el ID del sector que se va a editar
    setIsEditModalOpen(true); // Abre el modal
  };
  
  const handleToggleSector = (category: string, sectorId: number) => {
    const isOpen = openSectors[category]?.includes(sectorId);

    // Obtener la referencia del sector actual
    const sectorRef = sectorRefs.current[sectorId];

    // Obtener el tamaño del sector
    const sectorHeight = sectorRef
      ? sectorRef.getBoundingClientRect().height
      : 0;

    // Ajustar las posiciones del sector
    const updatedPositions = { ...sectorPositions };

    if (!isOpen) {
      // Si se abre, solo incrementar la posición de los sectores directamente por debajo
      Object.keys(updatedPositions).forEach((key) => {
        if (Number(key) > sectorId) {
          updatedPositions[Number(key)] += sectorHeight;
        }
      });
    } else {
      // Si se cierra, solo decrementar la posición de los sectores directamente por debajo
      Object.keys(updatedPositions).forEach((key) => {
        if (Number(key) > sectorId) {
          updatedPositions[Number(key)] -= sectorHeight;
        }
      });
    }

    setOpenSectors((prevState) => ({
      ...prevState,
      [category]: isOpen
        ? prevState[category].filter((id) => id !== sectorId)
        : [...(prevState[category] || []), sectorId],
    }));

    // Actualiza las posiciones del sector
    setSectorPositions(updatedPositions);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "16px",
        }}
      >
        {/* Espacios */}
      </Box>

      <Box sx={{ minWidth: "310px", overflow: "auto" }}>
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
                cursor: "pointer",
              }}
              onClick={() => handleToggleCategory(category)}
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

            <Collapse
              in={openCategories[category]}
              timeout="auto"
              unmountOnExit
            >
              {groupedSectors[category].map((sector: any) => (
                <Box key={sector.id}>
                  <Box
                    ref={(el: any) => (sectorRefs.current[sector.id] = el)} // Referencia al sector
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      paddingInline: "16px",
                      paddingBlock: "8px",
                      borderLeft: "7px solid #E1E6EF",
                      bgcolor: "#F5F5F5",
                      borderBottom: "1px solid #E1E6E0",
                      cursor: "pointer",
                      minHeight: "50px", // Establece una altura mínima
                    }}
                    onClick={() => handleToggleSector(category, sector.id)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
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
                          {openSectors[category]?.includes(sector.id) &&
                          sector.description ? (
                            <ArrowDropDownIcon
                              sx={{ color: theme.palette.primary.dark }}
                            />
                          ) : (
                            <ArrowRightIcon
                              sx={{
                                color: sector.description ? "black" : "#F5F5F5",
                              }}
                            />
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

                      {/* Botón de editar */}
                      <IconButton
                        size="small"
                        sx={{ ml: 2 }}
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que se active el evento onClick del sector
                          handleEditSector(true); // Función para manejar la edición
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Collapse
                    in={openSectors[category]?.includes(sector.id)}
                    timeout="auto"
                    unmountOnExit
                    sx={{ border: "0px 1px 1px 1px solid #E1E6EF" }}
                  >
                    <Box
                      sx={{
                        padding: "8px 72px 16px",
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
                        {sector.description}
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              ))}
              {isEditModalOpen && (
                <EditSectorModal
                sectorId={editingSectorId}
                onClose={() => {
                  setIsEditModalOpen(false);
                  setEditingSectorId(null); // Limpiar el ID del sector al cerrar
                }}
                // Otros props que necesites
              />
              )}
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SectorsInTimeLine;
