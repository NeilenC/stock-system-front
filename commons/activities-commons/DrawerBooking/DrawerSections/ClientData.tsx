import { Box, Collapse, InputAdornment } from "@mui/material";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";
import {
  CustomTextField,
  FormLabelComponent,
} from "../../../styled-components/CustomTextFields";
import { useState } from "react";
import useEventStore from "../activity-hook/useEventStore";
import email from '../../../../public/drawer/email.png'
import phone from '../../../../public/drawer/phone.png'
import IconToImage from "../../../styled-components/IconImages";
import theme from "../../../../theme";

const ClientData: React.FC = () => {
  const { eventData, setClientData, setOrganizerOrResponsible,
    setTechnicalDirector,
    setAdministrator } = useEventStore();
  const [openClient, setOpenClient] = useState(true);
  const [openOrganizer, setOpenOrganizer] = useState(true);
  const [openDirector, setOpenDirector] = useState(true);
  const [openIntendente, setOpenIntendente] = useState(true);

  const handleToggleClient = () => setOpenClient(!openClient);
  const handleToggleOrganizer = () => setOpenOrganizer(!openOrganizer);
  const handleToggleDirector = () => setOpenDirector(!openDirector);
  const handleToggleIntendente = () => setOpenIntendente(!openIntendente);
  
  const handleClientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientData('clientId', event.target.value);
  };

  const handleClientPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientData('phoneNumber', event.target.value);
  };

  const handleClientEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientData('email', event.target.value);
  };

  const handleOrganizerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizerOrResponsible('responsibleName', event.target.value);
  };

  const handleOrganizerPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizerOrResponsible('phoneNumber', event.target.value);
  };

  const handleOrganizerEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizerOrResponsible('email', event.target.value);
  };

  const handleDirectorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechnicalDirector('techDirectorName', event.target.value);
  };

  const handleDirectorPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechnicalDirector('phoneNumber', event.target.value);
  };

  const handleDirectorEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechnicalDirector('email', event.target.value);
  };

  const handleIntendenteNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdministrator('administratorName', event.target.value);
  };

  const handleIntendentePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdministrator('phoneNumber', event.target.value);
  };

  const handleIntendenteEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdministrator('email', event.target.value);
  };

  // Utility function to handle null values
  const getSafeValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined) {
      return "";
    }
    return typeof value === 'number' ? value.toString() : value;
  };
  

  return (
    <>
      <TitleComponent variant="h6" text={"Datos del Cliente / Organizador"} />
      
      {/* Datos del cliente */}
      <Box>
        <SecondTitleComponent
          onClick={handleToggleClient}
          open={openClient}
          text={"Cliente"}
        />
        <Collapse in={openClient}>
          <Box>
            <FormLabelComponent>
              Cliente
              <CustomTextField
                placeholder="Seleccione o ingrese nuevo cliente"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.client.clientId)}
                onChange={handleClientNameChange}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Teléfono
              <CustomTextField
                placeholder="Ingrese teléfono"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.client.phoneNumber)}
                onChange={handleClientPhoneChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={phone} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Correo electrónico
              <CustomTextField
                placeholder="Ingrese correo electrónico"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.client.email)}
                onChange={handleClientEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={email} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Organizador responsable */}
      <Box>
        <SecondTitleComponent
          onClick={handleToggleOrganizer}
          open={openOrganizer}
          text={"Organizador o Responsable"}
        />
        <Collapse in={openOrganizer}>
          <Box>
            <FormLabelComponent>
              Nombre
              <CustomTextField
                placeholder="Ingrese nombre"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.organizerOrResponsible.responsibleName)}
                onChange={handleOrganizerNameChange}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Teléfono
              <CustomTextField
                placeholder="Ingrese teléfono"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.organizerOrResponsible.phoneNumber)}
                onChange={handleOrganizerPhoneChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={phone} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Correo electrónico
              <CustomTextField
                placeholder="Ingrese correo electrónico"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.organizerOrResponsible.email)}
                onChange={handleOrganizerEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={email} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Director Técnico */}
      <Box>
        <SecondTitleComponent
          onClick={handleToggleDirector}
          open={openDirector}
          text={"Director técnico"}
        />
        <Collapse in={openDirector}>
          <Box>
            <FormLabelComponent>
              Nombre
              <CustomTextField
                placeholder="Ingresa nombre"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.technicalDirector.techDirectorName)}
                onChange={handleDirectorNameChange}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Teléfono
              <CustomTextField
                placeholder="Ingresa teléfono"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.technicalDirector.phoneNumber)}
                onChange={handleDirectorPhoneChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={phone} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Correo Electrónico
              <CustomTextField
                placeholder="Ingresa Correo electrónico"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.technicalDirector.email)}
                onChange={handleDirectorEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={email} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Intendente */}
      <Box>
        <SecondTitleComponent
          onClick={handleToggleIntendente}
          open={openIntendente}
          text={"Intendente"}
        />
        <Collapse in={openIntendente}>
          <Box>
            <FormLabelComponent>
              Nombre
              <CustomTextField
                placeholder="Ingresa nombre"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.administrator.administratorName)}
                onChange={handleIntendenteNameChange}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Teléfono
              <CustomTextField
                placeholder="Ingresa teléfono"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.administrator.phoneNumber)}
                onChange={handleIntendentePhoneChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={phone} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Correo electrónico
              <CustomTextField
                placeholder="Ingresa Correo electrónico"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.clientData.administrator.email)}
                onChange={handleIntendenteEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <IconToImage icon={email} w={20} h={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default ClientData;
