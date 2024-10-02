import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  IconButton,
  Popover,
  InputAdornment,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import ActivityStatesFilter from "./ActivityStatesFilter";
import { CustomTextField } from "../../styled-components/CustomTextFields";
import IconToImage from "../../styled-components/IconImages";
import search from "../../../public/search.png";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import theme from "../../../themes/theme";
import arrowLeft from "../../../public/filtersArrowLeft.png";
import arrowRight from "../../../public/filtersArrowRight.png";

const MainFiltersBar = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]); // Estados seleccionados
  const [dropdownAnchor, setDropdownAnchor] = useState<null | HTMLElement>(
    null
  ); // Control del Popover

  // Abre el dropdown
  const handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchor(event.currentTarget);
  };

  // Cierra el dropdown
  const handleCloseDropdown = () => {
    setDropdownAnchor(null);
  };

  // Actualiza los estados seleccionados
  const handleSelectedStatesChange = (states: string[]) => {
    setSelectedStates(states);
  };

  return (
    <Grid
      container
      alignItems="center"
      padding="12px 16px 8px"
      backgroundColor="#ffff"
      borderRadius="8px"
    >
      {/* Campo de búsqueda */}
      <Grid item xs={2} sm={6} md={4}>
        <CustomTextField
          fullWidth
          placeholder="Buscar por eventos o clientes"
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
          isFromBooking={false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconToImage icon={search} w={20} h={20} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Contenedor para los otros tres componentes */}
      <Grid
        item
        xs={4}
        sm={6}
        md={8}
        container
        justifyContent="flex-end"
        gap={"16px"}
        alignItems={"center"}
      >
        {/* Botón para seleccionar estados */}
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            onClick={handleOpenDropdown}
            sx={{
              maxWidth: "110px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              textTransform: "none",
              color: theme.palette.info.contrastText,
            }}
            endIcon={
              <Box
                sx={{
                  color: theme.palette.secondary.main,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {dropdownAnchor ? (
                  <KeyboardArrowUpOutlinedIcon />
                ) : (
                  <KeyboardArrowDownOutlinedIcon />
                )}
              </Box>
            }
          >
            {"Estados"}
          </Button>
          {/* Popover que contiene el ActivityFilterDropdown */}
          <Popover
            open={Boolean(dropdownAnchor)}
            anchorEl={dropdownAnchor}
            onClose={handleCloseDropdown}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <ActivityStatesFilter
              selectedStates={selectedStates}
              onChangeSelectedStates={handleSelectedStatesChange}
            />
          </Popover>
        </Grid>

        {/* Botón Hoy */}
        {/* Botón Hoy */}
        <Grid item>
          <IconToImage
            icon={arrowRight}
            w={30}
            h={30}
          />

          <Button
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              minWidth: "70px",
              color: theme.palette.info.contrastText,
              border: "1px solid #E2E8F0",
              marginInline:'8px'
            }}
          >
            Hoy
          </Button>

            <IconToImage icon={arrowLeft} w={30} h={30} />
        </Grid>

        {/* Menú de Opciones (tres puntos) */}
        <Grid item>
          <IconButton sx={{ backgroundColor: "#fff", borderRadius: "50%" }}>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainFiltersBar;
