import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { useActivityStore } from "../../../../zustand/activityStore"; // Asume que usas Zustand para manejar el estado
import { FormLabelComponent } from "../../../../commons/styled-components/CustomTextFields";
import { CustomTextFieldMaterial } from "../../../Materials/StyledMaterial";
import {
  ActivityState,
  typeOfActivities,
} from "../../../../commons/activities-commons/DrawerBooking/enums";
import CustomDateTimePicker from "../../../../commons/styled-components/CustomeDateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import removeIcon from "../../../../public/close-black.png";
import add from "../../../../public/add.png";
import useSectors, { SectorProps } from "../../../../hooks/useSectors";
import { StyledSelect } from "../../../../commons/activities-commons/DrawerBooking/DrawerSections/CustomTextFields";
import ImageToIcon from "../../../../commons/styled-components/IconImages";
import { isDateOverlap } from "../../functions";

const ActivityEditForm = ({ activityId }: { activityId: number | null }) => {
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const { activityToUpdate, setActivity, fetchActivityById } =
    useActivityStore();
  const { sectorsToRent } = useSectors();
  const initialDate = activityToUpdate?.initial_date;
  const endDate = activityToUpdate?.end_date;

  const filteredSectors = sectorsToRent.filter((sector: SectorProps) => {
    //lista de  los sectores ya ocupados en la actividad
    const addedSectorsInList =
      activityToUpdate?.sector_activities_ids.map(
        (sectorInActivity) => sectorInActivity.sector.id
      ) || [];

    // Verifica si el sector actual no está en la lista de sectores ocupados
    return !addedSectorsInList.includes(sector.id);
  });

  const availableSectors = useMemo(() => {
    if (activityToUpdate) {
      return filteredSectors.filter((sector: SectorProps) => {
        if (sector.sector_activities_ids?.length) {
          const sectorActivities = sector.sector_activities_ids;
          // Verifica si alguna actividad tiene solapamiento y si está parcialmente alquilada
          const isOverlappingAndPartiallyRented = sectorActivities.some(
            (activity) =>
              isDateOverlap(
                new Date(activityToUpdate.initial_date),
                new Date(activityToUpdate.end_date),
                new Date(activity.activity?.initial_date),
                new Date(activity.activity?.end_date)
              ) && activity.is_partially_rented
          );
          return isOverlappingAndPartiallyRented;
        }
        return true;
      });
    } else {
      return filteredSectors;
    }
  }, [initialDate, endDate, activityToUpdate, sectorsToRent]);

  const selectedSectors =
    activityToUpdate?.sector_activities_ids?.map((sectorActivity) => ({
      sector_id: sectorActivity.sector.id,
      label: sectorActivity.sector?.name || sectorActivity.name,
      is_partially_rented: sectorActivity.is_partially_rented,
      toggle_partially_rented: sectorActivity.toggle_partially_rented,
      square_meters_rented: sectorActivity.square_meters_rented,
    })) || [];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activityToUpdate, [name]: value });
  };

  const handleSectorChange = (sector_id: number | null) => {
    if (!sector_id || !activityToUpdate) return;

    const sector = availableSectors.find((s) => s.id === sector_id);
    if (!sector) return;

    // console.log("sector", sector);
    const sectorActivities = sector.sector_activities_ids;

    const isOverlapAndPartiallyRented = sectorActivities.some((activity) => {
      return (
        isDateOverlap(
          new Date(activityToUpdate.initial_date),
          new Date(activityToUpdate.end_date),
          new Date(activity.activity.initial_date),
          new Date(activity.activity.end_date)
        ) && activity.is_partially_rented
      );
    });

    const updatedSectors = [
      ...(activityToUpdate.sector_activities_ids || []),
      {
        is_partially_rented: isOverlapAndPartiallyRented,
        square_meters_rented: 0,
        toggle_partially_rented: false,
        sector: { id: sector.id, name: sector.name },
      },
    ];

    setActivity({ ...activityToUpdate, sector_activities_ids: updatedSectors });
    setSelectedSector(null);
  };

  const handleRemoveSector = (sectorId: number) => {
    const d = activityToUpdate?.sector_activities_ids;
    const updatedSectors = d?.filter((sector) => sector.sector.id !== sectorId);
    setActivity({ ...activityToUpdate, sector_activities_ids: updatedSectors });
  };

  const handleToggleChange = (
    sectorId: number,
    togglePartiallyRented: boolean
  ) => {
    const updatedSectors = activityToUpdate?.sector_activities_ids.map(
      (sector: any) => {
        // Si el sector no está en availableSectors, lo manejamos con la lógica original
        return sector.sector.id === sectorId
          ? { ...sector, toggle_partially_rented: togglePartiallyRented }
          : sector;
      }
    );
    setActivity({
      ...activityToUpdate,
      sector_activities_ids: updatedSectors,
      toggle_partially_rented: togglePartiallyRented,
    });
  };

  // Formatear fechas
  const handleDateChange = (keyDate: string, date: Date | null) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setActivity({ ...activityToUpdate, [keyDate]: formattedDate });
  };

  const handleTimeChange = (keyTime: string, time: Dayjs | null) => {
    const formattedTime = time ? time.format("HH:mm") : null;
    setActivity({ ...activityToUpdate, [keyTime]: formattedTime });
  };

  // Cargar datos de la actividad
  useEffect(() => {
    if (activityId) fetchActivityById(activityId);
  }, [activityId]);

  return (
    <Box  sx={{
      maxHeight: "500px",
      overflow: "auto",
      scrollbarWidth: "thin", // Para navegadores Firefox
      scrollbarColor: "#888 ", // Para navegadores Firefox
      "&::-webkit-scrollbar": {
        width: "8px", // Ancho del scrollbar
      },

   
    }}>
      <Grid container spacing={2}>
        {/** Nombre de la Actividad */}
        <Grid item xs={12}>
          <FormLabelComponent>Nombre del Evento</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="activity_name"
            value={activityToUpdate?.activity_name || ""}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Fecha Inicial */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Fecha Inicial</FormLabelComponent>
          <CustomDateTimePicker
            value={
              activityToUpdate?.initial_date && activityToUpdate?.initial_time
                ? dayjs(
                    `${activityToUpdate.initial_date} ${activityToUpdate.initial_time}`
                  )
                : null
            }
            onChange={(newDate: Dayjs | null) => {
              if (newDate) {
                handleDateChange("initial_date", newDate.toDate());
                handleTimeChange("initial_time", newDate);
              } else {
                handleDateChange("initial_date", null);
                handleTimeChange("initial_time", null);
              }
            }}
            withTime={true}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Apertura al público</FormLabelComponent>
          <CustomDateTimePicker
            value={
              activityToUpdate?.opening_date && activityToUpdate?.opening_time
                ? dayjs(
                    `${activityToUpdate.opening_date} ${activityToUpdate.opening_time}`
                  )
                : null
            }
            onChange={(newDate: Dayjs | null) => {
              if (newDate) {
                handleDateChange("opening_date", newDate.toDate());
                handleTimeChange("opening_time", newDate);
              } else {
                handleDateChange("opening_date", null);
                handleTimeChange("opening_time", null);
              }
            }}
            withTime={true}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Cierre al público</FormLabelComponent>
          <CustomDateTimePicker
            value={
              activityToUpdate?.closing_date && activityToUpdate?.closing_time
                ? dayjs(
                    `${activityToUpdate.closing_date} ${activityToUpdate.closing_time}`
                  )
                : null
            }
            onChange={(newDate: Dayjs | null) => {
              if (newDate) {
                handleDateChange("closing_date", newDate.toDate());
                handleTimeChange("closing_time", newDate);
              } else {
                handleDateChange("closing_date", null);
                handleTimeChange("closing_time", null);
              }
            }}
            withTime={true}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Fin del contrato</FormLabelComponent>
          <CustomDateTimePicker
            value={
              activityToUpdate?.end_date && activityToUpdate?.end_time
                ? dayjs(
                    `${activityToUpdate.end_date} ${activityToUpdate.end_time}`
                  )
                : null
            }
            onChange={(newDate: Dayjs | null) => {
              if (newDate) {
                handleDateChange("end_date", newDate.toDate());
                handleTimeChange("end_time", newDate);
              } else {
                handleDateChange("end_date", null);
                handleTimeChange("end_time", null);
              }
            }}
            withTime={true}
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabelComponent>Áreas Arrendadas</FormLabelComponent>
          <Stack spacing={2} direction="column" alignItems="flex-start">
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
                  value={selectedSector || ""}
                  onChange={(e) => setSelectedSector(Number(e.target.value))}
                >
                  {availableSectors.map((sector) => {
                    const isPartiallyRented =
                      sector?.sector_activities_ids?.some(
                        (activity) =>
                          isDateOverlap(
                            new Date(initialDate as string),
                            new Date(endDate as string),
                            new Date(activity.activity?.initial_date),
                            new Date(activity.activity?.end_date)
                          ) && activity.is_partially_rented
                      );
                    return (
                      <MenuItem
                        key={sector.id}
                        value={sector.id}
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
                            <span style={{ color: "#888", fontSize: "0.9em" }}>
                              Disponibilidad parcial
                            </span>
                          )}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </StyledSelect>
              </FormControl>

              {/* Botón de agregar sector con Tooltip */}
              <Tooltip title="Agregar Sector" arrow>
                <span>
                  <ImageToIcon
                    icon={add}
                    w={24}
                    h={24}
                    onClick={() => handleSectorChange(selectedSector)}
                    sx={{
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  />
                </span>
              </Tooltip>
            </Box>

            {selectedSectors.length > 0 && (
              <>
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
                <List sx={{ width: "100%", bgcolor: "primary.light" }}>
                  {selectedSectors.map((sector, index) => {
                    return (
                      <ListItem
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <ListItemText primary={sector.label} />
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
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
                            onChange={(e) =>
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

                          <Tooltip title="Eliminar sector">
                            <ImageToIcon
                              icon={removeIcon}
                              w={20}
                              h={20}
                              onClick={() =>
                                handleRemoveSector(sector.sector_id)
                              }
                              sx={{ cursor: "pointer" }}
                            />
                          </Tooltip>
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Tipo de Evento</FormLabelComponent>
          <CustomTextFieldMaterial
            fullWidth
            margin="dense"
            name="type_activity"
            value={activityToUpdate?.type_activity || ""}
            onChange={handleInputChange}
            select
          >
            {typeOfActivities.map((activity, index) => (
              <MenuItem key={index} value={activity}>
                {activity}
              </MenuItem>
            ))}
          </CustomTextFieldMaterial>
        </Grid>

        {/* Estado */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Estado</FormLabelComponent>
          <CustomTextFieldMaterial
            fullWidth
            margin="dense"
            name="state"
             value={activityToUpdate?.state || ''}
            onChange={handleInputChange}
            select
          >
            {Object.values(ActivityState).map((state, index) => (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </CustomTextFieldMaterial>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivityEditForm;
