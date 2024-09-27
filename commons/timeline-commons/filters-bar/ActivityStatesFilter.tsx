import { useEffect, useState } from "react";
import {
  ActivityColor,
  ActivityState,
} from "../../../enum/activities/activity.enum";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { getStateIcon } from "../dates-calendar/enum/StatesEnum";
import IconToImage from "../../styled-components/IconImages";
import { CustomSwitch } from "./CustomSwitch";
import { CustomTextField } from "../../styled-components/CustomTextFields";
import search from "../../../public/search.png";
import theme from "../../../theme";

const activityStates = [
  {
    state: ActivityState.PENDIENTE_DE_APROBACION,
    color: ActivityColor.PENDIENTE_DE_APROBACION,
  },
  { state: ActivityState.RESERVA, color: ActivityColor.RESERVA },
  {
    state: ActivityState.EN_PROCESO_DE_FIRMA,
    color: ActivityColor.EN_PROCESO_DE_FIRMA,
  },
  { state: ActivityState.CONFIRMADO, color: ActivityColor.CONFIRMADO },
  { state: ActivityState.DIA_COMPARTIDO, color: ActivityColor.DIA_COMPARTIDO },
  {
    state: ActivityState.OCUPACION_PARCIAL_DEL_DIA,
    color: ActivityColor.OCUPACION_PARCIAL_DEL_DIA,
  },
  {
    state: ActivityState.OBRAS_REPARACION,
    color: ActivityColor.OBRAS_REPARACION,
  },
  { state: ActivityState.CANCELADO, color: ActivityColor.CANCELADO },
  { state: ActivityState.ARCHIVADO, color: ActivityColor.ARCHIVADO },
];

interface StatesFilterProps {
  selectedStates: string[];
  onChangeSelectedStates: (states: string[]) => void;
}

const ActivityStatesFilter: React.FC<StatesFilterProps> = ({
  selectedStates,
  onChangeSelectedStates,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  // Efecto para notificar cambios al componente padre
  useEffect(() => {
    onChangeSelectedStates(selectedStates);
  }, [selectedStates, onChangeSelectedStates]);

  const handleSelectState = (state: string) => {
    const newSelectedStates = selectedStates.includes(state)
      ? selectedStates.filter((s) => s !== state)
      : [...selectedStates, state];

    onChangeSelectedStates(newSelectedStates);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      onChangeSelectedStates(activityStates.map(({ state }) => state));
    } else {
      onChangeSelectedStates([]);
    }
  };

  const clearSelection = () => {
    onChangeSelectedStates([]);
    setSelectAll(false);
  };

  return (
    <Box sx={{
      boxShadow: '0px 4px 6px 0px #0000000D',

      borderRadius: "8px",

    }}>

<Box
    sx={{
      width: "300px",
      padding: "16px 16px 0px 16px",
    }}
  >
    {/* Cabecera */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant='body2' style={{ fontWeight: "bold" }}>Filtros de Estados</Typography>
      <IconButton size="small">
        <CloseIcon />
      </IconButton>
    </Box>

    {/* Campo de búsqueda */}
    <CustomTextField
      fullWidth
      placeholder="Content"
      variant="outlined"
      size="small"
      isFromBooking={false}
      sx={{pt:'8px'}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconToImage icon={search} w={20} h={20} />
          </InputAdornment>
        ),
      }}
    />

    {/* Toggle seleccionar todos */}
    <FormControlLabel
      label={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingBlock: "16px",
            paddingLeft: '16px',
          }}
        >
          <Typography variant="body1" sx={{ mr: 5 }}>Seleccionar todos los estados</Typography>
          <CustomSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </Box>
      }
      control={<span />} // Utilizamos un span vacío aquí para satisfacer el control requerido
    />

    {/* Lista de estados con scroll estético */}
    <Box
      sx={{
        maxHeight: "200px",
        overflowY: "auto",
        pt: "8px",
        // Personalización del scroll
        '&::-webkit-scrollbar': {
          width: '8px',  // Anchura del scroll
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1', // Color de fondo del track
          borderRadius: '10px', // Bordes redondeados del track
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main, // Color del "pulgar" del scroll
          borderRadius: '10px', // Bordes redondeados del pulgar
          border: '2px solid #f1f1f1', // Espacio entre el pulgar y el borde
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.dark, // Color cuando se pasa el mouse sobre el pulgar
        },
      }}
    >
      {activityStates.map(({ state, color }) => (
        <Box
          key={state}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            maxHeight: "40px",
          }}
        >
          <Checkbox
            checked={selectedStates.includes(state)}
            onChange={() => handleSelectState(state)}
            sx={{
              marginRight: "8px",
              color: "black",
              "&.Mui-checked": {
                color: "black",
              },
              "& .MuiSvgIcon-root": {
                backgroundColor: "transparent",
                borderRadius: "2px",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: color,
              borderRadius: "4px",
              p: "2px 1px",
              width: "100%",
            }}
          >
            {/* Icono del estado */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "8px",
                opacity: 0.8,
                mr: "15px",
              }}
            >
              <Box sx={{ p: "6px", borderRadius: "8px" }}>
                <IconToImage
                  icon={getStateIcon(state)}
                  sx={{ p: "8px" }}
                  w={24}
                  h={24}
                />
              </Box>
            </Box>
            <Typography variant="body2" fontWeight={450}>
              <span>{state}</span>
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>

    {/* Borrar selección */}
  </Box>

  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      paddingBlock: '8px',
      paddingInline: '16px'
    }}
  >
    <Button
      onClick={clearSelection}
      sx={{ color: theme.palette.secondary.main }}
    >
      Borrar selección
    </Button>
  </Box>
</Box>
  );
};

export default ActivityStatesFilter;
