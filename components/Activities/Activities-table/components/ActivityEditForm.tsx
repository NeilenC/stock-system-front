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
  TextField,
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
import {
  CustomAutocomplete,
  StyledSelect,
} from "../../../../commons/activities-commons/DrawerBooking/DrawerSections/CustomTextFields";
import IconToImage from "../../../../commons/styled-components/IconImages";

const ActivityEditForm = ({ activityId }: { activityId: number | null }) => {
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const { activityToUpdate, setActivity, fetchActivityById } =  useActivityStore();
  const { sectorsToRent } = useSectors();

  const isDateOverlap = (
    start1: Date,
    end1: Date,
    start2: Date,
    end2: Date
  ) => {
    return start1 <= end2 && start2 <= end1;
  };

  const filteredSectors = sectorsToRent.filter((sector: SectorProps) => {
    //lista de IDs de los sectores ya ocupados en la actividad
    const occupiedSectorIds = activityToUpdate?.sector_activities_ids.map(
      (sectorInActivity) => sectorInActivity.sector.id
    ) || [];
  
    // Verificar si el sector actual no está en la lista de sectores ocupados
    return !occupiedSectorIds.includes(sector.id);
  });
  
  
  const availableSectors = useMemo(() => {
    if (activityToUpdate) {
      return filteredSectors.filter((sector: SectorProps) => {
        if (sector.sector_activities_ids?.length) {
            const sectorActivities = sector.sector_activities_ids;
  
            // Verifica si alguna actividad tiene solapamiento y si está parcialmente alquilada
            const isOverlappingAndPartiallyRented = sectorActivities.some((activity) =>
              isDateOverlap(
                new Date(activityToUpdate.initial_date), 
                new Date(activityToUpdate.end_date), 
                new Date(activity.activity.initial_date), 
                new Date(activity.activity.end_date) 
              ) && activity.is_partially_rented
            );
            return !isOverlappingAndPartiallyRented
        } 
        return true
      })
    } else {
      return sectorsToRent
    }
  }, [activityToUpdate, sectorsToRent])

  console.log("availableSectors",availableSectors)
  const sectorOptions = availableSectors.map((sector) => ({
    label: sector.name ,
    id: sector.id,
  }));

  const selectedSectors = 
    activityToUpdate?.sector_activities_ids?.map((sectorActivity) => ({
      sector_id: sectorActivity.sector.id,
      label: sectorActivity.sector?.name || sectorActivity.name,
      is_partially_rented: sectorActivity.is_partially_rented ,
      square_meters_rented: sectorActivity.square_meters_rented,
    })) || [];


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activityToUpdate, [name]: value });
  };

  const handleSectorChange = (sector_id: number | null) => {
    // console.log("sector_id", sector_id)
    if (!sector_id) return;

    const sector = sectorOptions.find((option) => option.id === sector_id);

    if (sector) {
      const isSectorAlreadyAdded = activityToUpdate?.sector_activities_ids?.some(
        (s) => s.sector.id === sector.id
      );

      if (!isSectorAlreadyAdded) {
        const updatedSectors = [
          ...(activityToUpdate?.sector_activities_ids || []),
          {
            is_partially_rented : false,
            square_meters_rented: 0, 
            sector: {
            id: sector.id,
            name: sector.label,
          }},
        ];


        const newActivity = {
          ...activityToUpdate,
          sector_activities_ids: updatedSectors,
        };
        // console.log("newActivity", newActivity);

        setActivity(newActivity); // Llamada al setter
        setSelectedSector(null); // Reinicia el selector después de agregar

        setSelectedSector(null); // Reinicia el selector después de agregar
      }
    }
  };


  const handleRemoveSector = (sectorId: number) => {
    const d = activityToUpdate?.sector_activities_ids
    const updatedSectors = d?.filter(
      (sector) => sector.sector.id !== sectorId
    );
    setActivity({ ...activityToUpdate, sector_activities_ids: updatedSectors });
  };

  const handleSectorDetailChange = (
    sectorId: number,
    field: string,
    value: any
  ) => {


    const updatedSectors =
      activityToUpdate?.sector_activities_ids?.map((sector) =>
        sector.sector.id === sectorId ? { ...sector, [field]: value } : sector
      ) || [];

      setActivity({ ...activityToUpdate, sector_activities_ids: updatedSectors });
      
    };
    // console.log("sectorId", activityToUpdate?.sector_activities_ids)
  

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
    <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
      <Grid container spacing={2}>
        {/** Nombre de la Actividad */}
        <Grid item xs={12}>
          <FormLabelComponent>Nombre de la Actividad</FormLabelComponent>
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
                  displayEmpty
                  fullWidth
                  inputProps={{
                    "aria-hidden": undefined, // Asegura que aria-hidden no se aplique
                  }}
                  onChange={(e: any) => setSelectedSector(e.target.value)} // Captura el valor del sector seleccionado
                >
                  {sectorOptions.map((sector, index) => (
                    <MenuItem key={index} value={sector.id}>
                      {sector.label}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>

              {/* Botón de agregar sector con Tooltip */}
              <Tooltip title="Agregar Sector" arrow>
                <span>
                  <IconToImage
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
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Ocupación total / parcial
                  </Typography>
                </Box>
                <List sx={{ width: "100%" }}>
                  {selectedSectors.map((sector, index) => (
                    <ListItem
                      key={index}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <ListItemText primary={sector.label} />
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Switch
                           checked={sector.is_partially_rented || false} 
                          onChange={(e) =>
                            handleSectorDetailChange(
                              sector.sector_id,
                              "is_partially_rented",
                              e.target.checked
                            )
                          }
                        />

                        <Tooltip title="Eliminar sector">
                          <IconToImage
                            icon={removeIcon}
                            w={20}
                            h={20}
                            onClick={() => handleRemoveSector(sector.sector_id)}
                            sx={{ cursor: "pointer" }}
                          />
                        </Tooltip>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Stack>
        </Grid>

     
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Tipo de Actividad</FormLabelComponent>
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
            value={activityToUpdate?.state || ""}
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
