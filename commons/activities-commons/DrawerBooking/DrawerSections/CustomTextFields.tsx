import styled from "@emotion/styled";
import { Autocomplete, Box, FormLabel, ListItem, ListItemText, Select, SelectProps, TextField, Typography } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import theme from "../../../../themes/theme";
import { useState } from "react";
interface FormLabelComponentProps {
  children: React.ReactNode;
  error?: boolean;
}

const FormLabelComponent = styled(FormLabel)(() => ({
    fontSize: '16px', // Tamaño de fuente
    fontWeight: 'bold', // Peso de fuente
    color: theme.palette.primary.contrastText,
    marginBottom: 10,
    '&.Mui-focused': {
      color: theme.palette.primary.contrastText, // Color del label cuando está enfocado
    },
  }));



  export const FormLabelComponentWithError: React.FC<FormLabelComponentProps> = ({
    children,
    error = false,
  }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
          }}
        >
          {children}
        </Typography>
        {error && (
          <Typography
            sx={{
              color: "red",
              fontSize: "25px", 
            }}
          >
            *
          </Typography>
        )}
      </Box>
    );
};

  const CustomTextField = styled(TextField)<{ isFromBooking?: boolean }>(({ isFromBooking = true}) => ({
  
    '& .MuiOutlinedInput-root': {
      height:   '45px' ,
      borderRadius: '6px',
      border: '1px solid #E1E6EF',
      marginBottom:  '0px',
      marginTop:  '10px',
      '& input': {
        padding: isFromBooking ?  '10px 14px':'8px' , 
      },
      '& fieldset': {
        borderColor:'#E1E6EF' ,
      },
      '&:hover fieldset': {
        borderColor:  isFromBooking ? '#B0BEC5'  : theme.palette.secondary.main, 
      },

    }, 
  }));


  
  export const StyledSelect = styled(Select)`  // Para manejar estilos del placeholder del select
  border-radius: 6px;        
  height: 40px;    

  &:hover {
    border-color: ${theme.palette.info.light};  
  },
    &.Mui-focused {
    border-color: ${theme.palette.info.light};  
  },
`;



// Componente CustomSelect que maneja el placeholder 
const CustomSelect = ({ placeholder, ...props }: any) => {
  return (

    <StyledSelect
      displayEmpty
      renderValue={(selected) => {
        if (selected === '') {
          return <Box sx={{color: '#1D2433'}}>{placeholder}</Box >;
        }
        return selected;
      }}
      IconComponent={props.open ? ExpandLessOutlinedIcon : ExpandMoreOutlinedIcon} 
      {...props}
      >
      {props.children}
    </StyledSelect>

  );
};


// Estilos personalizados para el Autocomplete y su TextField
const StyledAutocomplete = styled(Autocomplete)(() => ({
  '& .MuiOutlinedInput-root': {
    border: `1px solid ${theme.palette.info.light}`, // mismo estilo de borde
    borderRadius: '8px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      borderColor: `${theme.palette.info.light}`, // hover como en StyledSelect
    },
    '&.Mui-focused': {
      borderColor: `${theme.palette.info.light}`, // enfoque como en StyledSelect
    },
  },
}));

const CustomAutocomplete = ({ placeholder, options, value, onChange, ...props }: any) => {
  return (
    <StyledAutocomplete
      fullWidth
      options={options}
      getOptionLabel={(option: any) => option.label}
      value={value}
      onChange={(event, newValue) => {
        onChange(event, newValue);
      }}
      multiple // Asegúrate de que se permite la selección múltiple
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={value.length ? "" : placeholder} // Oculta el placeholder si hay un valor seleccionado
          InputProps={{
            ...params.InputProps,
            sx: { textAlign: 'center' }, // Centra el texto en el input
            endAdornment: (
              <Box>
                {props.open ? (
                  <ExpandLessOutlinedIcon />
                ) : (
                  <ExpandMoreOutlinedIcon />
                )}
              </Box>
            ),
          }}
        />
      )}
      renderOption={(props, option: any) => (
        <ListItem
          {...props}
          key={option.value}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <ListItemText primary={option.label} />
        </ListItem>
      )}
      sx={{
        '& .MuiAutocomplete-input': {
          display: 'flex',
          flexWrap: 'wrap', // Permite que los elementos se envuelvan
        },
      }}
      {...props}
    />
  );
};


  export  {FormLabelComponent, CustomTextField, CustomSelect, CustomAutocomplete }