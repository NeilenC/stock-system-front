import { Box, Collapse } from "@mui/material";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";
import {
  CustomTextField,
  FormLabelComponent,
} from "../../../styled-components/CustomTextFields";
import { useState } from "react";

const ClientData: React.FC = () => {
    const [openClient, setOpenClient] = useState(true);
    const [openOrganizer, setOpenOrganizer] = useState(true);
    const [openDirector, setOpenDirector] = useState(true);
    const [openIntendente, setOpenIntendente] = useState(true);
  
    const handleToggleClient = () => setOpenClient(!openClient);
    const handleToggleOrganizer = () => setOpenOrganizer(!openOrganizer);
    const handleToggleDirector = () => setOpenDirector(!openDirector);
    const handleToggleIntendente = () => setOpenIntendente(!openIntendente);
  return (
    <>
      <TitleComponent variant="h6" text={"Datos del Cliente / Organizador"} />
       {/* Datos del cliente  */}
      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleClient}
          open={openClient}
          text={"Cliente"}
        />
        <Collapse in={openClient}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
             Cliente
              <CustomTextField
                placeholder="Seleccione o ingrese nuevo cliente" //Imagino que abrirá un modal
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
             Teléfono
              <CustomTextField
                placeholder="Ingrese teléfono" 
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
             Correo electrónico
              <CustomTextField
                placeholder="Ingrese correo electrónico" 
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

          </Box>
        </Collapse>
      </Box>

      {/* Organizador responsable  */}

      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleOrganizer}
          open={openOrganizer}
          text={"Organizador o Responsable"}
        />
        <Collapse in={openOrganizer}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
             Nombre
              <CustomTextField
                placeholder="Ingrese nombre" 
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
             Teléfono
              <CustomTextField
                placeholder="Ingrese teléfono" 
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

            <FormLabelComponent>
             Correo electrónico
              <CustomTextField
                placeholder="Ingrese correo electrónico" 
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>

          </Box>
        </Collapse>
      </Box>

      {/* Director Técnico */}
      <Box sx={{ marginBottom: 2 }}>
        <SecondTitleComponent
          onClick={handleToggleDirector}
          open={openDirector}
          text={"Director técnico"}
        />

        <Collapse in={openDirector}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
              Nombre
              <CustomTextField
                placeholder="Ingresa nombre"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
            <FormLabelComponent>
              Teléfono
              <CustomTextField
                placeholder="Ingresa télefono"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
            <FormLabelComponent>
              Correo Electrónico
              <CustomTextField
                placeholder="Ingresa Correo electrónicoectrónico"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Intendente */}
      <Box sx={{ marginTop: "24px" }}>
        <SecondTitleComponent
          onClick={handleToggleIntendente}
          open={openIntendente}
          text={"Intendente"}
        />

        <Collapse in={openIntendente}>
          <Box sx={{ marginTop: "24px" }}>
            <FormLabelComponent>
              Nombre
              <CustomTextField
                placeholder="Ingresa nombre"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
            <FormLabelComponent>
              Teléfono
              <CustomTextField
                placeholder="Ingresa télefono"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
            <FormLabelComponent>
              Correo electrónico
              <CustomTextField
                placeholder="Ingresa Correo ectrónico"
                variant="outlined"
                fullWidth
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default ClientData;
