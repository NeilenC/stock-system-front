import styled from "@emotion/styled";
import { Box, FormLabel, Select, SelectProps, TextField } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import theme from "../../theme";

const FormLabelComponent = styled(FormLabel)(() => ({
    fontSize: '16px', // Tamaño de fuente
    fontWeight: 'bold', // Peso de fuente
    color: theme.palette.primary.contrastText,
    marginBottom: 10,
    '&.Mui-focused': {
      color: theme.palette.primary.contrastText, // Color del label cuando está enfocado
    },
  }));

  const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      height: '43px',
      borderRadius: '8px',
      border: '1px solid #E1E6EF',
      marginBottom: '24px',
      marginTop: '12px',
      '& input': {
        padding: '10px 14px', 
      },
      '& fieldset': {
        borderColor: '#E1E6EF',
      },
      '&:hover fieldset': {
        borderColor: '#B0BEC5', 
      },

    },
  }));


  
  const StyledSelect = styled(Select)`
  border: 1px solid ${theme.palette.info.light};  // Estilo de borde
  border-radius: 8px;          // Borde redondeado
  height: 40px;               // Altura personalizada
  &:hover {
    border-color: ${theme.palette.info.light};  // Color del borde al hacer hover
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

  

  export  {FormLabelComponent, CustomTextField, CustomSelect }