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
  FormLabelComponent,
} from "./CustomTextFields";
import { SecondTitleComponent, TitleComponent } from "./TitlesComponent";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import calendar from "../../../../public/calendar.png";
import IconToImage from "../../../styled-components/IconImages";
import CustomDateTimePicker from "../../../styled-components/CustomeDateTimePicker";
import { ActivityState } from "../enums";

const GeneralInfoContent: React.FC = () => {
  const { eventData, setGeneralInfo } = useEventStore();
  const [openGeneral, setOpenGeneral] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({}); // Para almacenar errores por campo


  const handleToggleGeneral = () => setOpenGeneral(!openGeneral);

  const handleInputChange = (
    key: keyof typeof eventData.generalInfo.details,
    value: string
  ) => {
    setGeneralInfo(key, value);
  };


  const handleDateChange = (
    keyDate: keyof typeof eventData.generalInfo.details,
    keyTime: keyof typeof eventData.generalInfo.details,
    date: Date | null
  ) => {
    if (date && !isNaN(date.getTime())) {
      const selectedDate = date.toISOString().split("T")[0];
      const selectedTime = date.toTimeString().split(" ")[0].substring(0, 5);

      // Validar fechas antes de actualizar
      const isValid = validateDates(keyDate, date);
      if (isValid) {
        setErrors((prevErrors) => ({ ...prevErrors, [keyDate]: "" }));
        handleInputChange(keyDate, selectedDate);
        handleInputChange(keyTime, selectedTime);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [keyDate]: "La fecha seleccionada no es válida",
        }));
      }
    } else {
      console.error("Invalid date selected");
    }
  };

  const validateDates = (keyDate: string, date: Date): boolean => {
    const { initialDate, openingDate, closingDate, endDate } =
      eventData.generalInfo.details;
  
    // Parsear todas las fechas en objetos Date válidos
    const dateOrder: Record<string, Date> = {
      initialDate: initialDate ? new Date(initialDate) : new Date(0),
      openingDate: openingDate ? new Date(openingDate) : new Date(0),
      closingDate: closingDate ? new Date(closingDate) : new Date(0),
      endDate: endDate ? new Date(endDate) : new Date(0),
    };
  
    // Actualiza la fecha que está cambiando
    dateOrder[keyDate] = date;
  
    // Validar orden lógico de fechas
    if (
      dateOrder.initialDate.getTime() === 0 || // Evitar validaciones cuando falta initialDate
      (dateOrder.initialDate <= dateOrder.openingDate || !openingDate) &&
      (dateOrder.openingDate <= dateOrder.closingDate || !closingDate) &&
      (dateOrder.closingDate <= dateOrder.endDate || !endDate)
    ) {
      return true; // Fechas son válidas
    }
  
    return false; // Alguna fecha está fuera de orden
  };
  

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
              <FormLabelComponent>
                Nombre del evento
                <CustomTextField
                  placeholder="Ingresa nombre del evento"
                  variant="outlined"
                  fullWidth
                  value={eventData.generalInfo.details.nameEvent}
                  onChange={(e: any) =>
                    handleInputChange("nameEvent", e.target.value)
                  }
                />
              </FormLabelComponent>
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponent>
                Fecha inicio del evento
                <CustomDateTimePicker
                  value={
                    eventData.generalInfo.details.initialDate
                      ? dayjs(eventData.generalInfo.details.initialDate)
                      : null
                  }
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
              </FormLabelComponent>
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponent>
                Fecha Apertura al público
                <CustomDateTimePicker
                  value={
                    eventData.generalInfo.details.openingDate
                      ? dayjs(eventData.generalInfo.details.openingDate)
                      : null
                  }
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
              </FormLabelComponent>
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponent>
                Fecha Cierre al público
                <CustomDateTimePicker
                  value={
                    eventData.generalInfo.details.closingDate
                      ? dayjs(eventData.generalInfo.details.closingDate)
                      : null
                  }
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
              </FormLabelComponent>
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponent>
                Fecha finalización
                <CustomDateTimePicker
                  value={
                    eventData.generalInfo.details.endDate
                      ? dayjs(eventData.generalInfo.details.endDate)
                      : null
                  }
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
              </FormLabelComponent>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabelComponent>Tipo de Evento</FormLabelComponent>
                <CustomSelect
                  placeholder="Seleccionar tipo"
                  value={eventData.generalInfo.details.typeEvent}
                  onChange={(e: any) =>
                    handleInputChange("typeEvent", e.target.value)
                  }
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

                        <Grid item xs={6} sx={{pb:2.5}}> 
              <FormControl fullWidth>
                <FormLabelComponent>Estado del Evento</FormLabelComponent>
                <CustomSelect
                  placeholder="Seleccionar tipo"
                  value={eventData.generalInfo.details.state}
                  onChange={(e: any) =>
                    handleInputChange("state", e.target.value)
                  }
                >
                   {Object.values(ActivityState).map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>


            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabelComponent>Tipo de Contratación</FormLabelComponent>
                <CustomSelect
                  placeholder="Seleccionar tipo"
                  value={eventData.generalInfo.details.typeContract}
                  onChange={(e: any) =>
                    handleInputChange("typeContract", e.target.value)
                  }
                >
                  <MenuItem value="Arrendamiento">Arrendamiento</MenuItem>
                  <MenuItem value="Llave en mano">Llave en mano</MenuItem>
                </CustomSelect>
              </FormControl>
            </Grid> */}

            {/* <Grid item xs={6}>
              <FormLabelComponent>
                Nombre en CWA
                <CustomTextField
                  placeholder="Ingresa nombre"
                  variant="outlined"
                  fullWidth
                  value={eventData.generalInfo.details.CWAname}
                  onChange={(e) => handleInputChange("CWAname", e.target.value)}
                />
              </FormLabelComponent>
            </Grid>

            <Grid item xs={6}>
              <FormLabelComponent>
                Número en CWA
                <CustomTextField
                  placeholder="Ingresa número"
                  variant="outlined"
                  fullWidth
                  value={eventData.generalInfo.details.CWAnumber}
                  onChange={(e) =>
                    handleInputChange("CWAnumber", e.target.value)
                  }
                />
              </FormLabelComponent>
            </Grid> */}
          </Grid>
        </Collapse>
      </Box>
    </>
  );
};

export default GeneralInfoContent;
