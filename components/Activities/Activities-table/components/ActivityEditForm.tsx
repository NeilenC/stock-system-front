import React, { ChangeEvent, useEffect } from "react";
import { Grid, MenuItem } from "@mui/material";
import { useActivityStore } from "../../../../zustand/activityStore"; // Asume que usas Zustand para manejar el estado
import { CustomAutocomplete, FormLabelComponent } from "../../../../commons/styled-components/CustomTextFields";
import { CustomTextFieldMaterial } from "../../../Materials/StyledMaterial";
import { ActivityState, activityStates, typeOfActivities, typeOfContracts } from "../../../../commons/activities-commons/DrawerBooking/enums";
import { Stack } from "rsuite";

const ActivityEditForm = ({ activityId  }: { activityId: number | null; }) => {
  const {updatedActivity, setActivity, fetchActivityById } = useActivityStore();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivity({ ...updatedActivity, [name]: value });
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

        {/* Tipo de Contrato */}
        <Grid item xs={12} sm={6}>
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
        </Grid>
        {/** Fecha Inicial */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Fecha Inicial</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="initial_date"
            type="date"
            value={updatedActivity?.initial_date || ""}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Fecha Final */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Fecha Final</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="end_date"
            type="date"
            value={updatedActivity?.end_date || ""}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Responsable */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Responsable</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="responsible_name"
            value={updatedActivity?.responsible_name || ""}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Teléfono del Responsable */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Teléfono del Responsable</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="responsible_phone"
            value={updatedActivity?.responsible_phone || ""}
            onChange={handleInputChange}
          />
        </Grid>

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
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Email del Responsable</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="responsible_email"
            value={updatedActivity?.responsible_email || ""}
            onChange={handleInputChange}
          />
        </Grid>



        {/** Lugar de Ensamblaje */}
        <Grid item xs={6}>
          <FormLabelComponent>Lugar de Ensamblaje</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="entry_place_assembly"
            value={updatedActivity?.entry_place_assembly || ""}
            onChange={handleInputChange}
          />
        </Grid>

       
      </Grid>
    </form>
  );
};

export default ActivityEditForm;
