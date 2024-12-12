import { useMemo, useState } from "react";
import { SecondTitleComponent, TitleComponent } from "./TitlesComponent";
import {
  Box,
  Collapse,
  FormControl,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormLabelComponentWithError, StyledSelect } from "./CustomTextFields";
import useEventStore from "../activity-hook/useEventStore";
import theme from "../../../../themes/theme";

import add from "../../../../public/add.png";
import removeIcon from "../../../../public/close-black.png";
import { Stack } from "@mui/material";
import useSectors, { SectorProps } from "../../../../hooks/useSectors";
import ImageToIcon from "../../../styled-components/IconImages";
import { ComponentsProps } from "./GeneralInfo";

interface SectorOption {
  label: string;
  value: number;
}

const LogisticsSection: React.FC<ComponentsProps> = ({ inputErrors }) => {
  const { eventData, setLogisticsDetails, setSectors } = useEventStore();

  const initialDate = eventData.generalInfo.details.initialDate;
  const endDate = eventData.generalInfo.details.endDate;
  const [openDetalles, setOpenDetalles] = useState(true);
  const handleToggleDetalles = () => setOpenDetalles(!openDetalles);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const numberOfSectorsInGlobalState =
    eventData.logistics.detailsLogistics.sectors.length;
  const ArrayOfSectorsInGlobalState =
    eventData.logistics.detailsLogistics.sectors;
  const { sectorsToRent } = useSectors();

  // Filtrar los sectores disponibles, excluyendo los que ya están en el estado global
  const filteredSectors = sectorsToRent.filter((sector: SectorProps) => {
    // Verifica si el sector ya está presente en el estado global
    const isSectorInGlobalState = ArrayOfSectorsInGlobalState.some(
      (globalSector) => globalSector.sector_id === sector.id
    );
    return !isSectorInGlobalState;
  });

  console.log("ArrayOfSectorsInGlobalState", ArrayOfSectorsInGlobalState);

  // Función para verificar si hay intersección entre rangos de fechas
  const isDateOverlap = (
    start1: Date,
    end1: Date,
    start2: Date,
    end2: Date
  ) => {
    return start1 <= end2 && start2 <= end1;
  };

  const availableSectors = useMemo(() => {
    if (initialDate && endDate) {
      return filteredSectors.filter((sector: SectorProps) => {
        if (sector.sector_activities_ids?.length) {
          const sectorActivities = sector.sector_activities_ids;

          // Verifica si alguna actividad tiene solapamiento y si está parcialmente alquilada
          const isOverlapAndFullyRented = sectorActivities.some(
            (activity) =>
              isDateOverlap(
                new Date(initialDate),
                new Date(endDate),
                new Date(activity.activity?.initial_date),
                new Date(activity.activity?.end_date)
              ) && !activity.is_partially_rented
          );
          return !isOverlapAndFullyRented;
        }
        return true;
      });
    } else {
      return filteredSectors;
    }
  }, [initialDate, endDate, filteredSectors]);

  // Agregar un nuevo sector
  const handleAddSector = () => {
    if (selectedSector !== null) {
      const selected = availableSectors.find(
        (sector) => sector.id === selectedSector
      );
      if (
        selected &&
        !ArrayOfSectorsInGlobalState.some((s) => s.sector_id === selected.id)
      ) {
        const isOverlapAndPartiallyRented = selected.sector_activities_ids.some(
          (activity) =>
            isDateOverlap(
              new Date(initialDate),
              new Date(endDate),
              new Date(activity.activity?.initial_date),
              new Date(activity.activity?.end_date)
            ) && activity.is_partially_rented
        );
        console.log("isOverlapAndPartiallyRented", isOverlapAndPartiallyRented);

        const updatedSector = {
          sector_id: selected.id,
          name: selected.name,
          is_partially_rented: isOverlapAndPartiallyRented,
          toggle_partially_rented: false,
          square_meters_rented: 0,
        };
        console.log("updatedSector", updatedSector);
        // Actualizar el estado global
        setSectors([...ArrayOfSectorsInGlobalState, updatedSector]);
      }
      setSelectedSector(null);
    }
  };

  const handleRemoveSector = (sectorId: number) => {
    const updatedSectors = ArrayOfSectorsInGlobalState.filter(
      (sector) => sector.sector_id !== sectorId
    );
    setSectors(updatedSectors);
  };

  const handleToggleChange = (
    sectorId: number,
    togglePartiallyRented: boolean
  ) => {
    const updatedSectors = ArrayOfSectorsInGlobalState.map((sector) => {
      // Si el sector no está en availableSectors, lo manejamos con la lógica original
      return sector.sector_id === sectorId
        ? { ...sector, toggle_partially_rented: togglePartiallyRented }
        : sector;
    });
    setSectors(updatedSectors);
  };

  const handleSectorChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedSector(event.target.value as number);
  };

  const handleInputChangeDetails = (
    key: keyof typeof eventData.logistics.detailsLogistics,
    value: string
  ) => {
    setLogisticsDetails(key, value);
  };

  return (
    <>
      <TitleComponent variant="h6" text={"Logística del Evento"} />
      <Box>
        <SecondTitleComponent
          onClick={handleToggleDetalles}
          open={openDetalles}
          text={"Detalles"}
        />
        <Collapse in={openDetalles}>
          <Box>
            <FormLabelComponentWithError
              error={!!inputErrors.sector_activities_ids}
            >
              Areas Arrendadas
            </FormLabelComponentWithError>

            <Stack spacing={2} direction="column" alignItems="flex-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <FormControl fullWidth>
                  <StyledSelect
                    labelId="sector-select-label"
                    value={selectedSector || ""}
                    onChange={handleSectorChange}
                    displayEmpty
                    fullWidth
                    inputProps={{
                      "aria-hidden": undefined,
                    }}
                  sx={{marginTop:'10px'}}

                  >
                    {availableSectors.map((sector, index) => {
                      const isPartiallyRented =
                        sector?.sector_activities_ids?.some(
                          (activity) =>
                            isDateOverlap(
                              new Date(initialDate),
                              new Date(endDate),
                              new Date(activity.activity?.initial_date),
                              new Date(activity.activity?.end_date)
                            ) && activity.is_partially_rented
                        );

                      return (
                        <MenuItem
                          key={index}
                          value={sector.id}
                          disabled={!initialDate && !endDate}
                          sx={{
                            backgroundColor: isPartiallyRented
                              ? "#FFEB9A"
                              : "background.paper",
                            "&:hover": {
                              backgroundColor: isPartiallyRented
                                ? "#FFEB9A"
                                : "action.hover",
                            },
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                          >
                            <span>{sector.name}</span>

                            {/* Indicador de disponibilidad parcial */}
                            {isPartiallyRented && (
                              <span
                                style={{ color: "#888", fontSize: "0.9em" }}
                              >
                                Disponibilidad parcial
                              </span>
                            )}
                          </Box>
                        </MenuItem>
                      );
                    })}
                  </StyledSelect>
                </FormControl>

                {/* Add Sector Button */}
                <Tooltip title="Agregar Sector" arrow>
                  <span>
                    <ImageToIcon
                      icon={add}
                      w={24}
                      h={24}
                      onClick={handleAddSector}
                      sx={{
                        alignItems: "center",
                        cursor: "pointer",
                        opacity: selectedSector !== null ? 1 : 0.5,
                      }}
                    />
                  </span>
                </Tooltip>
              </Box>

              {/* Section Header */}
              {numberOfSectorsInGlobalState > 0 && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Areas Seleccionadas
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mr: 5 }}
                  >
                    Ocupación
                  </Typography>
                </Box>
              )}

              {/* List of added sectors */}
              <List
                sx={{
                  width: "100%",
                  bgcolor: numberOfSectorsInGlobalState
                    ? "primary.light"
                    : null,
                }}
              >
                {numberOfSectorsInGlobalState > 0 && (
                  <List sx={{ width: "100%" }}>
                    {ArrayOfSectorsInGlobalState.map((sector, index) => {
                      console.log(
                        "sector.is_partially_rented",
                        sector.is_partially_rented
                      );
                      return (
                        <ListItem
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText
                            primary={sector.name}
                            sx={{ flexGrow: 1 }}
                          />

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Typography variant="body1">
                              {" "}
                              {sector.is_partially_rented ||
                              sector.toggle_partially_rented
                                ? "Parcial"
                                : "Total"}
                            </Typography>
                            <Switch
                              checked={
                                sector.is_partially_rented ||
                                sector.toggle_partially_rented
                              }
                              disabled={sector.is_partially_rented}
                              onChange={() =>
                                handleToggleChange(
                                  sector.sector_id,
                                  !sector.toggle_partially_rented
                                )
                              }
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "white",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                  {
                                    backgroundColor: "secondary.main",
                                  },
                                "& .MuiSwitch-track": {
                                  backgroundColor: "gray",
                                },
                              }}
                            />

                            <Tooltip title="Eliminar sector" arrow>
                              <ImageToIcon
                                icon={removeIcon}
                                w={20}
                                h={20}
                                onClick={() =>
                                  handleRemoveSector(sector.sector_id)
                                }
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": { color: "blue" },
                                }}
                              />
                            </Tooltip>
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </List>
            </Stack>

            <TextField
              sx={{
                marginBlock: "16px 24px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.info.light}`,
                },
              }}
              placeholder="Nota"
              variant="outlined"
              fullWidth
              multiline
              rows={2.5} // Adjust rows as needed
              value={eventData.logistics.detailsLogistics.notes || ""}
              onChange={(e: any) =>
                handleInputChangeDetails("notes", e.target.value)
              }
            />
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default LogisticsSection;
