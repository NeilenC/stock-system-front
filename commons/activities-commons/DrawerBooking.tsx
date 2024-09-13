import { DrawerBookingProps } from "./models/DrawerBookingProps";
import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Collapse,
  FormControl,
  MenuItem,
  Button,
  Grid,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { SecondTitleComponent, TitleComponent } from "./TitlesComponent";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import {
  CustomSelect,
  CustomTextField,
  FormLabelComponent,
} from "../styled-components/CustomTextFields";
import theme from "../../theme";

const DrawerBooking: React.FC<DrawerBookingProps> = ({ isOpen, setIsOpen }) => {
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openGeneral, setOpenGeneral] = useState(true);
  const [openLogistics, setOpenLogistics] = useState(true);
  const [openDirector, setOpenDirector] = useState(true);
  const [openIntendente, setOpenIntendente] = useState(true);

  const handleToggleGeneral = () => setOpenGeneral(!openGeneral);
  const handleToggleLogistics = () => setOpenLogistics(!openLogistics);
  const handleToggleDirector = () => setOpenDirector(!openDirector);
  const handleToggleIntendente = () => setOpenIntendente(!openIntendente);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMediumScreen ? "60%" : "35%",
          height: isMediumScreen ? "94vh " : "90vh",
          top: "70px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
            paddingBlock: "8px",
            borderBottom: "1px solid #E1E6EF",
            display: "flex",
            alignItems: "center",
          }}
         >
          <IconButton
            onClick={handleClose}
            sx={{
              fontSize: "18px",
              paddingInline: "16px",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginLeft: "15px",
              alignItems: "center",
            }}
          >
            Crear Reserva
          </Typography>
        </Box>
        <Box>
          <Box sx={{ paddingInline: "16px", paddingBottom: "100px" }}>
            {/* Sección: Información General */}
            <TitleComponent variant="h6" text={"Información general"} />
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

            {/* Sección: Logística del Evento */}
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
                      placeholder="Lugar de Ingreso"
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

            {/* Botón para crear reserva */}
          </Box>
        </Box>
      </Box>
          <Box
            sx={{
              width: isMediumScreen ? "60%" : "35%",
              position: "fixed",
              bottom: 0,
              backgroundColor: "white",
              paddingBlock: "16px",
              zIndex: 1,
              borderTop: " 1.02px solid #E1E6EF",
            }}
           >
            <Box sx={{ paddingInline: "16px" }}>
              <Button variant="contained" color="secondary" fullWidth>
                Confirmar Reserva
              </Button>
            </Box>
          </Box>
    </Drawer>
  );
};

export default DrawerBooking;
