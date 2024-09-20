import { useState } from "react";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";
import { Box, Collapse, FormControl, MenuItem } from "@mui/material";
import {
  CustomSelect,
  CustomTextField,
  FormLabelComponent,
} from "../../../styled-components/CustomTextFields";
import useEventStore from "../activity-hook/useEventStore";

const OperationalDetails: React.FC = () => {
  const { eventData, setOperationalDetails, setTicketOfficeDetails } = useEventStore();

  const [openInformation, setOpenInformation] = useState(true);
  const [openBoleteria, setOpenBoleteria] = useState(true);

  const handleToggleInformation = () => setOpenInformation(!openInformation);
  const handleToggleBoleteria = () => setOpenBoleteria(!openBoleteria);

  // Handlers for input changes
  const handleExpositorsQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setOperationalDetails('expositorsQuantity', value);
    }
  };

  const handleTicketValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setTicketOfficeDetails('ticketValue', value);
    }
  };

  const handleTicketOfficeLocationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTicketOfficeDetails('ticketOfficeLocation', event.target.value as string);
  };

  // Utility function to ensure values are strings
  const getSafeValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined) {
      return "";
    }
    return typeof value === 'number' ? value.toString() : value;
  };

  return (
    <>
      <TitleComponent variant="h6" text="Detalles Operativos del Evento" />

      {/* Información Section */}
      <Box>
        <SecondTitleComponent
          onClick={handleToggleInformation}
          open={openInformation}
          text="Información"
        />
        <Collapse in={openInformation}>
          <Box>
            <FormLabelComponent>
              Cantidad de Asistentes / Expositores
              <CustomTextField
                placeholder="Ingrese cantidad"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.operationalDetails.information.expositorsQuantity)}
                onChange={handleExpositorsQuantityChange}
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Boletería Section */}
      <Box>
        <SecondTitleComponent
          onClick={handleToggleBoleteria}
          open={openBoleteria}
          text="Boletería"
        />
        <Collapse in={openBoleteria}>
          <Box>
            <FormLabelComponent>
              Valor
              <CustomTextField
                placeholder="Ingrese valor"
                variant="outlined"
                fullWidth
                value={getSafeValue(eventData.logistics.operationalDetails.ticketOffice.ticketValue)}
                onChange={handleTicketValueChange}
              />
            </FormLabelComponent>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabelComponent>Lugar</FormLabelComponent>
              <CustomSelect
                fullWidth
                value={eventData.logistics.operationalDetails.ticketOffice.ticketOfficeLocation || ""}
                onChange={handleTicketOfficeLocationChange}
                placeholder="Seleccionar áreas"
              >
                <MenuItem value="sector 1">sector 1</MenuItem>
                <MenuItem value="sector 2">sector 2</MenuItem>
              </CustomSelect>
            </FormControl>

            {/* Add more input fields as needed */}
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default OperationalDetails;
