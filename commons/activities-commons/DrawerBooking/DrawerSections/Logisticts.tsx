import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SecondTitleComponent, TitleComponent } from "./TitlesComponent";
import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CustomAutocomplete,
  CustomSelect,
  CustomTextField,
  FormLabelComponent,
  StyledSelect,
} from "./CustomTextFields";
import useEventStore from "../activity-hook/useEventStore";
import theme from "../../../../themes/theme";

import add from "../../../../public/add.png";
import removeIcon from "../../../../public/close-black.png";
// import { SelectPicker, Stack } from 'rsuite';
import { Stack } from "@mui/material";
import useSectors, {
  SectorActivity,
  SectorProps,
} from "../../../../hooks/useSectors";
import ImageToIcon from "../../../styled-components/IconImages";
import { Activity } from "../../../../zustand/activityStore";
interface SectorOption {
  label: string;
  value: number; // o el tipo adecuado según tu base de datos
}

const LogisticsSection: React.FC = () => {
  const {
    eventData,
    setLogisticsAssembly,
    setLogisticsDismantling,
    setLogisticsDetails,
    setSectors,
  } = useEventStore();

  const initialDate = eventData.generalInfo.details.initialDate;
  const endDate = eventData.generalInfo.details.endDate;

  const [openLogistics, setOpenLogistics] = useState(true);
  const [openDetalles, setOpenDetalles] = useState(true);
  const [openDesarme, setOpenDesarme] = useState(true);
  const handleToggleLogistics = () => setOpenLogistics(!openLogistics);
  const handleToggleDesarme = () => setOpenDesarme(!openDesarme);
  const handleToggleDetalles = () => setOpenDetalles(!openDetalles);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const sectorsInGlobalState =
    eventData.logistics.detailsLogistics.sectors.length;
  const { sectorsToRent } = useSectors();

  // Filtrar los sectores disponibles, excluyendo los que ya están en el estado global
  const filteredSectors = sectorsToRent.filter((sector: SectorProps) => {
    // Verifica si el sector ya está presente en el estado global
    const isSectorInGlobalState =
      eventData.logistics.detailsLogistics.sectors.some(
        (globalSector) => globalSector.sector_id === sector.id // Comparación de nombres
      );
    return !isSectorInGlobalState;
  });

  console.log(
    "ESTADO DE SECTORS",
    eventData.logistics.detailsLogistics.sectors
  );
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
          console.log("sectorActivitiess", sectorActivities);
          // Verifica si alguna actividad tiene solapamiento y si está parcialmente alquilada
          const isOverlappingAndPartiallyRented = sectorActivities.some(
            (activity) =>
              isDateOverlap(
                new Date(initialDate),
                new Date(endDate),
                new Date(activity.activity.initial_date),
                new Date(activity.activity.end_date)
              ) && !activity.is_partially_rented
          );
          return !isOverlappingAndPartiallyRented;
        }
        return true;
      });
    } else {
      return filteredSectors;
    }
  }, [initialDate, endDate, filteredSectors]);
  console.log("availableSectors", availableSectors);

  const sectorOptions: SectorOption[] = availableSectors.map((sector) => ({
    label: sector.name,
    value: sector.id,
  }));

  // Agregar un nuevo sector
  const handleAddSector = () => {
    if (selectedSector !== null) {
      const selected = sectorOptions.find(
        (sector) => sector.value === selectedSector
      );
      if (
        selected &&
        !eventData.logistics.detailsLogistics.sectors.some(
          (s) => s.sector_id === selected.value
        )
      ) {
        const updatedSector = {
          sector_id: selected.value,
          name: selected.label,
          is_partially_rented: false,
          square_meters_rented: 0,
        };

        // Actualizar el estado global
        setSectors([
          ...eventData.logistics.detailsLogistics.sectors,
          updatedSector,
        ]);
      }
      setSelectedSector(null);
    }
  };

  // Eliminar un sector
  const handleRemoveSector = (sectorId: number) => {
    const updatedSectors = eventData.logistics.detailsLogistics.sectors.filter(
      (sector) => sector.sector_id !== sectorId
    );
    setSectors(updatedSectors);
  };

  // Alternar `isParciallyRented` de un sector
  const handleToggleChange = (sectorId: number) => {
    // Mapeamos los sectores en el estado global
    const updatedSectors = eventData.logistics.detailsLogistics.sectors.map(
      (sector) => {
        // Verificamos si el sector está en availableSectors y su is_partially_rented es true
        if (
          availableSectors.some(
            (availableSector) => availableSector.id === sectorId
          ) &&
          !sector.is_partially_rented
        ) {
          // Si el sector está en availableSectors, lo marcamos como 'true'
          return { ...sector, is_partially_rented: true };
        }

        // Si el sector no está en availableSectors, lo manejamos con la lógica original
        return sector.sector_id === sectorId
          ? { ...sector, is_partially_rented: !sector.is_partially_rented }
          : sector;
      }
    );

    // Actualizamos el estado con los sectores modificados
    setSectors(updatedSectors);
  };

  const handleSectorChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedSector(event.target.value as number);
  };

  const handleInputChangeAssembly = (
    key: keyof typeof eventData.logistics.assembly,
    value: string
  ) => {
    setLogisticsAssembly(key, value); // Adjust to use the appropriate setter method
  };

  const handleInputChangeDetails = (
    key: keyof typeof eventData.logistics.detailsLogistics,
    value: string
  ) => {
    setLogisticsDetails(key, value); // Adjust to use the appropriate setter method
  };

  const handleInputChangeDismantling = (
    key: keyof typeof eventData.logistics.dismantling,
    value: string
  ) => {
    setLogisticsDismantling(key, value); // Adjust to use the appropriate setter method
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
            <FormLabelComponent>
              Areas Arrendadas
              <Stack spacing={2} direction="column" alignItems="flex-start">
                {/* Container for Select and Add Button in the same line */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  {/* Select for choosing sectors */}
                  <FormControl fullWidth>
                    <StyledSelect
                      labelId="sector-select-label"
                      value={selectedSector || ""}
                      onChange={handleSectorChange}
                      displayEmpty
                      fullWidth
                      inputProps={{
                        "aria-hidden": undefined, // Ensure aria-hidden is not applied
                      }}
                    >
                      {sectorOptions.map((sector, index) => {
                        // Find the sector object from the available sectors
                        const sectorData = availableSectors.find(
                          (s) => s.id === sector.value
                        );

                        return (
                          <MenuItem
                            key={index}
                            value={sector.value}
                            disabled={!initialDate && !endDate}
                            sx={{
                              backgroundColor: sectorData
                                ?.sector_activities_ids?.map((sec) => {console.log(sec?.is_partially_rented)} )
                                ?  "transparent"
                                : "primary.light",
                            }}
                          >
                            {sector.label}
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
                {sectorsInGlobalState > 0 && (
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
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Ocupación total / parcial
                    </Typography>
                  </Box>
                )}

                {/* List of added sectors */}
                <List
                  sx={{
                    width: "100%",
                    bgcolor: sectorsInGlobalState ? "primary.light" : null,
                  }}
                >
                  {sectorsInGlobalState > 0 && (
                    <List sx={{ width: "100%" }}>
                      {eventData.logistics.detailsLogistics.sectors.map(
                        (sector, index) => (
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
                              <Switch
                                checked={sector.is_partially_rented}
                                onChange={() =>
                                  handleToggleChange(sector.sector_id)
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
                        )
                      )}
                    </List>
                  )}
                </List>
              </Stack>
            </FormLabelComponent>

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
