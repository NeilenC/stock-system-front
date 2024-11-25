import React, { ChangeEvent, useEffect } from "react";
import { Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useActivityStore } from "../../../../zustand/activityStore"; // Asume que usas Zustand para manejar el estado
import { FormLabelComponent } from "../../../../commons/styled-components/CustomTextFields";
import { CustomTextFieldMaterial } from "../../../Materials/StyledMaterial";
import {
  ActivityState,
  typeOfActivities,
} from "../../../../commons/activities-commons/DrawerBooking/enums";
import CustomDateTimePicker from "../../../../commons/styled-components/CustomeDateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import useSectors from "../../../../hooks/useSectors";
import { CustomAutocomplete } from "../../../../commons/activities-commons/DrawerBooking/DrawerSections/CustomTextFields";
interface Activity {
  initial_date: string | null;
  opening_date: string | null;
  closing_date: string | null;
  end_date: string | null;
  initial_time: string | null;
  opening_time: string | null;
  closing_time: string | null;
  end_time: string | null;
}
const ActivityEditForm = ({ activityId }: { activityId: number | null }) => {
  const { updatedActivity, setActivity, fetchActivityById } =
    useActivityStore();
  const { excludedSectors } = useSectors();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivity({ ...updatedActivity, [name]: value });
  };

  const sectorOptions = excludedSectors
    .filter((sector: any) => sector.id)
    .map((sector: any) => ({
      label: sector.name,
      id: sector.id,
    }));

  // Preprocesar los sectores seleccionados para el Autocomplete
  const selectedSectors =
    updatedActivity?.sector_activities_ids?.map((sectorActivity: any) => ({
      label: sectorActivity.sector?.name,
      id: sectorActivity.sector?.id,
    })) || [];

  // Manejar selección de sectores
  const handleSectorSelect = (event: any, newValue: any[]) => {
    // Actualizar la actividad con los sectores seleccionados
    setActivity({
      ...updatedActivity,
      sector_activities_ids: newValue.map((sector) => ({
        sector: { id: sector.id, name: sector.label }, // Mantén el formato completo
      })),
    });
  };
console.log("selectedSectors", selectedSectors)

  const handleDateChange = (keyDate: keyof Activity, date: Date | null) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setActivity({ ...updatedActivity, [keyDate]: formattedDate });
    } else {
      // En caso de que la fecha sea null, actualiza el campo como null
      setActivity({ ...updatedActivity, [keyDate]: null });
    }
  };
  const handleTimeChange = (keyTime: keyof Activity, time: Dayjs | null) => {
    if (time) {
      const formattedTime = time.format("HH:mm"); // Ajusta el formato a las horas
      setActivity({ ...updatedActivity, [keyTime]: formattedTime });
    } else {
      setActivity({ ...updatedActivity, [keyTime]: null });
    }
  };
  useEffect(() => {
    if (activityId) fetchActivityById(activityId);
  }, [activityId]);

  return (
    <form>
      <Grid container spacing={2}>
        {/** Nombre de la Actividad */}
        <Grid item xs={12}>
          <FormLabelComponent>Nombre de la Actividad</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="activity_name"
            value={updatedActivity?.activity_name || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabelComponent>Áreas Arrendadas</FormLabelComponent>
          <Stack spacing={2} direction="column" alignItems="flex-start">
            <CustomAutocomplete
              options={sectorOptions} // Lista de sectores disponibles
              value={selectedSectors}
              getOptionLabel={(option: any) => option.label} // Mostrar el nombre del sector
              onChange={handleSectorSelect} // Manejador para actualizar el estado
              multiple // Permitir múltiples sectores seleccionados
              renderInput={(params: any) => <TextField {...params} />}
            />
          </Stack>
        </Grid>

        {/* Tipo de Contrato */}
        {/* <Grid item xs={12} sm={6}>
          <FormLabelComponent>Tipo de Contrato</FormLabelComponent>
          <CustomTextFieldMaterial
            fullWidth
            margin="dense"
            name="type_of_contract"
            value={updatedActivity?.type_of_contract || ""}
            onChange={handleInputChange}
            select
          >
            {typeOfContracts.map((contract, index) => (
              <MenuItem key={index} value={contract}>
                {contract}
              </MenuItem>
            ))}
          </CustomTextFieldMaterial>
        </Grid> */}
        {/** Fecha Inicial */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Fecha Inicial</FormLabelComponent>
          <CustomDateTimePicker
            value={
              updatedActivity?.initial_date && updatedActivity?.initial_time
                ? dayjs(
                    `${updatedActivity.initial_date} ${updatedActivity.initial_time}`
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
              updatedActivity?.opening_date && updatedActivity?.opening_time
                ? dayjs(
                    `${updatedActivity.opening_date} ${updatedActivity.opening_time}`
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
              updatedActivity?.closing_date && updatedActivity?.closing_time
                ? dayjs(
                    `${updatedActivity.closing_date} ${updatedActivity.closing_time}`
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
              updatedActivity?.end_date && updatedActivity?.end_time
                ? dayjs(
                    `${updatedActivity.end_date} ${updatedActivity.end_time}`
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

        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Tipo de Actividad</FormLabelComponent>
          <CustomTextFieldMaterial
            fullWidth
            margin="dense"
            name="type_activity"
            value={updatedActivity?.type_activity || ""}
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
            value={updatedActivity?.state || ""}
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
        {/** Fecha Final */}
        {/* <Grid item xs={12} sm={6}>
          <FormLabelComponent>Fecha Final</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="end_date"
            type="date"
            value={updatedActivity?.end_date || ""}
            onChange={handleInputChange}
          />
        </Grid> */}

        {/** Responsable */}
        {/* <Grid item xs={12} sm={6}>
          <FormLabelComponent>Responsable</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="responsible_name"
            value={updatedActivity?.responsible_name || ""}
            onChange={handleInputChange}
          />
        </Grid> */}

        {/** Teléfono del Responsable */}
        {/* <Grid item xs={12} sm={6}>
          <FormLabelComponent>Teléfono del Responsable</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="responsible_phone"
            value={updatedActivity?.responsible_phone || ""}
            onChange={handleInputChange}
          />
        </Grid> */}

        {/* <FormLabelComponent>
              Areas Arrendadas
              <Stack spacing={10} direction="column" alignItems="flex-start">
                <CustomAutocomplete
                  options={updatedActivity.}
                  getOptionLabel={(option: any) => option.label}
                  onChange={handleSectorSelect}
                  multiple
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Seleccionar Sectores"
                      variant="outlined"
                      sx={{pb:2}}
                    />
                  )}
                />
              </Stack>
            </FormLabelComponent> */}

        {/** Email del Responsable */}
        {/* <Grid item xs={12} sm={6}>
          <FormLabelComponent>Email del Responsable</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="responsible_email"
            value={updatedActivity?.responsible_email || ""}
            onChange={handleInputChange}
          />
        </Grid> */}

        {/** Lugar de Ensamblaje */}
        {/* <Grid item xs={6}>
          <FormLabelComponent>Lugar de Ensamblaje</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="entry_place_assembly"
            value={updatedActivity?.entry_place_assembly || ""}
            onChange={handleInputChange}
          />
        </Grid> */}
      </Grid>
    </form>
  );
};

export default ActivityEditForm;
