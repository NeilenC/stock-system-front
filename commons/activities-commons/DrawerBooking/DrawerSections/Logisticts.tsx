import { FC, useState } from "react";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";
import { Box, Collapse, MenuItem } from "@mui/material";
import {
  CustomSelect,
  CustomTextField,
  FormLabelComponent,
} from "../../../styled-components/CustomTextFields";

const LogisticsSection: React.FC = () => {
  const [openLogistics, setOpenLogistics] = useState(true);
  const [openDetalles, setOpenDetalles] = useState(true);
  const [openDesarme, setOpenDesarme] = useState(true);
  
  const handleToggleLogistics = () => setOpenLogistics(!openLogistics);
  const handleToggleDesarme = () => setOpenDesarme(!openDesarme);
  const handleToggleDetalles = () => setOpenDetalles(!openDetalles);
  return (
    <>
      <TitleComponent variant="h6" text={"Logística del Evento"} />
      {/* Armado */}
      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleLogistics}
          open={openLogistics}
          text={"Armado"}
        />
        <Collapse in={openLogistics}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
              Lugar de Ingreso
              <CustomTextField
                placeholder="Seleccionar área" // ACA VAN MAPEADOS TOOS LOS SECTORES
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Fecha
              <CustomTextField
                placeholder="Seleccionar fecha y hora "
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>
      {/* Desarme  */}

      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleDesarme}
          open={openDesarme}
          text={"Desarme"}
        />
        <Collapse in={openDesarme}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
              Lugar de Ingreso
              <CustomTextField
                placeholder="Seleccionar área" // ACA VAN MAPEADOS TOOS LOS SECTORES
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Fecha
              <CustomTextField
                placeholder="Seleccionar fecha y hora "
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Más Detalles  */}

      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleDetalles}
          open={openDetalles}
          text={"Detalles"}
        />
        <Collapse in={openDetalles}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
              Areas Arrendadas
              <CustomTextField
                placeholder="Seleccionar áreas" // ACA VAN MAPEADOS TOOS LOS SECTORES
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Horario de actividad en Predio
              <CustomTextField
                placeholder="Seleccionar la fecha "
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Ingreso al Público
              <CustomSelect
                fullWidth
                defaultValue=""
                placeholder="Seleccionar áreas"
              >
                <MenuItem value="parcial">sector 1</MenuItem>
                <MenuItem value="completa">sector 2</MenuItem>
              </CustomSelect>
              agregar notas
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default LogisticsSection;
