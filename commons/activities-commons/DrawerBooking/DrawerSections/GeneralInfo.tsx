import {
  Box,
  Collapse,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useEventStore from "../activity-hook/useEventStore";
import {
  CustomSelect,
  CustomTextField,
  FormLabelComponentWithError,
} from "./CustomTextFields";
import { SecondTitleComponent, TitleComponent } from "./TitlesComponent";
import dayjs, { Dayjs } from "dayjs";
import CustomDateTimePicker from "../../../styled-components/CustomeDateTimePicker";
import { ActivityState } from "../enums";
import { useEventValidation } from "../context/EventValidationContext";

export interface ComponentsProps {
  inputErrors: Record<string, string>;
}

const GeneralInfoContent: React.FC<ComponentsProps> = ({
  inputErrors,
}) => {
  const { eventData, errors, handleInputChange, handleDateChange } = useEventValidation(); 
  const [openGeneral, setOpenGeneral] = useState(true);

  const handleToggleGeneral = () => setOpenGeneral(!openGeneral);

  return (
    <>
      <TitleComponent variant="h6" text="Información general" />
      <Box>
        <SecondTitleComponent
          onClick={handleToggleGeneral}
          open={openGeneral}
          text="Detalles"
        />
        <Collapse in={openGeneral}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabelComponentWithError error={!!inputErrors.activity_name}>
                Nombre del Evento
              </FormLabelComponentWithError>
              <CustomTextField
                placeholder="Ingresa el nombre del evento"
                variant="outlined"
                fullWidth
                value={eventData.generalInfo.details.nameEvent}
                onChange={(e: any) =>
                  handleInputChange("nameEvent", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponentWithError error={!!inputErrors.initial_date}>
                Fecha inicio / Inicio Armado{" "}
              </FormLabelComponentWithError>
              <CustomDateTimePicker
                value={eventData.generalInfo.details.initialDate
                  ? dayjs(eventData.generalInfo.details.initialDate)
                  : null}
                onChange={(newValue: Dayjs | null) =>
                  handleDateChange(
                    "initialDate",
                    "initialTime",
                    newValue ? newValue.toDate() : null
                  )
                }
                error={!!errors.initialDate}
                helperText={errors.initialDate}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponentWithError error={!!inputErrors.opening_date}>
                Fecha Apertura al público / Fin Armado
              </FormLabelComponentWithError>
              <CustomDateTimePicker
                value={eventData.generalInfo.details.openingDate
                  ? dayjs(eventData.generalInfo.details.openingDate)
                  : null}
                onChange={(newValue: Dayjs | null) =>
                  handleDateChange(
                    "openingDate",
                    "openingTime",
                    newValue ? newValue.toDate() : null
                  )
                }
                error={!!errors.openingDate}
                helperText={errors.openingDate}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponentWithError error={!!inputErrors.closing_date}>
                Fecha Cierre al público / Inicio Desarme
              </FormLabelComponentWithError>
              <CustomDateTimePicker
                value={eventData.generalInfo.details.closingDate
                  ? dayjs(eventData.generalInfo.details.closingDate)
                  : null}
                onChange={(newValue: Dayjs | null) =>
                  handleDateChange(
                    "closingDate",
                    "closingTime",
                    newValue ? newValue.toDate() : null
                  )
                }
                error={!!errors.closingDate}
                helperText={errors.closingDate}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponentWithError error={!!inputErrors.end_date}>
                Fecha finalización / Fin Desarme
              </FormLabelComponentWithError>
              <CustomDateTimePicker
                value={eventData.generalInfo.details.endDate
                  ? dayjs(eventData.generalInfo.details.endDate)
                  : null}
                onChange={(newValue: Dayjs | null) =>
                  handleDateChange(
                    "endDate",
                    "endTime",
                    newValue ? newValue.toDate() : null
                  )
                }
                error={!!errors.endDate}
                helperText={errors.endDate}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabelComponentWithError error={!!inputErrors.type_activity}>
                  Tipo de Evento
                </FormLabelComponentWithError>
                <CustomSelect
                  placeholder="Seleccionar tipo"
                  value={eventData.generalInfo.details.typeEvent}
                  onChange={(e: any) =>
                    handleInputChange("typeEvent", e.target.value)
                  }
                  sx={{ marginTop: '10px', marginBottom: '16px' }}
                >
                  <MenuItem value="Feria">Feria</MenuItem>
                  <MenuItem value="Feria propia">Feria propia</MenuItem>
                  <MenuItem value="Exposición">Exposición</MenuItem>
                  <MenuItem value="Evento">Evento</MenuItem>
                  <MenuItem value="Evento especial">Evento especial</MenuItem>
                  <MenuItem value="Convención">Convención</MenuItem>
                  <MenuItem value="Congreso">Congreso</MenuItem>
                  <MenuItem value="Cesión solidaria de espacio">
                    Cesión solidaria de espacio
                  </MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </CustomSelect>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ pb: 2.5 }}>
              <FormControl fullWidth>
                <FormLabelComponentWithError error={!!inputErrors.state}>
                  Estado del Evento
                </FormLabelComponentWithError>
                <CustomSelect
                  placeholder="Seleccionar tipo"
                  value={eventData.generalInfo.details.state}
                  onChange={(e: any) =>
                    handleInputChange("state", e.target.value)
                  }
                  sx={{ marginTop: '10px', marginBottom: '16px' }}
                >
                  {Object.values(ActivityState).map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </>
  );
};

export default GeneralInfoContent;
