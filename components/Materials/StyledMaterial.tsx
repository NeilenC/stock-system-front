import styled from "@emotion/styled";
import { Box, Select, TextField, Theme } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
const CustomTextFieldMaterial = styled(TextField)(({ theme }) => ({
  width: '100%',
  "& .MuiOutlinedInput-root": {
    height: "45px",
    boxSizing: 'border-box', 
    "& input": {
      padding: "8px",
    },
    "& fieldset": {
      borderColor: "#E1E6EF",
    },
    "&:hover fieldset": {
      borderColor: "#B0BEC5",
    },
    "&.Mui-focused fieldset": {
      borderColor:'#E1E6EF',
    },
  },
}));

const CustomTextFieldComponent = styled(TextField)<{ isFromBooking?: boolean }>(({ isFromBooking = true}) => ({
  
  '& .MuiOutlinedInput-root': {
    height: '38px',
    borderRadius: '8px',
    border: '1px solid #E1E6EF',
    '& input': {
      padding: isFromBooking ?  '10px 14px':'8px' , 
    },
    '& fieldset': {
      borderColor:'#E1E6EF' ,
    },
    '&:hover fieldset': {
      borderColor:  isFromBooking ? '#B0BEC5'  :  '#2563EB', 
    },

  }, 
}));


const CustomSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  "& .MuiOutlinedInput-root": {
    height: "45px",
    "& .MuiSelect-select": {
      padding: "8px", // Asegura que el padding sea igual
      color: theme.palette.primary.dark,
    },
    "& fieldset": {
      borderColor: "#E1E6EF",
    },
    "&:hover fieldset": {
      borderColor: "#B0BEC5",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.info.light,
    },
  },
}));
const CustomSelectComponent = ({ placeholder, ...props }: any) => {
  return (
    <CustomSelect
      displayEmpty
      IconComponent={props.open ? ExpandLessOutlinedIcon : ExpandMoreOutlinedIcon}
      {...props}
    >
      {props.children}
    </CustomSelect>
  );
};


export { CustomTextFieldMaterial, CustomSelectComponent, CustomTextFieldComponent };
