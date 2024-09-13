import { Box, Collapse, FormControl, Grid, MenuItem } from "@mui/material";
import { SectionComponentProps } from "../models/DrawerBookingProps";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";
import { CustomSelect, CustomTextField, FormLabelComponent } from "../../../styled-components/CustomTextFields";
import { useState } from "react";



  const GeneralInfoContent: React.FC  = () => {
  const [openGeneral, setOpenGeneral] = useState(true);
  const handleToggleGeneral = () => setOpenGeneral(!openGeneral);
    return (  
    <>  <TitleComponent variant="h6" text={"Información general"} />
    <Box sx={{ marginBottom: 2 }}>
      <SecondTitleComponent
        onClick={handleToggleGeneral}
        open={openGeneral}
        text={"Detalles"}
      />
      <Collapse in={openGeneral}>
        <Grid sx={{ marginTop: "24px" }}>
          <FormLabelComponent>
            Fecha del evento
            <CustomTextField
              placeholder="Seleccione una fecha"
              fullWidth
            />
          </FormLabelComponent>
          <FormLabelComponent>
            Nombre del evento
            <CustomTextField
              placeholder="Ingresa nombre del evento"
              variant="outlined"
              fullWidth
            />
          </FormLabelComponent>
          <Grid container xs={12} spacing={1}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabelComponent>Tipo de Evento</FormLabelComponent>
                <CustomSelect
                  defaultValue=""
                  placeholder="Seleccionar tipo"
                  label="Seleccionar tipo"
                >
                  <MenuItem value="propios">Propios</MenuItem>
                  <MenuItem value="ferias">Ferias</MenuItem>
                  <MenuItem value="convenciones">Convenciones</MenuItem>
                  <MenuItem value="congresos">Congresos</MenuItem>
                </CustomSelect>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabelComponent>
                  Tipo de Contratación
                </FormLabelComponent>
                <CustomSelect
                  defaultValue=""
                  placeholder="Seleccionar tipo"
                >
                  <MenuItem value="parcial">Parcial</MenuItem>
                  <MenuItem value="completa">Completa</MenuItem>
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
                />
              </FormLabelComponent>
            </Grid>
            <Grid item xs={6}>
              <FormLabelComponent>
                Número en CWA
                <CustomTextField
                  placeholder="NIngresa número"
                  variant="outlined"
                  fullWidth
                />
              </FormLabelComponent>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
    </>)
  }
  
  export default GeneralInfoContent;
  