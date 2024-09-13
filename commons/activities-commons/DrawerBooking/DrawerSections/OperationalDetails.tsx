import { useState } from "react";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";
import { Box, Collapse, MenuItem } from "@mui/material";
import {
  CustomSelect,
  CustomTextField,
  FormLabelComponent,
} from "../../../styled-components/CustomTextFields";

const OperationalDetails: React.FC = () => {
  const [openInformation, setOpenInformation] = useState(true);
  const [openBoleteria, setOpenBoleteria] = useState(true);

  const handleToggleInformation = () => setOpenInformation(!openInformation);
  const handleToggleBoleteria = () => setOpenBoleteria(!openBoleteria);

  return (
    <>
      <TitleComponent variant="h6" text={"Detalles Operativos del Evento"} />

      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleInformation}
          open={openInformation}
          text={"Información"}
        />
        <Collapse in={openInformation}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
              Cantidad de Asistentes / Expositores
              <CustomTextField
                placeholder="Ingrese cantidad"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Boletería */}

      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleBoleteria}
          open={openBoleteria}
          text={"Boletería"}
        />
        <Collapse in={openBoleteria}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
              Valor
              <CustomTextField
                placeholder="Ingrese valor"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Lugar
              <CustomSelect
                fullWidth
                defaultValue=""
                placeholder="Seleccionar áreas"
              >
                <MenuItem value="parcial">sector 1</MenuItem>
                <MenuItem value="completa">sector 2</MenuItem>
              </CustomSelect>
            </FormLabelComponent>

            <FormLabelComponent>
              Horario
              <CustomTextField
                placeholder="Seleccione la fecha " //PICKER
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Ubicación
              <CustomSelect
                fullWidth
                defaultValue=""
                placeholder="Seleccionar áreas"
              >
                <MenuItem value="parcial">sector 1</MenuItem>
                <MenuItem value="completa">sector 2</MenuItem>
              </CustomSelect>
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default OperationalDetails;
