import { FC, useState } from "react";
import { SecondTitleComponent, TitleComponent } from "../../TitlesComponent";
import {
  Autocomplete,
  Box,
  Collapse,
  FormControl,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  CustomAutocomplete,
  CustomSelect,
  CustomTextField,
  FormLabelComponent,
} from "../../../styled-components/CustomTextFields";
import CustomDateTimePicker from "../../../styled-components/CustomDatePicker";
import useEventStore from "../activity-hook/useEventStore";
import theme from "../../../../themes/theme";
// import { SelectPicker, Stack } from 'rsuite';
import { Stack } from "@mui/material";
import useSectors from "../../../../hooks/useSectors";

const sectoresOptions: any = [
  { label: "Sector 1", value: "sector1" },
  { label: "Sector 2", value: "sector2" },
  { label: "Sector 3", value: "sector3" },
];

const data = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const LogisticsSection: React.FC = () => {
  const {
    eventData,
    setLogisticsAssembly,
    setLogisticsDismantling,
    setLogisticsDetails,
    setSectors,
  } = useEventStore();

  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [openLogistics, setOpenLogistics] = useState(true);
  const [openDetalles, setOpenDetalles] = useState(true);
  const [openDesarme, setOpenDesarme] = useState(true);
  const handleToggleLogistics = () => setOpenLogistics(!openLogistics);
  const handleToggleDesarme = () => setOpenDesarme(!openDesarme);
  const handleToggleDetalles = () => setOpenDetalles(!openDetalles);
  const { salas } = useSectors();

  // Transforma los sectores en el formato { label, value } para el Autocomplete
  const sectorOptions = salas.map((sector: any, index: number) => ({
    label: sector.name,
    value: `${sector.id}-${index}`, // Combina id e índice para asegurar unicidad
  }));

  // Función que se llama al seleccionar un sector
  const handleSectorSelect = (event: any, newValue: any) => {
    if (newValue) {
      const newSectorIds = newValue.map((sector: any) => sector.value);
      setSelectedSectors(newSectorIds); // Actualiza el estado local
      setSectors(newSectorIds); // Actualiza el estado en Zustand
    } else {
      setSelectedSectors([]); // Resetea si no hay selección
      setSectors([]); // Resetea en Zustand
    }
  };

  const handleInputChangeAssembly = (
    key: keyof typeof eventData.logistics.assembly,
    value: string
  ) => {
    setLogisticsAssembly(key, value); // Adjust to use the appropriate setter method
  };

  const handleInputChangeDetails = (
    key: keyof typeof eventData.logistics.detailsLogistics,
    value: string
  ) => {
    setLogisticsDetails(key, value); // Adjust to use the appropriate setter method
  };

  const handleInputChangeDismantling = (
    key: keyof typeof eventData.logistics.dismantling,
    value: string
  ) => {
    setLogisticsDismantling(key, value); // Adjust to use the appropriate setter method
  };

  const handleDateTimeChangeAssembly = (newValue: Date | null) => {
    if (newValue && !isNaN(newValue.getTime())) {
      // Verifica si la fecha es válida
      const date = newValue.toLocaleDateString("en-CA");
      const time = newValue.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      handleInputChangeAssembly("initialDateAssembly", date);
      handleInputChangeAssembly("initialTimeAssembly", time);
    } else {
      console.error("Fecha inválida seleccionada para initialTimeAssembly");
    }
  };

  const handleDateTimeChangeDismantling = (newValue: Date | null) => {
    if (newValue && !isNaN(newValue.getTime())) {
      // Verifica si la fecha es válida
      const date = newValue.toLocaleDateString("en-CA");
      const time = newValue.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      handleInputChangeDismantling("initialDateDismantling", date);
      handleInputChangeDismantling("initialTimeDismantling", time);
    } else {
      console.error("Fecha inválida seleccionada para Dismantling");
    }
  };

  const handleDateTimeChangeDetails = (newValue: Date | null) => {
    if (newValue && !isNaN(newValue.getTime())) {
      // Verifica si la fecha es válida
      const date = newValue.toLocaleDateString("en-CA");
      const time = newValue.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      handleInputChangeDetails("dateActivity", date);
      handleInputChangeDetails("timeActivity", time);
    } else {
      console.error("Fecha inválida seleccionada para Details");
    }
  };


  return (
    <>
      <TitleComponent variant="h6" text={"Logística del Evento"} />
      {/* Armado */}
      <Box>
        <SecondTitleComponent
          onClick={handleToggleLogistics}
          open={openLogistics}
          text={"Armado"}
        />
        <Collapse in={openLogistics}>
          <Box>
            <FormLabelComponent>
              Lugar de Ingreso
              <CustomSelect
                defaultValue=""
                placeholder="Seleccionar área"
                fullWidth
                value={eventData.logistics.assembly.entryPlaceAssembly || ""}
                onChange={(e: any) =>
                  handleInputChangeAssembly(
                    "entryPlaceAssembly",
                    e.target.value
                  )
                }
              >
                <MenuItem value="Juncal y Biiilingud">
                  Juncal y Biiilingud
                </MenuItem>
                <MenuItem value="Otra área">Otra área</MenuItem>
                <MenuItem value="Otra más">Otra más</MenuItem>
              </CustomSelect>
            </FormLabelComponent>

            <FormLabelComponent>
              Fecha
              <CustomDateTimePicker
                value={
                  eventData.logistics.assembly.initialDateAssembly &&
                  eventData.logistics.assembly.initialTimeAssembly
                    ? new Date(
                        `${eventData.logistics.assembly.initialDateAssembly}T${eventData.logistics.assembly.initialTimeAssembly}`
                      )
                    : null
                }
                onChange={handleDateTimeChangeAssembly}
              />
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>
      {/* Desarme  */}

      <Box>
        <SecondTitleComponent
          onClick={handleToggleDesarme}
          open={openDesarme}
          text={"Desarme"}
        />
        <Collapse in={openDesarme}>
          <Box>
            <FormLabelComponent>
              Lugar de Ingreso
              <CustomTextField
                placeholder="Seleccionar área" // ACA VAN MAPEADOS TOOS LOS SECTORES
                variant="outlined"
                fullWidth
                value={
                  eventData.logistics.dismantling.entryPlaceDismantling || ""
                }
                onChange={(e: any) =>
                  handleInputChangeDismantling(
                    "entryPlaceDismantling",
                    e.target.value
                  )
                }
              />
            </FormLabelComponent>

            <FormLabelComponent>
              Fecha
              <CustomDateTimePicker
                value={
                  eventData.logistics.dismantling.initialDateDismantling
                    ? new Date(
                        `${eventData.logistics.assembly.initialDateAssembly}T${eventData.logistics.assembly.initialTimeAssembly}`
                      )
                    : null
                }
                onChange={handleDateTimeChangeDismantling}
              />
              {/* // AGREGAR FECHA Y HORA */}
            </FormLabelComponent>
          </Box>
        </Collapse>
      </Box>

      {/* Más Detalles  */}

      <Box>
        <SecondTitleComponent
          onClick={handleToggleDetalles}
          open={openDetalles}
          text={"Detalles"}
        />
        <Collapse in={openDetalles}>
          <Box>
            <FormLabelComponent>
              Areas Arrendadas
              <Stack spacing={10} direction="column" alignItems="flex-start">
                {/* SelectPicker con datos correctos */}

                <CustomAutocomplete
                  options={sectorOptions}
                  getOptionLabel={(option: any) => option.label}
                  onChange={handleSectorSelect}
                  multiple
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Seleccionar Sectores"
                      variant="outlined"
                    />
                  )}
                />

              </Stack>
            </FormLabelComponent>
            <FormLabelComponent>
              Horario de actividad en Predio
              {/* <CustomTextField
                placeholder="Seleccionar la fecha "
                variant="outlined"
                fullWidth
                // value={eventData.logistics.detailsLogistics.sectors || ""} 
                // onChange={(e: any) => handleInputChangeDetails('sectors', e.target.value)}
              /> */}
              <CustomDateTimePicker
                value={
                  eventData.logistics.detailsLogistics.dateActivity
                    ? new Date(
                        `${eventData.logistics.assembly.initialDateAssembly}T${
                          eventData.logistics.detailsLogistics.timeActivity ||
                          "00:00"
                        }`
                      )
                    : null
                }
                onChange={handleDateTimeChangeDetails}
              />
            </FormLabelComponent>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabelComponent>Ingreso al Público</FormLabelComponent>
              <CustomSelect
                fullWidth
                defaultValue=""
                placeholder="Seleccionar áreas"
                value={eventData.logistics.detailsLogistics.entryPoint || ""}
                onChange={(e: any) =>
                  handleInputChangeDetails("entryPoint", e.target.value)
                }
              >
                <MenuItem value="sector1">sector 1</MenuItem>
                <MenuItem value="sector2">sector 2</MenuItem>
              </CustomSelect>
            </FormControl>

            <TextField
              sx={{
                marginBlock: "16px 24px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.info.light}`,
                },
              }}
              placeholder="Nota"
              variant="outlined"
              fullWidth
              multiline
              rows={2.5} // Adjust rows as needed
              value={eventData.logistics.detailsLogistics.notes || ""}
              onChange={(e: any) =>
                handleInputChangeDetails("notes", e.target.value)
              }
            />
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default LogisticsSection;
