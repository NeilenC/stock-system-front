import { Box, Collapse, FormControl, Grid, MenuItem } from "@mui/material";
import { useState } from "react";
import useEventStore from "../activity-hook/useEventStore";
import {
  CustomSelect,
  CustomTextField,
  FormLabelComponent,
} from "../../../styled-components/CustomTextFields";
import CustomDateTimePicker from "../../../styled-components/CustomDatePicker";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";

const GeneralInfoContent: React.FC = () => {
  const { eventData, setGeneralInfo } = useEventStore();
  const [openGeneral, setOpenGeneral] = useState(true);

  const handleToggleGeneral = () => setOpenGeneral(!openGeneral);

  const handleInputChange = (
    key: keyof typeof eventData.generalInfo.details,
    value: string
  ) => {
    setGeneralInfo(key, value);
  };

  const handleDateChange = (date: Date | null) => {
    if (date && !isNaN(date.getTime())) { // Verificar que la fecha sea válida
      const selectedDate = date.toISOString().split("T")[0]; 
      const selectedTime = date.toTimeString().split(" ")[0].substring(0, 5); 
      console.log("selected date", selectedDate, "time:", selectedTime);
      
      handleInputChange("dateEvent", selectedDate);
      handleInputChange("timeEvent", selectedTime);
    } else {
      console.error("Invalid date selected");
    }
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
                Fecha del evento
                <CustomDateTimePicker
                  value={
                    eventData.generalInfo.details.dateEvent
                      ? new Date(
                          `${eventData.generalInfo.details.dateEvent}T${eventData.generalInfo.details.timeEvent}`
                        )
                      : null
                  }
                  onChange={handleDateChange}
                  
                />
              </FormLabelComponent>
            </Grid>

            <Grid item xs={12}>
              <FormLabelComponent>
                Nombre del evento
                <CustomTextField
                  placeholder="Ingresa nombre del evento"
                  variant="outlined"
                  fullWidth
                  value={eventData.generalInfo.details.nameEvent}
                  onChange={(e) =>
                    handleInputChange("nameEvent", e.target.value)
                  }
                />
              </FormLabelComponent>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabelComponent>Tipo de Evento</FormLabelComponent>
                <CustomSelect
                  placeholder="Seleccionar tipo"
                  value={eventData.generalInfo.details.typeEvent}
                  onChange={(e:any) =>
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

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabelComponent>Tipo de Contratación</FormLabelComponent>
                <CustomSelect
                  placeholder="Seleccionar tipo"
                  value={eventData.generalInfo.details.typeContract}
                  onChange={(e:any) =>
                    handleInputChange("typeContract", e.target.value)
                  }
                >
                  <MenuItem value="Arrendamiento">Arrendamiento</MenuItem>
                  <MenuItem value="Llave en mano">Llave en mano</MenuItem>
                </CustomSelect>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormLabelComponent>
                Nombre en CWA
                <CustomTextField
                  placeholder="Ingresa nombre"
                  variant="outlined"
                  fullWidth
                  value={eventData.generalInfo.details.CWAname}
                  onChange={(e) =>
                    handleInputChange("CWAname", e.target.value)
                  }
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
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </>
  );
};

export default GeneralInfoContent;
